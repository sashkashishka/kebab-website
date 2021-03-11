import { CartItem } from '@kebab/types';

export const cartNotEmpty = (ctx: { cart: CartItem[] }): boolean => ctx.cart.length > 0;
