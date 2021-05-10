import * as React from 'react';
import { css } from 'astroturf';

import { Box, Text } from 'Components/atoms';
import { SuccessPopup as Popup } from 'Components/popup';
import { Socials } from 'Components/socials';

import { ShopActions } from 'Machines';

interface SuccessPopupProps {
  shopSend: (...args: any[]) => any;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({
  shopSend,
}) => (
  <Popup
    isOpen
    onDismiss={() => shopSend({ type: ShopActions.CLOSE_SUCCESS })}
    ariaLabel="success"
  >
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 24px 24px 16px 24px;
        text-align: center;
        color: #7D7D91;
      `}
    >
      <Text
        css={css`
            margin-bottom: 16px;
            font-size: 24px;
            line-height: 29px;
            font-weight: bold;
            color: var(--black);
          `}
      >
        Замовлення готують,
        <br />
        смачного
      </Text>

      <Text
        css={css`
            color: #4A4647;
            margin-bottom: 32px;
          `}
      >
        Скоро з вами зв'яжуться
      </Text>

      <Socials />
    </Box>
  </Popup>
);
