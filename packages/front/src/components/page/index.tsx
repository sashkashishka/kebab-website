import * as React from 'react';
import { css } from 'astroturf';
import Helmet from 'react-helmet';

import { Box } from 'Components/atoms';
import { Header } from 'Components/header';
import { Footer } from 'Components/footer';

import 'Styles/global.module.css';

export const Page: React.FC<{ title: string; }> = ({
  title,
  children,
}) => (
  <React.Fragment>
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

  </React.Fragment>
);
