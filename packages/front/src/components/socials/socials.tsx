import * as React from 'react';
import { css } from 'astroturf';

import {
  Box,
  Link,
  Text,
  Img,
} from 'Components/atoms';

import { useSiteMetadata } from 'Hooks';

import tiktokLogo from 'Img/tiktok-logo.svg';
import instagramLogo from 'Img/instagram-logo.svg';
import telegramLogo from 'Img/telegram-logo.svg';

export const Socials: React.FC = () => {
  const {
    tiktok,
    telegram,
    instagram,
  } = useSiteMetadata();

  return (
    <>
      <Box
        css={css`
          display: inline-grid;
          grid-template-columns: repeat(3, 58px);
          grid-gap: 36px;
          margin-bottom: 12px;
        `}
      >
        <Link
          external
          href={tiktok}
        >
          <Img
            src={tiktokLogo}
            alt="tiktok"
            width="58px"
            height="58px"
          />
        </Link>

        <Link
          external
          href={instagram}
        >
          <Img
            src={instagramLogo}
            alt="instagram"
            width="58px"
            height="58px"
          />
        </Link>

        <Link
          external
          href={telegram}
        >
          <Img
            src={telegramLogo}
            alt="telegram"
            width="58px"
            height="58px"
          />
        </Link>
      </Box>

      <Text>
        Подпишись в соцсетях и получи скидку -10%
      </Text>
    </>
  );
};
