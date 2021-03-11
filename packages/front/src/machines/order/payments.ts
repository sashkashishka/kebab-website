import { assign, SpawnedActorRef } from 'xstate';

import { Field, PaymentType } from '@kebab/types';

import { pipeValidators, required } from 'Utils';

import { createFieldMachine, FieldMachineEvents } from 'Machines';

export interface PaymentFieldMachineContext extends Field<PaymentType> {}

export type PaymentFieldActor = SpawnedActorRef<FieldMachineEvents<PaymentType>>;

const paymentRequired = required('Спосіб платежу є обов\'язковим');

export const createPaymentFieldMachine = (field: Field<PaymentType>) => createFieldMachine<PaymentType>(field, 'payment')
  .withConfig({
    actions: {
      setError: assign({
        error: (_ctx, event) => pipeValidators(
          paymentRequired,
        )(event.value),
      }),
    },
  });
