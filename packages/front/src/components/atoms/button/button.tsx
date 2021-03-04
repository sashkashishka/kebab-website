import * as React from 'react';
import styled, { css } from 'astroturf';

import { Box } from '../box';

export const Button = styled('button')`
  border: 0;
  background-color: var(--accent);
  color: var(--white);
  border-radius: 8px;
  padding: 12px 14px;
  text-align: center;
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.37px;
  outline: none;

  &:disabled {
    opacity: 0.23;
    pointer-events: none;
  }
`;

export const CloseButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => (
  <Box
    as="button"
    css={css`
      width: 38px;
      height: 38px;
      border: 0;
      background-color: var(--2color);
      border-radius: 50%;
      padding: 8px;
      outline: none;
    `}
    {...props}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Box>
);
