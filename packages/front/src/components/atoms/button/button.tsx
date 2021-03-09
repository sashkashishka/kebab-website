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

  &:hover {
    background-color: #F70A35;
  }

  &:focus {
    background-color: #F70A35;
  }

  &:active {
    background-color: #F70A35;
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

export const DecButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => (
  <Box
    as="button"
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 0;
      border: 1px solid #C1C1D4;
      border-radius: 50%;
      outline: none;
      transition: color 0.3s, background-color 0.3s;

      &:hover,
      &:active,
      &:focus {
        color: var(--white);
        background-color: #C1C1D4; 
      }
    `}
    {...props}
  >
    <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="12" height="1.5" rx="0.75" fill="currentColor" />
    </svg>
  </Box>
);

export const IncButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => (
  <Box
    as="button"
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 0;
      border: 1px solid #C1C1D4;
      border-radius: 50%;
      outline: none;
      transition: color 0.3s, background-color 0.3s;

      &:hover,
      &:active,
      &:focus {
        color: var(--white);
        background-color: #C1C1D4; 
      }
    `}
    {...props}
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="5.25002" width="12" height="1.5" rx="0.75" fill="currentColor" />
      <rect x="5.25" y="12" width="12" height="1.5" rx="0.75" transform="rotate(-90 5.25 12)" fill="currentColor" />
    </svg>
  </Box>
);
