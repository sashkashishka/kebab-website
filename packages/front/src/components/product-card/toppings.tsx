import * as React from 'react';
import { css } from 'astroturf';

import { ProductItem } from '@kebab/types';

import { Text, Box } from 'Components/atoms';
import { ProductCardActions } from 'Machines';

import baconImg from 'Img/toppings/bacon.png';
import cheeseImg from 'Img/toppings/cheese.png';
import cornImg from 'Img/toppings/corn.png';
import mushroomsImg from 'Img/toppings/mushrooms.png';
import pineappleImg from 'Img/toppings/pineapple.png';

import { SelectorCard } from './selector-card';

interface ToppingsProps {
  toppings: Required<ProductItem>['toppings'];
  selectedToppings: Required<ProductItem>['toppings'];
  send: (...args: any[]) => any;
}

const images = {
  Ананас: pineappleImg,
  Бекон: baconImg,
  Гриби: mushroomsImg,
  Кукурудза: cornImg,
  Сир: cheeseImg,
};

export const Toppings: React.FC<ToppingsProps> = ({ toppings, selectedToppings, send }) => (
  <Box
    css={css`
      background-color: var(--2color);
      padding: 16px;

      @media all and (min-width: 960px) {
        & {
          background-color: transparent;
          padding: 32px;
        }
      }
    `}
  >
    <Text
      css={css`
        margin-bottom: 20px;
        color: var(--black);
        font-weight: bold;
        text-align: center;

        @media all and (min-width: 960px) {
          & {
            text-align: start;
            padding-bottom: 20px;
            border-bottom: 1px solid #DADAE8;
          }
        }
      `}
    >
      Добавки
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
            imgUrl={images[topping]}
          />
        ))
      }
    </Box>
  </Box>
);
