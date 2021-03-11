import {
  Machine,
  assign,
  SpawnedActorRef,
  spawn,
} from 'xstate';

import { CartItem, Field, PaymentType } from '@kebab/types';

import { getStartTime } from 'Utils';

import { createRequestMachine } from 'Machines';

import { ORDER } from 'Services';

import { createPhoneFieldMachine, PhoneFieldActor } from './phone';
import { createDeliveryAddressFieldMachine, DeliveryAddressFieldActor } from './delivery-address';
import { createPaymentFieldMachine, PaymentFieldActor } from './payments';
import { createChargeFromFieldMachine, ChargeFromFieldActor } from './charge-from';
import { createDeliveryTimeFieldMachine, DeliveryTimeFieldActor } from './delivery-time';
import { createCommentFieldMachine, CommentFieldActor } from './comment';

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
  phone: Field<string>;
  phoneRef: PhoneFieldActor;
  payment: Field<PaymentType>;
  paymentRef: PaymentFieldActor;
  chargeFrom: Field<string>;
  chargeFromRef: ChargeFromFieldActor;
  deliveryTime: Field<Date>;
  deliveryTimeRef: DeliveryTimeFieldActor;
  deliveryAddress: Field<string>;
  deliveryAddressRef: DeliveryAddressFieldActor;
  comment: Field<string>;
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
      payment: {
        value: 'card',
        error: undefined,
      },
      chargeFrom: {
        value: '0',
        error: undefined,
      },
      deliveryTime: {
        value: getStartTime(new Date()),
        error: undefined,
      },
      comment: {
        value: '',
        error: undefined,
      },
      // @ts-ignore
      phoneRef: undefined,
      // @ts-ignore
      deliveryAddressRef: undefined,
      // @ts-ignore
      paymentRef: undefined,
      // @ts-ignore
      chargeFromRef: undefined,
      // @ts-ignore
      deliveryTimeRef: undefined,
      // @ts-ignore
      commentRef: undefined,
      cart,
    },
    states: {
      [OrderStates.IDLE]: {
        entry: assign({
          phoneRef: (ctx) => spawn(createPhoneFieldMachine(ctx.phone)),
          deliveryAddressRef: (ctx) => spawn(createDeliveryAddressFieldMachine(ctx.deliveryAddress)),
          paymentRef: (ctx) => spawn(createPaymentFieldMachine(ctx.payment)),
          chargeFromRef: (ctx) => spawn(createChargeFromFieldMachine(ctx.chargeFrom)),
          deliveryTimeRef: (ctx) => spawn(createDeliveryTimeFieldMachine(ctx.deliveryTime)),
          commentRef: (ctx) => spawn(createCommentFieldMachine(ctx.comment)),
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
                  target: OrderStates.SUBMIT,
                  cond: 'isFormValid',
                },
                {
                  actions: 'focusInvalid',
                },
              ],
            },
          },
          [OrderStates.SUBMIT]: {
            invoke: {
              src: () => Promise.resolve(1),
              onDone: [
                {
                  target: OrderStates.ERROR,
                  cond: 'isRequestError',
                },
                {
                  target: OrderStates.SUCCESS,
                },
              ],
            },
          },
          [OrderStates.SUCCESS]: {
            type: 'final',
          },
          [OrderStates.ERROR]: {
            on: {
              
            },
          },
        },
      },
    },
  },
  {
    guards: {
      isFormValid: (ctx) => {
        const fields = [
          ctx.phone,
          ctx.payment,
          ctx.deliveryTime,
          ctx.deliveryAddress,
        ];

        if (ctx.payment.value === 'cash') {
          fields.push(ctx.chargeFrom);
        }

        return fields.every(({ error }) => error === undefined);
      },
    },
    actions: {
      focusInvalid: assign((ctx) => {
        const fields = [
          ctx.phone,
          ctx.payment,
          ctx.deliveryTime,
          ctx.deliveryAddress,
        ];

        if (ctx.payment.value === 'cash') {
          fields.push(ctx.chargeFrom);
        }

      }),
    },
  },
);
