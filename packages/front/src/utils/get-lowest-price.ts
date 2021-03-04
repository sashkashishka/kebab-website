import * as R from 'ramda';

import { ProductItem } from '@kebab/types';

export const getLowestPrice = R.pipe<
ProductItem['sizes'],
Array<ProductItem['sizes'][keyof ProductItem['sizes']]>,
Array<ProductItem['sizes'][keyof ProductItem['sizes']]>,
ProductItem['sizes'][keyof ProductItem['sizes']],
ProductItem['sizes'][keyof ProductItem['sizes']][0]
>(
  R.values,
  R.sort(([priceA], [priceB]) => priceA - priceB),
  R.head,
  R.head,
);
