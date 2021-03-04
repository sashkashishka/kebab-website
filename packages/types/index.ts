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
  toppings?: {
    [topping: string]: Price;
  };
}

export type ProductsList = Array<ProductItem>;

export interface Order {
  creation_date: Date;
  phone: string;
  address: string;
  payment: 'card' | 'cash';
  charge_from?: number;
  delivery_time: Date;
  comment: string;
  cart: Array<{
    name: string;
    qty: number;
    size: ProductItem['sizes'];
    toppings: ProductItem['toppings'];
  }>;
}
