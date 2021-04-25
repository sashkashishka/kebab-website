/* eslint-disable import/no-default-export */
import * as React from 'react';
import { css } from 'astroturf';

import { ShopContext } from 'Components/provider';
import { Page } from 'Components/page';
import { TitleBlock } from 'Components/blocks';
import { MenuBlock } from 'Components/menu';
import { PromoBanners } from 'Components/promo-banners';
import { Promotion } from 'Components/promotion';
import { Cart } from 'Components/cart';
import { OrderForm } from 'Components/order';
import { SnackbarView } from 'Components/snackbar';
import { Box, Text, Button } from 'Components/atoms';

import { ShopStates, ShopActions } from 'Machines';

import { useScrollTo } from 'Hooks';

import pageMeta from './page-meta.json';

const MainPage: React.FC = () => {
  const [state, send] = React.useContext(ShopContext);
  const [ref, scroll] = useScrollTo();

  return (
    <>
      <TitleBlock
        scroll={scroll}
      />

      <Promotion />

      <PromoBanners />

      <MenuBlock
        ref={ref}
      />

      <Cart />

      <OrderForm />

      {state.matches(ShopStates.ERROR) && (
        <SnackbarView>
          <Box
            css={css`
              display: grid;
              grid-template-columns: 100%;
              grid-gap: 8px;
              text-align: center;

              @media all and (min-width: 768px) {
                & {
                  grid-template-columns: 1fr auto;
                  text-align: start;
                }
              }
            `}
          >
            <Text
              css={css`
                color: var(--black);
              `}
            >
              <Text
                as="span"
                css={css`
                  font-weight: bold;
                `}
              >
                Непередбачена помилка
              </Text>
              <br />
              Перевірте будь-ласка інтернет з'єднання
            </Text>

            <Button
              type="button"
              onClick={() => send({
                type: ShopActions.RETRY,
              })}
            >
              Повторити
            </Button>
          </Box>
        </SnackbarView>
      )}
    </>
  );
};

export default () => (
  <Page
    {...pageMeta}
  >
    <MainPage />
  </Page>
);
