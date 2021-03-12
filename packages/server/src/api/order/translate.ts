import { OrderSimplified, OrderSimplifiedTranslated } from '@kebab/types';

import { isPlainObject } from '../../utils';

const dictionary = {
  creationDate: 'Дата создания',
  phone: 'Номер телефона',
  deliveryAddress: 'Адрес доставки',
  payment: 'Тип оплаты',
  chargeFrom: 'Сдача с',
  deliveryTime: 'Время доставки',
  comment: 'Комментарий',
  cart: 'Корзина',
  qty: 'Количество',
  size: 'Размер',
  name: 'Наименование',
  toppings: 'Добавки',
  price: 'Цена',
};

export const translateKeys = (order: OrderSimplified): OrderSimplifiedTranslated => {
  const translate = (val: any): any => {
    if (Array.isArray(val)) {
      return val.map(translate);
    }

    if (isPlainObject(val)) {
      return Object.keys(val).reduce((acc, k) => {
        acc[dictionary[k]] = translate(val[k]);
        return acc;
      }, {});
    }

    return val;
  };

  return translate(order);
};
