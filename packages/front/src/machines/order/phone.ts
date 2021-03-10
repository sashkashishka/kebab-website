import {
  assign,
  SpawnedActorRef,
} from 'xstate';

import { Field } from '@kebab/types';

import {
  pipeValidators,
  required,
  isPhone,
} from 'Utils';

import {
  createFieldMachine,
  FieldMachineEvents,
} from 'Machines';

export interface PhoneFieldMachineContext extends Field {}

export type PhoneFieldActor = SpawnedActorRef<FieldMachineEvents>;

const phoneRequired = required('Номер телефону є обов\'язковим');
const isPhoneNumber = isPhone('Необхідно вводити номер у вигляді +380671234567');

export const createPhoneFieldMachine = (field: Field) => createFieldMachine(field, 'phone')
  .withConfig({
    actions: {
      setError: assign({
        error: (_ctx, event) => pipeValidators(
          phoneRequired,
          isPhoneNumber,
        )(event.value as string),
      }),
    },
  });
