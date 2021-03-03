import * as React from 'react';
import { css } from 'astroturf';

import { Text, Box } from 'Components/atoms';
import { PointUp } from 'Components/emoji';

export const FreeFrom: React.FC<{ variant: 'black' | 'white'; }> = ({ variant = 'black' }) => (
  <Text
    as="span"
    className="free-from"
    css={css`
      color: ${`--${variant}`};
    `}
  >
    <PointUp />
    <Box as="b" css={css`font-weight: 700;`}>От 250</Box> гривен — бесплатная доставка
  </Text>
);
