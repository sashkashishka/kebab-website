import {
  Machine,
  assign,
  SpawnedActorRef,
  spawn,
  sendParent,
} from 'xstate';
import {
  format,
  max,
  min,
} from 'date-fns';

import { CartItem, Field, PaymentType } from '@kebab/types';

import { getStartTime, isRequestError } from 'Utils';

import {
  createRequestMachine,
  FieldActions,
  ShopActions,
} from 'Machines';

import { ORDER } from 'Services';

import { MAX_TIME, MIN_TIME } from 'Constants';

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
  RETRY = 'RETRY',
}

export interface OrderMachineStateSchema {
  states: {
    [OrderStates.IDLE]: {
      states: {
        [OrderStates.EDIT]: {},
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
  | { type: OrderActions.RETRY }
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
        initial: OrderStates.EDIT,
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
                  actions: 'setInvalid',
                },
              ],
            },
          },
          [OrderStates.SUBMIT]: {
            invoke: {
              src: (ctx) => {
                const {
                  payment,
                  phone,
                  deliveryTime,
                  deliveryAddress,
                  chargeFrom,
                  comment,
                } = ctx;

                return createRequestMachine({
                  ...ORDER,
                  data: {
                    creationDate: format(new Date(), 'HH:mm dd.MM.yyyy'),
                    payment: payment.value,
                    phone: phone.value,
                    deliveryTime: format(deliveryTime.value, 'HH:mm dd.MM.yyyy'),
                    deliveryAddress: deliveryAddress.value,
                    chargeFrom: chargeFrom.value,
                    comment: comment.value,
                    cart: cart.map(({ item, ...rest }) => rest),
                  },
                });
              },
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
            entry: sendParent({
              type: ShopActions.SUCCESS,
            }),
          },
          [OrderStates.ERROR]: {
            on: {
              [OrderActions.RETRY]: {
                target: OrderStates.EDIT,
              },
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

        // HACK
        return fields.every(({ error }) => error === undefined)
          && fields.every(({ value }) => value);
      },
      isRequestError,
    },
    actions: {
      setInvalid: (ctx) => {
        const fields = [
          {
            actor: ctx.phoneRef,
            field: ctx.phone,
          },
          {
            actor: ctx.paymentRef,
            field: ctx.payment,
          },
          {
            actor: ctx.deliveryTimeRef,
            field: ctx.deliveryTime,
          },
          {
            actor: ctx.deliveryAddressRef,
            field: ctx.deliveryAddress,
          },
        ];

        if (ctx.payment.value === 'cash') {
          fields.push({
            actor: ctx.chargeFromRef,
            field: ctx.chargeFrom,
          });
        }

        fields.forEach(({ actor, field }) => actor.send({
          type: FieldActions.CHANGE,
          value: field.value,
        }));
      },
    },
  },
);
