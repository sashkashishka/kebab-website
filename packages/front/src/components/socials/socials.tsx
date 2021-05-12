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
import tiktokWhiteLogo from 'Img/tiktok-white-logo.png';
import instagramWhiteLogo from 'Img/instagram-white-logo.png';
import telegramWhiteLogo from 'Img/telegram-white-logo.png';

interface SocialsProps {
  theme?: 'white' | 'black';
}

export const Socials: React.FC<SocialsProps> = ({ theme = 'black' }) => {
  const {
    tiktok,
    telegram,
    instagram,
  } = useSiteMetadata();

  const isBlack = theme === 'black';

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
            src={isBlack ? tiktokLogo : tiktokWhiteLogo}
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
            src={isBlack ? instagramLogo : instagramWhiteLogo}
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
            src={isBlack ? telegramLogo : telegramWhiteLogo}
            alt="telegram"
            width="58px"
            height="58px"
          />
        </Link>
      </Box>

      <Text>
        Підпишись у соцмережах та отримай знижку -10%
      </Text>
    </>
  );
};
