import { assign, SpawnedActorRef } from 'xstate';

import { Field } from '@kebab/types';

import {
  pipeValidators,
  required,
  integer,
  positive,
} from 'Utils';

import { createFieldMachine, FieldMachineEvents } from 'Machines';

export interface ChargeFromFieldMachineContext extends Field<string> {}

export type ChargeFromFieldActor = SpawnedActorRef<FieldMachineEvents<string>>;

const chargeFromRequired = required('Решта є обов\'язковою');
const isInterger = integer('Вводіть тільки цифри');
const isPositive = positive('Введіть невід\'ємне значення');

export const createChargeFromFieldMachine = (field: Field<string>) => createFieldMachine<string>(field, 'chargeFrom')
  .withConfig({
    actions: {
      setValue: assign({
        value: (_ctx, event) => {
          if (~~event.value > 1000) return '1000'; // eslint-disable-line

          return event.value;
        },
      }),
      setError: assign({
        error: (_ctx, event) => pipeValidators(
          chargeFromRequired,
          isInterger,
          isPositive,
        )(event.value),
      }),
    },
  });
