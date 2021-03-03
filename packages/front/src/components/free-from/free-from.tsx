import * as React from 'react';
import { css } from 'astroturf';

import { Text, Box } from 'Components/atoms';

export const FreeFrom: React.FC<{ variant: 'black' | 'white'; }> = ({ variant = 'black' }) => (
  <Text
    className="free-from"
    css={css`
      color: ${`--${variant}`};
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
    <Box as="b" css={css`font-weight: 700;`}>От 250</Box> гривен — бесплатная доставка
  </Text>
);
