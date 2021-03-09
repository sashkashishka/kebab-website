import { CartItem } from '@kebab/types';

import { pickSizePriceWeight } from '../pick-size-price-weight';

export const calcPrice = (cartItem: CartItem): number => {
  const [sizePrice] = pickSizePriceWeight(cartItem.size);
  const {
    qty,
    toppings,
  } = cartItem;

  const toppingPrices = Object.values(toppings).reduce((acc, curr) => acc + curr, 0);

  return qty * (sizePrice + toppingPrices);
};
