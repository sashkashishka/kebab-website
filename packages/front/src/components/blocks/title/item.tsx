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
        color: #fff;

        @media all and (min-width: 768px) {
          & {
            display: inline-flex;
            padding: 16px;
            font-size: 22px;
            line-height: 135%;
            color: var(--black);
            background-color: var(--white);
            border-radius: 10px;
          }
        }
      `}
    >
      <Text
        css={css`
          @media all and (min-width: 768px) {
            & {
              padding-right: 16px;
              border-right: 1px dashed #C1C1D4; 
            }
          }
        `}
      >
        {name}
      </Text>

      <Text
        css={css`
          font-weight: bold;

          @media all and (min-width: 768px) {
            & {
              padding-left: 16px;
              color: var(--accent);
            }
          }
      `}
      >
        {price} грн
      </Text>
    </Box>
  </Box>
);
