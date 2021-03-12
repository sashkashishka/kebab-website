import * as React from 'react';
import { css } from 'astroturf';

import {
  Box,
  Text,
  Link,
  Img,
} from 'Components/atoms';
import { Popup } from 'Components/popup';

import { useSiteMetadata } from 'Hooks';
import { ShopActions } from 'Machines';

import tiktokLogo from 'Img/tiktok-logo.svg';
import instagramLogo from 'Img/instagram-logo.svg';
import telegramLogo from 'Img/telegram-logo.svg';

interface SuccessPopupProps {
  shopSend: (...args: any[]) => any;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({
  shopSend,
}) => {
  const {
    tiktok,
    telegram,
    instagram,
  } = useSiteMetadata();

  return (
    <Popup
      isOpen
      onDismiss={() => shopSend({ type: ShopActions.CLOSE_SUCCESS })}
      ariaLabel="success"
      product
    >
      <Box
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 16px;
          text-align: center;
        `}
      >
        <Text
          css={css`
            margin-bottom: 16px;
            font-size: 24px;
            font-weight: bold;
            color: var(--black);
          `}
        >
          Заказ готовят
          <br />
          приятного апетита
        </Text>

        <Text
          css={css`
            color: #4A4647;
            margin-bottom: 32px;
          `}
        >
          Скоро с вами свяжуться
        </Text>

        <Box
          css={css`
            display: grid;
            grid-template-columns: repeat(3, 58px);
            grid-gap: 36px;
            justify-content: center;
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

        <Text
          css={css`
            color: #7D7D91;
          `}
        >
          Подпишись в соцсетях и получи скидку -10%
        </Text>
      </Box>
    </Popup>
  );
};
