import * as React from 'react';
import { css } from 'astroturf';

import { ShopContext } from 'Components/provider';
import {
  Box,
  Button,
  Text,
} from 'Components/atoms';
import { FreeFrom } from 'Components/free-from';

import {
  ShopStates,
  ShopActions,
} from 'Machines';

import { CartPopup } from './popup';

export const Cart: React.FC = () => {
  const [state, send] = React.useContext(ShopContext);

  const {
    cart,
  } = state.context;

  switch (true) {
    case state.matches({ [ShopStates.BUY]: ShopStates.IDLE }):
      if (cart.length === 0) return null;

      return (
        <Box
          css={css`
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
            display: grid;
            grid-template-rows: 100%;
            grid-template-columns: auto 1fr;
            grid-gap: 16px;
            justify-items: end;
            align-items: center;
            padding: 16px;
            background-color: rgba(255, 255, 255, 0.76);
            border: 1px solid #DADAE8;
            border-radius: 2px;
            box-shadow: inset -0.583919px 0.291959px 0.291959px rgba(233, 236, 249, 0.8), inset 0.291959px -0.583919px 0.291959px rgba(248, 248, 255, 0.08);
            backdrop-filter: blur(23.3568px);

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
            onClick={() => send({ type: ShopActions.OPEN_CART })}
          >
            До кошику
          </Button>

        </Box>
      );

    case state.matches({ [ShopStates.BUY]: ShopStates.CART }):
      return (
        <CartPopup />
      );

    default:
      return null;
  }
};
