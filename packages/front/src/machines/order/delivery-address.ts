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

export interface DeliveryAddressFieldMachineContext extends Field<string> {}

export type DeliveryAddressFieldMachineEvents =
  | { type: DeliveryAddressFieldActions.ADDRESS }
  | { type: DeliveryAddressFieldActions.PICKUP }
  | { type: FieldActions.CHANGE, value: string };

export type DeliveryAddressFieldActor = SpawnedActorRef<DeliveryAddressFieldMachineEvents>;

const addressRequired = required('Адреса обов\'язкова для заповнення');

export const createDeliveryAddressFieldMachine = (field: Field<string>) => Machine<DeliveryAddressFieldMachineContext, DeliveryAddressFieldMachineEvents>(
  {
    id: 'delivery-address-field',
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
                  name: 'deliveryAddress',
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
        error: (_ctx) => undefined, // eslint-disable-line
        value: (_ctx) => 'самовивіз', // eslint-disable-line
      }),
      clearPickup: assign({
        error: (_ctx) => undefined, // eslint-disable-line
        value: (_ctx) => '', // eslint-disable-line
      }),
      setValue: assign({
        value: (_ctx, event) => event.type === FieldActions.CHANGE
          ? event.value
          : '',
      }),
      setError: assign({
        error: (_ctx, event) => event.type === FieldActions.CHANGE
          ? addressRequired(event.value)
          : undefined,
      }),
    },
  },
);
