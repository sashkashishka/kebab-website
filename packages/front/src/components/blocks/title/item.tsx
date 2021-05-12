import * as React from 'react';
import { css } from 'astroturf';

import {
  Box,
  Img,
  Text,
} from 'Components/atoms';

interface CarouselItemProps {
  img: string;
  alt: string;
  price: number;
  name: React.ReactNode;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({
  img,
  alt,
  price,
  name,
}) => (
  <Box
    css={css`
      text-align: center;
    `}
  >
    <Img
      src={img}
      alt={alt}
      css={css`
        width: 100%;
        object-fit: contain;
        max-width: 600px;
        max-height: 500px;
        margin-bottom: 12px;

        @media all and (min-width: 768px) {
          & {
            height: 100%;
          }
        }

        @media all and (min-width: 960px) {
          & {
            height: 100%;
            max-height: 550px;
          }
        }
      `}
      width="300px"
      height="300px"
    />

    <Box
      css={css`
        font-size: 18px;
        line-height: 24px;
        color: #fff;
      `}
    >
      <Text>
        {name}
      </Text>

      <Text
        css={css`
          font-weight: bold;
          color: var(--accent);
      `}
      >
        {price} грн
      </Text>
    </Box>
  </Box>
);
