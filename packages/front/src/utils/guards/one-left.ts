import { CartItem } from '@kebab/types';

import { findDuplicateIndex } from '../find-duplicate-index';

export const oneLeft = (ctx: { cart: CartItem[] }, event: { item: CartItem }): boolean => {
  const i = findDuplicateIndex(ctx.cart, event.item);

  return ctx.cart[i].qty === 1;
};
