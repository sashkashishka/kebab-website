import { ProductItem } from '@kebab/types';

export const getSingleSize = (sizes: ProductItem['sizes']) => Object.keys(sizes).length === 1
  ? sizes
  : undefined;
