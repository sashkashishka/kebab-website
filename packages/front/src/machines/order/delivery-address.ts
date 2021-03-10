import {
  Machine,
  assign,
  SpawnedActorRef,
  sendParent,
} from 'xstate';

import { Field } from '@kebab/types';

import { OrderActions, FieldActions } from 'Machines';

import { required } from 'Utils';

export enum DeliveryAddressFieldStates {
  EDIT = 'edit',
  PICKUP = 'pickup',
}

export enum DeliveryAddressFieldActions {
  PICKUP = 'PICKUP',
  ADDRESS = 'ADDRESS',
}

export interface DeliveryAddressFieldMachineContext extends Field {}

export type DeliveryAddressFieldMachineEvents =
  | { type: DeliveryAddressFieldActions.ADDRESS }
  | { type: DeliveryAddressFieldActions.PICKUP }
  | { type: FieldActions.CHANGE, value: string | number };

export type DeliveryAddressFieldActor = SpawnedActorRef<DeliveryAddressFieldMachineEvents>;

const addressRequired = required('Адресса обов\'язкова для заповнення');

export const createDeliveryAddressFieldMachine = (field: Field) => Machine<DeliveryAddressFieldMachineContext, DeliveryAddressFieldMachineEvents>(
  {
    id: 'payment-field',
    initial: DeliveryAddressFieldStates.EDIT,
    context: field,
    states: {
      [DeliveryAddressFieldStates.EDIT]: {
        on: {
          [FieldActions.CHANGE]: {
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
          [DeliveryAddressFieldActions.PICKUP]: {
            target: DeliveryAddressFieldStates.PICKUP,
          },
        },
      },
      [DeliveryAddressFieldStates.PICKUP]: {
        entry: 'setPickup',
        on: {
          [DeliveryAddressFieldActions.ADDRESS]: {
            target: DeliveryAddressFieldStates.EDIT,
          },
        },
        exit: 'clearPickup',
      },
    },
  },
  {
    actions: {
      setPickup: assign({
        error: undefined,
        value: 'самовивіз',
      }),
      clearPickup: assign({
        error: undefined,
        value: '',
      }),
      setValue: assign({
        value: (_ctx, event) => event.value,
      }),
      setError: assign({
        error: (_ctx, event) => addressRequired(event.value),
      }),
    },
  },
);
