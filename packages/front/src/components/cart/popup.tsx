import * as React from 'react';
import { css } from 'astroturf';

import { ShopContext } from 'Components/provider';
import { Box, Text } from 'Components/atoms';
import { Popup } from 'Components/popup';
import { SumUp } from 'Components/sum-up';

import { ShopActions } from 'Machines';

import { CartProductItem } from './item';

export const CartPopup: React.FC = () => {
  const [state, send] = React.useContext(ShopContext);

  const {
    cart,
  } = state.context;

  return (
    <Popup
      isOpen
      onDismiss={() => send({ type: ShopActions.CLOSE_CART })}
      ariaLabel="cart"
    >
      <Box
        css={css`
          display: grid;
          grid-template-rows: 1fr auto;
          height: 100%;
        `}
      >
        <Box>
          <Text
            css={css`
              margin: 16px auto;
              font-size: 24px;
              line-height: 29px;
              font-weight: 800;
              text-align: center;
              color: var(--black);
            `}
          >
            Кошик
          </Text>

          {
            cart.map((item) => (
              <CartProductItem
                key={item.name}
                send={send}
                {...item}
              />
            ))
          }
        </Box>

        <Box
          css={css`
            position: sticky;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 16px;
            border-top: 1px solid var(--2color);
            background-color: var(--white);
          `}
        >
          {
            cart.length > 0 && (
              <SumUp
                cart={cart}
                send={() => send({ type: ShopActions.OPEN_ORDER })}
                order
              />
            )
          }
        </Box>
      </Box>
    </Popup>
  );
};
