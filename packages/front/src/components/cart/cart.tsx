import * as React from 'react';
import { css } from 'astroturf';

import { ShopContext } from 'Components/provider';
import {
  Box,
  Container,
  // Text,
} from 'Components/atoms';
// import { FreeFrom } from 'Components/free-from';

import {
  ShopStates,
} from 'Machines';

import { SumUp } from './sum-up';
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
            padding: 16px;
            background-color: rgba(255, 255, 255, 0.76);
            border: 1px solid #DADAE8;
            border-radius: 2px;
            box-shadow: inset -0.583919px 0.291959px 0.291959px rgba(233, 236, 249, 0.8), inset 0.291959px -0.583919px 0.291959px rgba(248, 248, 255, 0.08);
            backdrop-filter: blur(23.3568px);
          `}
        >
          <Container>
            <SumUp
              cart={cart}
              send={send}
            />
          </Container>
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
