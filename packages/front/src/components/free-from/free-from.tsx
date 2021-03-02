import * as React from 'react';
import { css } from 'astroturf';

import { Text, Box } from 'Components/atoms';

export const FreeFrom: React.FC<{ variant: 'black' | 'white'; }> = ({ variant = 'black' }) => (
  <Text
    css={css`
      color: var(--${variant});
    `}
  >
    <Box
      as="span"
      aria-label="emoji"
      role="img"
      css={css`
        font-size: 30px;
      `}
    >
      ☝️
    </Box>
    <b>От 250</b> гривен — бесплатная доставка
  </Text>
);
