import * as React from 'react';
import { css } from 'astroturf';

import { Box } from 'Components/atoms';

interface FieldErrorProps {
  error: string | undefined;
}

export const FieldError: React.FC<FieldErrorProps> = ({ error, ...rest }) => {
  if (!error) return null;

  return (
    <Box
      as="span"
      css={css`
        display: block;
        margin-top: 4px;
        font-size: 12px;
        color: var(--accent);
      `}
      {...rest}
    >
      {error}
    </Box>
  );
};
