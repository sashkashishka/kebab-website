import styled from 'astroturf';

export const Input = styled('input')`
  padding: 12px;
  border-radius: 2px;
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

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  &[type=number] {
      -moz-appearance:textfield; /* Firefox */
  }
`;
