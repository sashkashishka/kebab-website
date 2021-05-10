import * as React from 'react';
import styled, { css } from 'astroturf';

import { Box } from '../box';

export const Button = styled('button')`
  border: 0;
  background-color: var(--accent);
  color: var(--white);
  border-radius: 8px;
  padding: 12px 14px;
  text-transform: uppercase;
  font-family: inherit;
  text-align: center;
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.37px;
  outline: none;
  cursor: pointer;

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
    type="button"
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border: 0;
      background-color: #DADAE8;
      border-radius: 50%;
      padding: 8px;
      outline: none;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover,
      &:active,
      &:focus {
        background-color: #C1C1D4; 
      }
    `}
    {...props}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Box>
);

export const RemoveButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => (
  <Box
    as="button"
    css={css`
      width: 38px;
      height: 38px;
      border: 0;
      background-color: #DADAE8;
      border-radius: 50%;
      padding: 8px;
      outline: none;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover,
      &:active,
      &:focus {
        background-color: #C1C1D4; 
      }
    `}
    {...props}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 5H4.16667H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.66663 5.00008V3.33341C6.66663 2.89139 6.84222 2.46746 7.15478 2.1549C7.46734 1.84234 7.89127 1.66675 8.33329 1.66675H11.6666C12.1087 1.66675 12.5326 1.84234 12.8451 2.1549C13.1577 2.46746 13.3333 2.89139 13.3333 3.33341V5.00008M15.8333 5.00008V16.6667C15.8333 17.1088 15.6577 17.5327 15.3451 17.8453C15.0326 18.1578 14.6087 18.3334 14.1666 18.3334H5.83329C5.39127 18.3334 4.96734 18.1578 4.65478 17.8453C4.34222 17.5327 4.16663 17.1088 4.16663 16.6667V5.00008H15.8333Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
      border: 1px solid transparent;
      background-color: transparent;
      border-radius: 50%;
      color: var(--dark);
      outline: none;
      transition: color 0.3s, border-color 0.3s;
      cursor: pointer;

      &:hover,
      &:active,
      &:focus {
        color: var(--accent); 
        border-color: var(--accent);
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
      border: 1px solid transparent;
      background-color: transparent;
      border-radius: 50%;
      color: var(--dark);
      outline: none;
      transition: color 0.3s, border-color 0.3s;
      cursor: pointer;

      &:hover,
      &:active,
      &:focus {
        color: var(--accent); 
        border-color: var(--accent);
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

export const BackButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => (
  <Box
    as="button"
    css={css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 0;
      background-color: #DADAE8;
      border-radius: 50%;
      color: var(--white);
      outline: none;
      transition: color 0.3s, background-color 0.3s;
      cursor: pointer;

      &:hover,
      &:active,
      &:focus {
        background-color: #C1C1D4; 
      }
    `}
    {...props}
  >
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.125 11H4.875" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 17.125L4.875 11L11 4.875" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Box>
);

export const NextButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => (
  <Box
    as="button"
    css={css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 0;
      background-color: #DADAE8;
      border-radius: 50%;
      color: var(--white);
      outline: none;
      transition: color 0.3s, background-color 0.3s;
      cursor: pointer;

      &:hover,
      &:active,
      &:focus {
        background-color: #C1C1D4; 
      }
    `}
    {...props}
  >
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.875 11H17.125" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 17.125L17.125 11L11 4.875" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Box>
);
