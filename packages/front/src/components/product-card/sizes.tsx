import * as React from 'react';
import { css } from 'astroturf';

import { ProductItem } from '@kebab/types';

import { Text, Box } from 'Components/atoms';
import { ProductCardActions } from 'Machines';

import { SelectorCard } from './selector-card';

interface SizesProps {
  sizes: ProductItem['sizes'];
  send: (...args: any[]) => any;
  currentSize: ProductItem['sizes'];
}

export const Sizes: React.FC<SizesProps> = ({ sizes, send, currentSize }) => (
  <Box
    css={css`
      padding: 0 16px;
      margin-bottom: 16px;
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
      Розмір/вага
    </Text>

    <Box
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        justify-items: center;
        grid-gap: 20px;
      `}
    >
      {
        Object.keys(sizes).map((size) => {
          const item = sizes[size];

          return (
            <SelectorCard
              key={size}
              active={Boolean(currentSize[size])}
              name={size}
              price={item[0]}
              weight={item[1]}
              onSelect={() => send({
                type: ProductCardActions.CHANGE_SIZE,
                size: {
                  [size]: item,
                },
              })}
            />
          );
        })
      }
    </Box>
  </Box>
);
