import * as React from 'react';
import { css } from 'astroturf';
import Helmet from 'react-helmet';

import { ShopProvider } from 'Components/provider';
import { Box } from 'Components/atoms';
import { Header } from 'Components/header';
import { Footer } from 'Components/footer';

import '@reach/dialog/styles.css';
import 'Styles/global.module.css';
import 'Styles/gilroy-font.module.css';

export const Page: React.FC<{ title: string; }> = ({
  title,
  children,
}) => (
  <ShopProvider>
    <Helmet>
      <html lang="ru" />
      <title>
        {title}
      </title>
    </Helmet>

    <Box
      css={css`
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 100%;
        min-height: 100%;
      `}
    >
      <Header />

      <Box
        as="main"
      >
        {children}
      </Box>

      <Footer />
    </Box>

  </ShopProvider>
);
