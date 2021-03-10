import * as React from 'react';
import { css } from 'astroturf';

import { Box } from '../box';

export const Asterisk: React.FC = (props) => (
  <Box
    as="span"
    css={css`
      color: var(--accent);
    `}
    {...props}
  >
    *
  </Box>
);
