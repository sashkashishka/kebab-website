import { CartItem } from '@kebab/types';

import { findDuplicateIndex } from '../find-duplicate-index';

export const isDuplicate = (ctx: { cart: CartItem[] }, event: { item: CartItem }): boolean => findDuplicateIndex(ctx.cart, event.item) !== -1;
