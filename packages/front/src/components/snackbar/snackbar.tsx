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
        background-color: #DADAE8;
        filter: drop-shadow(0px 10px 40px rgba(0, 0, 0, 0.1));
        border-radius: 2px;

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
