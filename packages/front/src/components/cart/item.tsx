import * as React from 'react';
import { css } from 'astroturf';

import {
  Box,
  Img,
  Text,
  RemoveButton,
  IncButton,
  DecButton,
} from 'Components/atoms';

import { CartItem } from '@kebab/types';

import {
  ShopActions,
} from 'Machines';

import { pickSizePriceWeight } from 'Utils';

interface CartProductItemProps extends CartItem {
  send: (...args: any[]) => any;
}

export const CartProductItem: React.FC<CartProductItemProps> = ({
  send,
  ...cartItem
}) => {
  const {
    qty,
    price,
    name,
    size,
    toppings,
    item,
  } = cartItem;

  const [sizePrice, sizeWeight] = pickSizePriceWeight(size);

  return (
    <Box
      css={css`
        --counter-color: #F4F4F9;

        &:nth-child(odd) {
          --counter-color: var(--white);
          background-color: #F4F4F9;
        }

        display: grid;
        grid-template-rows: auto 1px 1fr;
        grid-template-columns: 1fr auto;
        grid-row-gap: 10px;
        align-items: center;
        margin-bottom: 16px;
        padding: 16px;
        color: var(--black);
        background-color: var(--white);

        @media all and (min-width: 768px) {
          & {
            grid-template-rows: 100%;
            grid-template-columns: auto 1fr auto auto auto;
            grid-gap: 32px;
            border-top: 1px solid var(--2color);
          }
        }
      `}
    >
      <Img
        src={item.imageUrl}
        alt={name}
        width="100px"
        height="100px"
        css={css`
          display: none;
          border-radius: 10px;
          object-fit: cover;

          @media all and (min-width: 768px) {
            & {
              display: block;
            }
          }
        `}
      />

      <Box
        css={css`
          grid-column: 1/2;

          @media all and (min-width: 768px) {
            & {
              grid-column: auto;
            }
          }
        `}
      >
        <Text
          css={css`
            margin-bottom: 4px;
            font-weight: bold;
          `}
        >
          {name}
          {
            sizeWeight && (
              <>
                {' '}
                <Text
                  as="span"
                  css={css`
                    font-weight: normal;
                    color: var(--black-light);
                  `}
                >
                  {`(${sizeWeight} гр)`}
                </Text>
              </>
            )
          }
        </Text>

        <Text
          css={css`
            margin-bottom: 6px;
            color: var(--black-light);
            font-size: 14px;
          `}
        >
          {
            Object.keys(toppings).length > 0
              ? `(+ ${Object.keys(toppings).join(' + ')})`
              : '(без добавок)'
          }
        </Text>

        <Text>
          {item.description}
        </Text>
      </Box>

      <Box
        css={css`
          display: grid;
          grid-gap: 8px;
          grid-template-columns: 32px 16px 32px;
          align-items: center;
          justify-items: center;
          background-color: var(--counter-color);
          border-radius: 40px;
        `}
      >
        <DecButton
          onClick={() => send({
            type: ShopActions.DEC,
            item: cartItem,
          })}
          css={css`
            flex-shrink: 0;
          `}
        />

        <Text
          css={css`
            flex-shrink: 0;
            font-weight: bold;
          `}
        >
          {qty}
        </Text>

        <IncButton
          onClick={() => send({
            type: ShopActions.INC,
            item: cartItem,
          })}
          css={css`
            flex-shrink: 0;
          `}
        />
      </Box>

      <Text
        css={css`
          font-weight: bold;
          grid-column: 1/2;
          grid-row: 3/4;

          @media all and (min-width: 768px) {
            & {
              grid-column: auto;
              grid-row: auto;
            }
          }
        `}
      >
        {price}
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

      <Box
        as="hr"
        css={css`
          width: 100%;
          height: 1px;
          margin: 0;
          grid-column: 1/3;
          grid-row: 2/3;
          background-color: #DADAE8;
          border: none;
          color: transparent;

          @media all and (min-width: 768px) {
            & {
              display: none;
            }
          }
        `}
      />

      <RemoveButton
        type="button"
        onClick={() => send({
          type: ShopActions.REMOVE_FROM_CART,
          item: cartItem,
        })}
        css={css`
          grid-column: 2/3;
          grid-row: 1/2;
          justify-self: end;

          @media all and (min-width: 768px) {
            & {
              grid-column: auto;
              grid-row: auto;
              justify-self: auto;
            }
          }
        `}
      />
    </Box>
  );
};
