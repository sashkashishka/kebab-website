import * as React from 'react';
import { css } from 'astroturf';

import { Box, Img, Text } from 'Components/atoms';

interface SelectorCardProps {
  imgUrl?: boolean;
  img?: boolean;
  active: boolean;
  name: string;
  price: number;
  weight?: number;
  onSelect: () => void;
  index?: number;
  qty?: number;
}

export const SelectorCard: React.FC<SelectorCardProps> = ({
  img,
  imgUrl,
  active,
  name,
  price,
  weight,
  onSelect,
  index = 0,
  qty = 1,
}) => (
  <Box
    onClick={onSelect}
    // @ts-ignore
    active={active}
    css={css`
      width: 100%;
      height: 100%;
      max-width: 160px;
      max-height: 160px;
      padding: 8px;
      border-radius: 10px;
      background-color: var(--white);
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
      color: var(--black);
      text-align: center;
      border: 1.5px solid transparent;
      cursor: pointer;

      &.active {
        border: 1.5px solid #F9D43F;
      }
    `}
  >
    {
      img && (
        <Box
          css={css`
            width: 80px;
            height: 80px;
            margin: 0 auto;
            background-image: url('Img/img-kebab-size.png');
            background-position: center;
            background-size: ${65 + 65 * ((index) / qty)}%;
            background-repeat: no-repeat;
          `}
        />
      )
    }

    {
      imgUrl && (
        <Img
          src={imgUrl}
          alt={name}
          width="50px"
          height="50px"
        />
      )
    }

    <Box
      css={css`
        margin-bottom: 8px;
      `}
    >
      <Text
        css={css`
          font-weight: bold;
        `}
      >
        {name}
      </Text>

      {
        weight && (
          <Text
            css={css`
              color: #7D7D91;
            `}
          >
            {weight} гр
          </Text>
        )
      }
    </Box>

    <Text
      css={css`
        font-weight: bold;
      `}
    >
      {price} грн
    </Text>
  </Box>
);
