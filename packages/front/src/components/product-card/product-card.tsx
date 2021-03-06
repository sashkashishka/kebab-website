import * as React from 'react';
import { useActor } from '@xstate/react';
import { css } from 'astroturf';

import {
  ProductItemWithMachine,
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

import {
  DropEmoji,
  PizzaEmoji,
  KebabEmoji,
} from 'Components/emoji';

import { getLowestPrice } from 'Utils';

import { KEBAB_TYPE, PIZZA_TYPE, DRINK_TYPE } from 'Constants';

import { ProductCardPopup } from './popup';

export const ProductCard: React.FC<ProductItemWithMachine> = ({
  name,
  description,
  imageUrl,
  sizes,
  toppings,
  productRef,
  type,
  type_name,
}) => {
  const [state, send] = useActor(productRef);

  return (
    <>
      <Box
        css={css`
          display: grid;
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
            max-height: 150px;
            margin-bottom: 16px;
            border-radius: 10px;
            object-fit: cover;
          `}
          width="284px"
          height="150px"
        />

        <Text
          as="h2"
          css={css`
            margin-bottom: 8px;
            font-size: 17px;
            font-weight: bold;
          `}
        >
          {name}
        </Text>

        <Text
          css={css`
            margin-bottom: 12px;
            font-size: 15px;
            color: #4A4647;
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
          <Text
            as="span"
            css={css`
              font-weight: 15px;
            `}
          >
            Вартість
          </Text>

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
          {
            type === KEBAB_TYPE && (
              <KebabEmoji />
            )
          }
          {
            type === PIZZA_TYPE && (
              <PizzaEmoji />
            )
          }
          {
            type === DRINK_TYPE && (
              <DropEmoji />
            )
          }
          {' '}
          Додати у кошик
        </Button>
      </Box>

      {
        state.matches(ProductCardStates.EDIT) && (
          <ProductCardPopup
            send={send}
            context={state.context as ProductCardMachineContext}
            name={name}
            toppings={toppings}
            sizes={sizes}
            type_name={type_name}
          />
        )
      }
    </>
  );
};
