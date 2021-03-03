import * as React from 'react';
import { css } from 'astroturf';
import { ProductItem } from '@kebab/types';

import {
  Box,
  Img,
  Text,
} from 'Components/atoms';

export const ProductCard: React.FC<ProductItem> = ({
  name,
  description,
  price,
  imageUrl,
  sizes,
  additives,
}) => {
  return (
    <Box
      css={css`
        padding: 16px;
        color: var(--black);
        background-color: var(--white);
        border-radius: 10px;
        box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.1);
      `}
    >
      <Img
        src="#"
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
        {' '}
        <Text
          as="span"
          css={css`
            font-weight: 400;
          `}
        >
          (250 g)
        </Text>
      </Text>

      <Text
        css={css`
          margin-bottom: 12px;
        `}
      >
        {description}
      </Text>
      {name}
    </Box>
  );
};
