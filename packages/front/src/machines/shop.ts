import {
  Machine,
  assign,
  State,
  Interpreter,
  Typestate,
  spawn,
} from 'xstate';

import {
  Order,
  ProductItem,
  ProductsList,
  CartItem,
} from '@kebab/types';

import {
  isRequestError,
  isDuplicate,
  findDuplicateIndex,
} from 'Utils';
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
  // cart
  OPEN_CART = 'OPEN_CART',
  CLOSE_CART = 'CLOSE_CART',
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  INC = 'INC',
  DEC = 'DEC',
  // order
  OPEN_ORDER = 'OPEN_ORDER',
  CLOSE_ORDER = 'OPEN_ORDER',
}

export interface ProductItemWithMachine extends ProductItem {
  productRef: ProductCardActor;
}

interface ShopMachineContext extends Order {
  products: ProductItemWithMachine[];
  menuFilterRef: MenuFilterActor;
}

export interface ShopMachineStateSchema {
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
  | { type: ShopActions.OPEN_CART }
  | { type: ShopActions.CLOSE_CART }
  | { type: ShopActions.ADD_TO_CART, item: CartItem }
  | { type: ShopActions.REMOVE_FROM_CART, item: CartItem }
  | { type: ShopActions.INC, item: CartItem }
  | { type: ShopActions.DEC, item: CartItem }
  | { type: ShopActions.OPEN_ORDER };

export type ShopMachineInterpreted = [
  State<ShopMachineContext, ShopMachineEvents, any, Typestate<ShopMachineContext>>,
  Interpreter<ShopMachineContext, any, ShopMachineEvents, Typestate<ShopMachineContext>>['send'],
  Interpreter<ShopMachineContext, any, ShopMachineEvents, Typestate<ShopMachineContext>>,
];

// TODO store context into sessionStorage
export const ShopMachine = Machine<ShopMachineContext, ShopMachineEvents>(
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
              [ShopActions.ADD_TO_CART]: [
                {
                  cond: 'isDuplicate',
                  actions: 'inc',
                },
                {
                  actions: assign({
                    cart: (ctx, event) => ctx.cart.concat(event.item),
                  }),
                },
              ],
            },
          },
          [ShopStates.CART]: {
            on: {
              [ShopActions.CLOSE_CART]: {
                target: ShopStates.IDLE,
              },
              [ShopActions.OPEN_ORDER]: {
                target: ShopStates.ORDER,
              },
              [ShopActions.REMOVE_FROM_CART]: {
                actions: 'removeItem',
              },
              [ShopActions.INC]: {
                actions: 'inc',
              },
              [ShopActions.DEC]: {
                actions: 'dec',
              },
            },
          },
          [ShopStates.ORDER]: {
            on: {
              [ShopActions.OPEN_ORDER]: {},
              [ShopActions.CLOSE_ORDER]: {
                target: ShopStates.IDLE,
              },
            },
          },
          [ShopStates.SUCCESS]: {
            on: {
            },
          },
        },
      },
    },
  },
  {
    guards: {
      isRequestError,
      isDuplicate,
    },
    actions: {
      inc: assign({
        cart: (ctx, event) => {
          const i = findDuplicateIndex(ctx.cart, event.item);

          return ctx.cart.map((item, k) => {
            if (i !== k) return item;

            return {
              ...item,
              qty: Math.min(100, item.qty + 1),
            };
          });
        },
      }),
      dec: assign({
        cart: (ctx, event) => {
          const i = findDuplicateIndex(ctx.cart, event.item);

          return ctx.cart.map((item, k) => {
            if (i !== k) return item;

            return {
              ...item,
              qty: Math.max(1, item.qty - 1),
            };
          });
        },
      }),
      removeItem: assign({
        cart: (ctx, event) => {
          const i = findDuplicateIndex(ctx.cart, event.item);

          return ctx.cart.filter((item, k) => i !== k);
        },
      }),
    },
  },
);
