import { Machine, assign } from 'xstate';

import { Order, ProductsList } from '@kebab/types';

import { isRequestError } from 'Utils';
import { GET_PRODUCT_LIST } from 'Services';

import { createRequestMachine } from './request';

export enum ShopStates {
  FETCH = 'fetch',
  ERROR = 'error',
  BUY = 'buy',
  CART = 'cart',
  ORDER = 'order',
  SUCCESS = 'success',
}

export enum ShopActions {
  OPEN_CART = 'OPEN_CART',
  OPEN_ORDER = 'OPEN_ORDER',
  OPEN_BUY = 'OPEN_BUY',
}

interface ShopMachineContext extends Order {
  products: ProductsList;
}

interface ShopMachineStateSchema {
  states: {
    [ShopStates.FETCH]: {},
    [ShopStates.ERROR]: {},
    [ShopStates.BUY]: {},
    [ShopStates.CART]: {},
    [ShopStates.ORDER]: {},
    [ShopStates.SUCCESS]: {},
  }
}

type ShopMachineEvents =
  | { type: ShopActions.OPEN_BUY }
  | { type: ShopActions.OPEN_CART }
  | { type: ShopActions.OPEN_ORDER };

// TODO store context into sessionStorage
export const ShopMachine = Machine<ShopMachineContext, ShopMachineStateSchema, ShopMachineEvents>(
  {
    id: 'shop',
    initial: ShopStates.FETCH,
    context: {
      creation_date: new Date(),
      phone: '',
      address: '',
      payment: 'card',
      charge_from: 0,
      delivery_time: new Date(), // TODO add 1 hour to delivery time
      comment: '',
      cart: [],
      products: [],
    },
    states: {
      [ShopStates.FETCH]: {
        invoke: [
          {
            src: () => createRequestMachine(GET_PRODUCT_LIST),
            onDone: [
              {
                target: ShopStates.ERROR,
                cond: 'isRequestError',
              },
              {
                target: ShopStates.BUY,
                actions: assign({
                  products: (_ctx, event) => event.data.response.data,
                }),
              },
            ],
          },
        ],
      },
      [ShopStates.ERROR]: {
        type: 'final',
      },
      [ShopStates.BUY]: {
        on: {
          [ShopActions.OPEN_CART]: {
            target: ShopStates.CART,
          },
        },
      },
      [ShopStates.CART]: {
        on: {
          [ShopActions.OPEN_ORDER]: {
            target: ShopStates.ORDER,
          },
          [ShopActions.OPEN_BUY]: {
            target: ShopStates.BUY,
          },
        },
      },
      [ShopStates.ORDER]: {
        on: {
          [ShopActions.OPEN_ORDER]: {},
          [ShopActions.OPEN_BUY]: {},
        },
      },
      [ShopStates.SUCCESS]: {
        on: {
          [ShopActions.OPEN_BUY]: {},
        },
      },
    },
  },
  {
    guards: {
      isRequestError,
    },
  },
);
