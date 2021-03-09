import * as React from 'react';
import { css } from 'astroturf';

import { ShopContext } from 'Components/provider';
import {
  Box,
  Button,
  Text,
} from 'Components/atoms';
import { Popup } from 'Components/popup';

import {
  ShopStates,
  ShopActions,
} from 'Machines';

import { CartProductItem } from './item';

// TODO view when cart is empty
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
          padding: 16px;

        `}
      >
        <Text
          css={css`
            margin-bottom: 16px;
            font-size: 24px;
            font-weight: bold;
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

        <Box>
          {
            cart.length > 0 && (
              <Button
                type="button"
                onClick={() => send({ type: ShopActions.OPEN_ORDER })}
              >
                🤤 оформить заказ
              </Button>
            )
          }
        </Box>
      </Box>
    </Popup>
  );
};
