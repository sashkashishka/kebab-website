export interface Field<V = string | number> {
  value: V;
  error: string | undefined;
}

export type PaymentType = 'cash' | 'card';
