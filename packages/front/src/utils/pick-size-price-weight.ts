import * as R from 'ramda';

import { ProductItem } from '@kebab/types';

type PriceWeightTuple = ProductItem['sizes'][keyof ProductItem['sizes']];

export const pickSizePriceWeight = (sizes: ProductItem['sizes']): PriceWeightTuple => R.pipe<
ProductItem['sizes'],
Array<keyof ProductItem['sizes']>,
keyof ProductItem['sizes'],
PriceWeightTuple
>(
  R.keys,
  R.head,
  R.prop(R.__, sizes),
)(sizes) || [];
