import styled from 'astroturf';

export const Tab = styled('button')`
  display: inline-block;
  margin: 0 8px 8px 0;
  padding: 14px;
  border: none;
  font-size: 16px;
  color: var(--black);
  border-radius: 10px;
  background-color: var(--2color);
  cursor: pointer;
  outline: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    text-decoration: underline;
  }

  &:active {
    text-decoration: underline;
  }

  &.active {
    background-color: var(--accent);
    color: var(--white);
    font-weight: bold;
  } 
`;
