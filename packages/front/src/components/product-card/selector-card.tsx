import * as React from 'react';
import { css } from 'astroturf';

import { Box, Img, Text } from 'Components/atoms';

interface SelectorCardProps {
  active: boolean;
  name: string;
  price: number;
  weight?: number;
  onSelect: () => void;
}

export const SelectorCard: React.FC<SelectorCardProps> = ({
  active,
  name,
  price,
  weight,
  onSelect,
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

      &.active {
        border: 1.5px solid #F9D43F;
      }
    `}
  >
    <Img
      src="#"
      alt="size img"
      width="50px"
      height="50px"
    />

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
          <Text>
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
