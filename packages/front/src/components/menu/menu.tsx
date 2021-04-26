import * as React from 'react';
import { css } from 'astroturf';

import {
  Box,
  Container,
  Text,
} from 'Components/atoms';
import { PointUp } from 'Components/emoji';

import { Filter } from './filter';
import { MenuList } from './list';

export const MenuBlock = React.forwardRef((props, ref) => (
  <Container
    ref={ref}
    css={css`
      padding-top: 40px;
      padding-bottom: 40px;

      @media all and (min-width: 768px) {
        & {
          padding-top: 80px;
          padding-bottom: 80px;
        }
      }
    `}
  >
    <Box
      css={css`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;

        @media all and (min-width: 768px) {
          & {
            justify-content: space-between;
          }
        }
      `}
    >
      <Box
        css={css`
          text-align: center;

          @media all and (min-width: 768px) {
            & {
              text-align: start;
            }
          }
        `}
      >
        <Text
          css={css`
            margin-bottom: 8px;
            color: var(--black);
            font-size: 32px;
            line-height: 35px;
            font-weight: 800;
          `}
        >
          Шаурма Житомир
        </Text>
        <Text
          css={css`
            color: var(--accent);
            margin-bottom: 24px;

            @media all and (min-width: 768px) {
              & {
                margin-bottom: 0;
              }
            }
          `}
        >
          <PointUp
            style={{
              fontSize: '18px',
            }}
          />
          {' '}
          від 250 грн безкоштовна доставка
          {' '}
          <PointUp
            style={{
              fontSize: '18px',
            }}
          />
        </Text>
      </Box>

      <Filter />
    </Box>

    <MenuList />
  </Container>
));
