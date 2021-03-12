import * as React from 'react';
import { css } from 'astroturf';

import { ProductItem } from '@kebab/types';

import {
  ShopActions,
  ProductCardActions,
  ProductCardMachineContext,
} from 'Machines';

import {
  Box,
  Text,
  Button,
} from 'Components/atoms';
import { Popup } from 'Components/popup';

import {
  isSizeFilled,
  pickSizePriceWeight,
} from 'Utils';

import { Sizes } from './sizes';
import { Toppings } from './toppings';

interface ProductCardPopupProps {
  send: (...args: any[]) => any;
  context: ProductCardMachineContext;
  name: ProductItem['name'];
  toppings: ProductItem['toppings'];
  sizes: ProductItem['sizes'];
}

export const ProductCardPopup: React.FC<ProductCardPopupProps> = ({
  send,
  name,
  context,
  toppings,
  sizes,
}) => {
  const { cartItem } = context;

  const [sizePrice, sizeWeight] = pickSizePriceWeight(cartItem.size);

  return (
    <Popup
      isOpen
      onDismiss={() => send({ type: ProductCardActions.CLOSE_CARD_POPUP })}
      product
      ariaLabel="product-card"
    >
      <Box
        css={css`
          position: relative;
          display: grid;
          grid-template-rows: auto 1fr auto;
          width: 100%;
          min-height: 100%;
          padding-top: 32px;
        `}
      >
        <Sizes
          sizes={sizes}
          currentSize={cartItem.size}
          send={send}
        />

        {
          toppings && (
            <Toppings
              toppings={toppings}
              selectedToppings={cartItem.toppings}
              send={send}
            />
          )
        }

        <Box
          css={css`
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 16px 32px;
            background-color: var(--white);
            text-align: center;
            color: var(--black);

            @media all and (min-width: 768px) {
              & {
                position: sticky;
              }
            }
          `}
        >
          <Box
            css={css`
              margin-bottom: 16px;
            `}
          >
            <Text
              css={css`
                margin-bottom: 4px;
                font-weight: bold;
              `}
            >
              {name}

              {' '}

              {
                sizeWeight && (
                  <Text
                    as="span"
                    css={css`
                      color: var(--black-light);
                      font-weight: normal;
                    `}
                  >
                    {`(${sizeWeight} гр)`}
                  </Text>
                )
              }
            </Text>

            {
              Object.keys(cartItem.toppings).length > 0 && (
                <Text
                  css={css`
                    margin-bottom: 6px;
                    color: var(--black-light);
                    font-size: 14px;
                  `}
                >
                  {`+ ${Object.keys(cartItem.toppings).join(' + ')}`}
                </Text>
              )
            }

            {
              cartItem.price > 0 && (
                <Text
                  css={css`
                    font-weight: bold;
                  `}
                >
                  {cartItem.price}
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
              )
            }
          </Box>

          <Button
            onClick={() => send({ type: ShopActions.ADD_TO_CART })}
            disabled={!isSizeFilled(context)}
            css={css`
              width: 100%;
            `}
          >
            Додати до кошику
          </Button>
        </Box>
      </Box>
    </Popup>
  );
};