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

export interface PhoneFieldMachineContext extends Field<string> {}

export type PhoneFieldActor = SpawnedActorRef<FieldMachineEvents<string>>;

const phoneRequired = required('Номер телефону є обов\'язковим');
const isPhoneNumber = isPhone('Необхідно вводити номер у вигляді +38 (067) 123-45-67');

export const createPhoneFieldMachine = (field: Field<string>) => createFieldMachine<string>(field, 'phone')
  .withConfig({
    actions: {
      setError: assign({
        error: (_ctx, event) => pipeValidators(
          phoneRequired,
          isPhoneNumber,
        )(event.value),
      }),
    },
  });
