import * as React from 'react';
import { css } from 'astroturf';
import Helmet from 'react-helmet';

import { ShopProvider } from 'Components/provider';
import { Box } from 'Components/atoms';
import { Header } from 'Components/header';
import { Footer } from 'Components/footer';
import { JSONLD } from 'Components/jsonld';

import { useSiteMetadata } from 'Hooks';

import 'react-datepicker/dist/react-datepicker.css';
import '@reach/dialog/styles.css';
import 'swiper/swiper.min.css';
import 'Styles/global.module.css';
import 'Styles/gilroy-font.module.css';

import { jsonld } from '../../../seo';

export const Page: React.FC<{ title: string; }> = ({
  title,
  children,
}) => {
  const {
    description,
    siteUrl,
  } = useSiteMetadata();

  return (
    <ShopProvider>
      <Helmet>
        <html lang="ru" />
        <title>
          {title}
        </title>
        <meta
          name="description"
          content={description}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/logo.png`} />
      </Helmet>

      <JSONLD
        data={jsonld}
      />

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
};
