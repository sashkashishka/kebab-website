import {
  Machine,
  assign,
  SpawnedActorRef,
  spawn,
} from 'xstate';

import { CartItem, Field, PaymentType } from '@kebab/types';

import { createPhoneFieldMachine, PhoneFieldActor } from './phone';
import { createDeliveryAddressFieldMachine, DeliveryAddressFieldActor } from './delivery-address';

export enum OrderStates {
  EDIT = 'edit',
  IDLE = 'idle',
  SUBMIT = 'submit',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum OrderActions {
  CHANGE = 'CHANGE',
  SUBMIT = 'SUBMIT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  EDIT = 'EDIT',
}

export interface OrderMachineStateSchema {
  states: {
    [OrderStates.EDIT]: {
      states: {
        [OrderStates.IDLE]: {},
        [OrderStates.SUBMIT]: {},
        [OrderStates.SUCCESS]: {},
        [OrderStates.ERROR]: {},
      },
    },
  },
}

export interface OrderMachineContext {
  phone: Field;
  phoneRef: PhoneFieldActor;
  payment: Field<PaymentType>;
  paymentRef: PaymenFieldActor;
  chargeFrom: Field;
  chargeFromRef: ChargeFromFieldActor;
  deliveryTime: Field;
  deliveryTimeRef: DeliveryTimeFieldActor;
  deliveryAddress: Field;
  deliveryAddressRef: DeliveryAddressFieldActor;
  comment: Field;
  commentRef: CommentFieldActor;
  cart: CartItem[];
}

export interface ChangeEvent {
  type: OrderActions.CHANGE,
  field: {
    value: string | number;
    error: string | undefined;
    name: string;
  }
}

type OrderMachineEvents =
  | ChangeEvent
  | { type: OrderActions.SUCCESS }
  | { type: OrderActions.ERROR }
  | { type: OrderActions.EDIT }
  | { type: OrderActions.SUBMIT };

export type OrderActor = SpawnedActorRef<OrderMachineEvents>;

export const createOrderMachine = (cart: CartItem[]) => Machine<OrderMachineContext, OrderMachineEvents>(
  {
    id: 'order',
    initial: OrderStates.IDLE,
    context: {
      phone: {
        value: '',
        error: undefined,
      },
      deliveryAddress: {
        value: '',
        error: undefined,
      },
      // @ts-ignore
      phoneRef: undefined,
      // @ts-ignore
      deliveryAddressRef: undefined,
      cart,
    },
    states: {
      [OrderStates.IDLE]: {
        entry: assign({
          phoneRef: (ctx) => spawn(createPhoneFieldMachine(ctx.phone)),
          deliveryAddressRef: (ctx) => spawn(createDeliveryAddressFieldMachine(ctx.deliveryAddress)),
        }),
        on: {
          [OrderActions.CHANGE]: {
            actions: assign((ctx, event) => {
              const { name, ...rest } = event.field;

              return {
                ...ctx,
                [name]: rest,
              };
            }),
          },
        },
        states: {
          [OrderStates.EDIT]: {
            on: {
              [OrderActions.SUBMIT]: [
                {
                  // target: OrderStates.SUBMIT,
                  // cond: 'isFieldsValid',
                },
              ],
            },
          },
        },
      },
    },
  },
);
