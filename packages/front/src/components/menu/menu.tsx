import { css } from 'astroturf';

import {
  Box,
  Container,
  Text,
} from 'Components/atoms';
import { PointUp } from 'Components/emoji';

import { MenuList } from './list';

export const MenuBlock = () => (
  <Container
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
        display: grid;
        grid-gap: 16px;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        align-items: center;
        margin-bottom: 16px;
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
          Меню
        </Text>
        <Text
          css={css`
            color: var(--accent);
          `}
        >
          доставка с 11 до 20 вечера
        </Text>
      </Box>

      <Box
        css={css`
          justify-self: end;
          display: flex;
          flex-wrap: no-wrap;
          align-items: center;
          padding: 20px;
          max-width: 446px;
          color: var(--black);
          background-color: var(--white);
          border-radius: 10px;
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.22);
        `}
      >
        <PointUp
          style={{
            flexShrink: 0,
            marginRight: '12px',
          }}
        />
        Наличие позиций уточняйте по номеру сообщайте если нужно убрать ингридиент
      </Box>
    </Box>

    <MenuList />
  </Container>
);
