import * as R from 'ramda';

import { CartItem } from '@kebab/types';

export const findDuplicateIndex = (cart: CartItem[], item: CartItem): number => cart?.findIndex(({ name, size, toppings }) => R.equals(
  { name, size, toppings },
  {
    name: item.name,
    size: item.size,
    toppings: item.toppings,
  },
));
