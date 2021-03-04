import {
  Machine,
  assign,
  State,
  Interpreter,
  Typestate,
  spawn,
} from 'xstate';

import { Order, ProductItem, ProductsList } from '@kebab/types';

import { isRequestError } from 'Utils';
import { GET_PRODUCT_LIST } from 'Services';
import {
  createRequestMachine,
  createMenuFilterMachine,
  MenuFilterActor,
  createProductCardMachine,
  ProductCardActor,
} from 'Machines';

export enum ShopStates {
  FETCH = 'fetch',
  ERROR = 'error',
  BUY = 'buy',
  IDLE = 'idle',
  CART = 'cart',
  ORDER = 'order',
  SUCCESS = 'success',
}

export enum ShopActions {
  OPEN_CART = 'OPEN_CART',
  OPEN_ORDER = 'OPEN_ORDER',
  OPEN_BUY = 'OPEN_BUY',
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
}

export interface ProductItemWithMachine extends ProductItem {
  productRef: ProductCardActor;
}

interface ShopMachineContext extends Order {
  products: ProductItemWithMachine[];
  menuFilterRef: MenuFilterActor;
}

interface ShopMachineStateSchema {
  states: {
    [ShopStates.FETCH]: {},
    [ShopStates.ERROR]: {},
    [ShopStates.BUY]: {
      states: {
        [ShopStates.IDLE]: {},
        [ShopStates.CART]: {},
        [ShopStates.ORDER]: {},
        [ShopStates.SUCCESS]: {},
      },
    },
  }
}

type ShopMachineEvents =
  | { type: ShopActions.OPEN_BUY }
  | { type: ShopActions.OPEN_CART }
  | { type: ShopActions.ADD_TO_CART, item: Order['cart'][0] }
  | { type: ShopActions.REMOVE_FROM_CART, item: Order['cart'][0] }
  | { type: ShopActions.OPEN_ORDER };

export type ShopMachineInterpreted = [
  State<ShopMachineContext, ShopMachineEvents, any, Typestate<ShopMachineContext>>,
  Interpreter<ShopMachineContext, any, ShopMachineEvents, Typestate<ShopMachineContext>>['send'],
  Interpreter<ShopMachineContext, any, ShopMachineEvents, Typestate<ShopMachineContext>>,
];

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
      // @ts-ignore
      menuFilterRef: undefined,
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
                actions: [
                  assign({
                    products: (_ctx, event) => (event.data.response.data as ProductsList).map((item) => ({
                      ...item,
                      productRef: spawn(createProductCardMachine(item)),
                    })),
                  }),
                  assign({
                    menuFilterRef: (ctx) => spawn(createMenuFilterMachine(ctx.products)),
                  }),
                ],
              },
            ],
          },
        ],
      },
      [ShopStates.ERROR]: {
        type: 'final',
      },
      [ShopStates.BUY]: {
        initial: ShopStates.IDLE,
        states: {
          [ShopStates.IDLE]: {
            on: {
              [ShopActions.OPEN_CART]: {
                target: ShopStates.CART,
              },
              [ShopActions.ADD_TO_CART]: {
                actions: assign({
                  cart: (ctx, event) => ctx.cart.concat(event.item),
                }),
              },
            },
          },
          [ShopStates.CART]: {
            on: {
              [ShopActions.OPEN_ORDER]: {
                target: ShopStates.ORDER,
              },
              [ShopActions.OPEN_BUY]: {
                target: ShopStates.IDLE,
              },
              [ShopActions.REMOVE_FROM_CART]: {
                actions: assign({
                  cart: (ctx, event) => ctx.cart.filter((item) => item !== event.item),
                }),
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
    },
  },
  {
    guards: {
      isRequestError,
    },
  },
);
