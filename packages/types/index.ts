export * from './order';

type Weight = number;
type Price = number;

export interface ProductItem {
  type: 'kebab' | 'pizza' | 'drink';
  type_name: string;
  name: string;
  description: string;
  imageUrl: string;
  sizes: {
    [size: string]: [Price, Weight];
  };
  toppings: {
    [topping: string]: Price;
  };
}

export type ProductsList = Array<ProductItem>;

export interface CartItem {
  price: number;
  name: string;
  qty: number;
  size: ProductItem['sizes'];
  toppings: ProductItem['toppings'];
  item: ProductItem;
}

export interface Order {
  creationDate: string;
  phone: string;
  deliveryAddress: string;
  payment: 'card' | 'cash';
  chargeFrom: string;
  deliveryTime: string;
  comment: string;
  cart: Omit<CartItem, 'item'>[];
}

export interface OrderSimplified extends Omit<Order, 'cart'> {
  cart: Array<{
    price: number;
    name: string;
    qty: number;
    size: string;
    toppings: string[];
  }>;
}

export interface OrderSimplifiedTranslated {
  'Дата создания': string;
  'Номер телефона': string;
  'Адрес доставки': string;
  'Тип оплаты': 'card' | 'cash';
  'Сдача с': string;
  'Время доставки': string;
  'Комментарий': string;
  'Корзина': Array<{
    'Количество': number;
    'Размер': string;
    'Наименование': string;
    'Добавки': string[];
    'Цена': number;
  }>;
}

export interface OrderForTable extends Omit<OrderSimplifiedTranslated, 'Корзина'> {
  'Корзина': string;
  [header: string]: string | number | boolean;
}
