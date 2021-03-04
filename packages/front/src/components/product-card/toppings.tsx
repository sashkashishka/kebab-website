import * as React from 'react';
import { css } from 'astroturf';

import { ProductItem } from '@kebab/types';

import { Text, Box } from 'Components/atoms';
import { ProductCardActions } from 'Machines';

import { SelectorCard } from './selector-card';

interface ToppingsProps {
  toppings: Required<ProductItem>['toppings'];
  selectedToppings: Required<ProductItem>['toppings'];
  send: (...args: any[]) => any;
}

export const Toppings: React.FC<ToppingsProps> = ({ toppings, selectedToppings, send }) => (
  <Box
    css={css`
      background-color: var(--2color);
      padding: 16px;
    `}
  >
    <Text
      css={css`
        margin-bottom: 20px;
        color: var(--black);
        font-weight: bold;
        text-align: center;
      `}
    >
      Добавки (топинги)
    </Text>

    <Box
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        justify-items: center;
        grid-gap: 20px;
      `}
    >
      {
        Object.keys(toppings).map((topping) => (
          <SelectorCard
            key={topping}
            active={Boolean(selectedToppings[topping])}
            onSelect={() => send({
              type: ProductCardActions.TOGGLE_TOPPING,
              topping: {
                [topping]: toppings[topping],
              },
            })}
            name={topping}
            price={toppings[topping]}
          />
        ))
      }
    </Box>
  </Box>
);
