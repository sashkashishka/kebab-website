import {
  Machine,
  assign,
  SpawnedActorRef,
  sendParent,
} from 'xstate';

import { Field } from '@kebab/types';

import { OrderActions, ChangeEvent } from 'Machines';

import { required } from 'Utils';

export enum PaymentFieldStates {
  EDIT = 'edit',
}

export enum PaymentFieldActions {
  CHANGE = 'CHANGE',
}

export interface PaymentFieldMachineContext extends Field {}

export type PaymentFieldMachineEvents =
  | ChangeEvent
  | { type: PaymentFieldActions.CHANGE, value: string | number };

export type PaymentFieldActor = SpawnedActorRef<PaymentFieldMachineEvents>;

const 

export const createPaymentFieldMachine = (field: Field) => Machine<PaymentFieldMachineContext, PaymentFieldMachineEvents>(
  {
    id: 'payment-field',
    initial: PaymentFieldStates.EDIT,
    context: field,
    states: {
      [PaymentFieldStates.EDIT]: {
        on: {
          [PaymentFieldActions.CHANGE]: {
            actions: [
              'setValue',
              'setError',
              sendParent((ctx) => ({
                type: OrderActions.CHANGE,
                field: {
                  value: ctx.value,
                  error: ctx.error,
                  name: 'payment',
                },
              })),
            ],
          },
        },
      },
    },
  },
  {
    actions: {
      setValue: assign({
        value: (_ctx, event) => event.value,
      }),
      setError: assign({
        error: (_ctx, event) => 'phone error',
      }),
    },
  },
);
