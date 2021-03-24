import * as React from 'react';
import { css } from 'astroturf';

import { Box } from 'Components/atoms';

export const SnackbarView: React.FC = ({ children }) => (
  <Box
    css={css`
        position: fixed;
        bottom: 16px;
        left: 16px;
        right: 16px;
        padding: 16px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: inset -0.583919px 0.291959px 0.291959px rgba(233, 236, 249, 0.8), inset 0.291959px -0.583919px 0.291959px rgba(248, 248, 255, 0.08);
        backdrop-filter: blur(23.3568px);

        @media all and (min-width: 768px) {
          & {
            right: auto;
            max-width: 500px;
          }
        }
      `}
  >
    {children}
  </Box>
);
