import {
  Machine,
  assign,
  SpawnedActorRef,
  sendParent,
} from 'xstate';

import { ProductItem, CartItem } from '@kebab/types';

import { ShopActions } from 'Machines';
import { isSizeFilled, getSingleSize, calcPrice } from 'Utils';

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

export interface ProductCardMachineContext {
  item: ProductItem;
  cartItem: CartItem;
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
    id: `product-card: ${item.name}`,
    initial: ProductCardStates.IDLE,
    context: {
      item,
      cartItem: {
        price: 0,
        qty: 1,
        size: getSingleSize(item.sizes) || {},
        toppings: {},
        name: item.name,
        item,
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
        entry: 'calculatePrice',
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
            actions: [
              assign({
                cartItem: (ctx, event) => ({
                  ...ctx.cartItem,
                  size: event.size,
                }),
              }),
              'calculatePrice',
            ],
          },
          [ProductCardActions.TOGGLE_TOPPING]: {
            actions: [
              assign({
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
              'calculatePrice',
            ],
          },
        },
      },
    },
  },
  {
    guards: {
      isSizeFilled,
    },
    actions: {
      calculatePrice: assign({
        cartItem: (ctx) => ({
          ...ctx.cartItem,
          price: calcPrice(ctx.cartItem),
        }),
      }),
    },
  },
);
