import styled from 'astroturf';

export const Textarea = styled('textarea')`
  width: 100%;
  max-height: 250px;
  padding: 12px;
  border-radius: 2px;
  font-size: 16px;
  border: 1px solid #f1f1f9;
  background-color: #f1f1f9;
  color: var(--black);
  outline: none;

  &:focus {
    border-color: var(--black);
  }

  &:disabled {
    opacity: 0.4;
  }

  &.error {
    border-color: var(--accent);
  }
`;
