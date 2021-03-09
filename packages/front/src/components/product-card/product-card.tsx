import * as React from 'react';
import { useActor } from '@xstate/react';
import { css } from 'astroturf';

import {
  ProductItemWithMachine,
  ShopActions,
  ProductCardActions,
  ProductCardStates,
  ProductCardMachineContext,
} from 'Machines';

import {
  Box,
  Img,
  Text,
  Button,
} from 'Components/atoms';
import { Popup } from 'Components/popup';

import {
  getLowestPrice,
  isSizeFilled,
  pickSizePriceWeight,
} from 'Utils';

import { Sizes } from './sizes';
import { Toppings } from './toppings';

export const ProductCard: React.FC<ProductItemWithMachine> = ({
  name,
  description,
  imageUrl,
  sizes,
  toppings,
  productRef,
}) => {
  const [state, send] = useActor(productRef);

  const {
    cartItem,
  } = state.context as ProductCardMachineContext;

  const [sizePrice, sizeWeight] = pickSizePriceWeight(cartItem.size);

  return (
    <>
      <Box
        tabIndex={0}
        css={css`
          padding: 16px;
          color: var(--black);
          background-color: var(--white);
          border-radius: 10px;
          box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s;
          outline: none;

          &:hover {
            box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.2);
          }

          &:focus {
            box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.3);
          }
          &.active {
            border: 1.5px solid #F5C002
          }
        `}
      >
        <Img
          src={imageUrl || '#'}
          alt={name}
          title={name}
          css={css`
            width: 100%;
            heigt: 100%;
            max-heigt: 150px;
            margin-bottom: 16px;
            border-radius: 10px;
            object-fit: cover;
          `}
          width="284px"
          height="150px"
        />

        <Text
          css={css`
            margin-bottom: 8px;
            font-weight: bold;
          `}
        >
          {name}
        </Text>

        <Text
          css={css`
            margin-bottom: 12px;
          `}
        >
          {description}
        </Text>

        <Text
          css={css`
            display: flex;
            justify-content: space-between;
            padding: 8px;
            margin-bottom: 12px;
            border-radius: 2px;
            background-color: var(--2color);
          `}
        >
          <span>
            Вартість
          </span>

          <span>
            від
            {' '}
            <Box
              as="span"
              css={css`
                font-weight: bold;
              `}
            >
              {getLowestPrice(sizes)}
            </Box>
            {' '}
            грн
          </span>
        </Text>

        <Button
          onClick={() => send({ type: ProductCardActions.OPEN_CARD_POPUP })}
          css={css`
            width: 100%;
          `}
        >
          В кошик
        </Button>
      </Box>

      <Popup
        isOpen={state.matches(ProductCardStates.EDIT)}
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
                  position: absolute;
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
              disabled={!isSizeFilled(state.context)}
              css={css`
                width: 100%;
              `}
            >
              Додати до кошику
            </Button>
          </Box>
        </Box>
      </Popup>
    </>
  );
};
