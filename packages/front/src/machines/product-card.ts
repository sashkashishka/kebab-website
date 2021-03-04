import {
  Machine,
  assign,
  SpawnedActorRef,
  sendParent,
} from 'xstate';

import { ProductItem, Order } from '@kebab/types';

import { ShopActions } from 'Machines';
import { isSizeFilled, getSingleSize } from 'Utils';

export enum ProductCardStates {
  IDLE = 'idle',
  EDIT = 'edit',
}

export enum ProductCardActions {
  OPEN_CARD_POPUP = 'OPEN_CARD_POPUP',
  CHANGE_SIZE = 'CHANGE_SIZE',
  TOGGLE_TOPPING = 'TOGGLE_TOPPING',
  CLOSE_CARD_POPUP = 'CLOSE_CARD_POPUP',
}

interface ProductCardMachineContext {
  item: ProductItem;
  cartItem: Order['cart'][0];
  price: number;
}

interface ProductCardMachineStateSchema {
  states: {
    [ProductCardStates.IDLE]: {},
    [ProductCardStates.EDIT]: {},
  }
}

type ProductCardMachineEvents =
  | { type: ShopActions.ADD_TO_CART }
  | { type: ProductCardActions.CHANGE_SIZE, size: Required<ProductItem>['sizes'] }
  | { type: ProductCardActions.TOGGLE_TOPPING, topping: Required<ProductItem>['toppings'] }
  | { type: ProductCardActions.OPEN_CARD_POPUP }
  | { type: ProductCardActions.CLOSE_CARD_POPUP };

export type ProductCardActor = SpawnedActorRef<ProductCardMachineEvents>;

// TODO after ADD_TO_CART restore context to initial values
export const createProductCardMachine = (item: ProductItem) => Machine<ProductCardMachineContext, ProductCardMachineStateSchema, ProductCardMachineEvents >(
  {
    id: 'product-card',
    initial: ProductCardStates.IDLE,
    context: {
      item,
      cartItem: {
        qty: 1,
        size: getSingleSize(item.sizes) || {},
        toppings: {},
        name: item.name,
      },
      price: 0,
    },
    states: {
      [ProductCardStates.IDLE]: {
        on: {
          [ProductCardActions.OPEN_CARD_POPUP]: {
            target: ProductCardStates.EDIT,
          },
        },
      },
      [ProductCardStates.EDIT]: {
        on: {
          [ShopActions.ADD_TO_CART]: [
            {
              target: ProductCardStates.IDLE,
              cond: 'isSizeFilled',
              actions: sendParent((ctx) => ({
                type: ShopActions.ADD_TO_CART,
                item: ctx.cartItem,
              })),
            },
          ],
          [ProductCardActions.CLOSE_CARD_POPUP]: {
            target: ProductCardStates.IDLE,
          },
          [ProductCardActions.CHANGE_SIZE]: {
            actions: assign({
              cartItem: (ctx, event) => ({
                ...ctx.cartItem,
                size: event.size,
              }),
            }),
          },
          [ProductCardActions.TOGGLE_TOPPING]: {
            actions: assign({
              cartItem: (ctx, event) => {
                const t = { ...ctx.cartItem.toppings };
                const tKey = Object.keys(event.topping)[0];

                if (t[tKey]) {
                  delete t[tKey];
                } else {
                  t[tKey] = event.topping[tKey];
                }

                return {
                  ...ctx.cartItem,
                  toppings: t,
                };
              },
            }),
          },
        },
      },
    },
  },
  {
    guards: {
      isSizeFilled,
    },
  },
);
