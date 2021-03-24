import * as R from 'ramda';
import {
  Order,
  OrderSimplified,
  OrderSimplifiedTranslated,
  OrderForTable,
} from '@kebab/types';

const transformSize = R.pipe<
Order['cart'][0]['size'],
Array<string>,
string
>(
  R.keys,
  R.head,
);

const transformCartItem = (cart: Order['cart']): OrderSimplified['cart'] => cart
  .map(item => ({
    ...item,
    size: transformSize(item.size),
    toppings: R.keys(item.toppings) as string[],
  }));

export const escapePhoneField = (order: Order): Order => ({
  ...order,
  phone: ` ${order.phone}`,
});

export const transformCart = (order: Order): OrderSimplified => {
  const { cart } = order;

  return {
    ...order,
    cart: transformCartItem(cart),
  };
};

export const cartToString = (order: OrderSimplifiedTranslated): OrderForTable => ({
  ...order,
  Корзина: JSON.stringify(order['Корзина'], null, '  '),
});
