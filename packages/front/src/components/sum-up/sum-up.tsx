import * as React from 'react';
import { css } from 'astroturf';

import { CartItem } from '@kebab/types';

import {
  Box,
  Button,
  Text,
} from 'Components/atoms';
import { FreeFrom } from 'Components/free-from';

interface SumUpProps {
  order?: boolean;
  disabled?: boolean;
  cart: CartItem[];
  send: (...args: any[]) => any;
}

export const SumUp: React.FC<SumUpProps> = ({
  order = false,
  disabled = false,
  cart,
  send,
}) => (
  <Box
    css={css`
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: auto 1fr;
      grid-gap: 16px;
      justify-items: end;
      align-items: center;

      @media all and (min-width: 768px) {
        & {
          grid-template-columns: 1fr auto auto;
          justify-items: start;
        }
      }
    `}
  >
    <Box
      css={css`
        display: none;

        @media all and (min-width: 768px) {
          & {
            display: block;
          }
        }
      `}
    >
      <FreeFrom />
    </Box>

    <Box
      css={css`
        color: var(--black);
      `}
    >
      <Text
        css={css`
          font-weight: bold;
        `}
      >
        {cart.length}
        {' '}
        <Text
          as="span"
          css={css`
            font-weight: normal;
          `}
        >
          - позиції
        </Text>
      </Text>

      <Text
        css={css`
          font-weight: bold;
        `}
      >
        {cart.reduce((acc, { price, qty }) => acc + price * qty, 0)}
        {' '}
        <Text
          as="span"
          css={css`
            font-weight: normal;
          `}
        >
          грн
        </Text>
      </Text>
    </Box>

    <Button
      type="button"
      onClick={send}
      disabled={disabled}
    >
      {
        order
          ? '🤤 оформити замовлення'
          : 'До кошику'
      }
    </Button>

  </Box>
);
