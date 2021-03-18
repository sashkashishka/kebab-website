import * as React from 'react';
import styled, { css } from 'astroturf';

import { Box } from 'Components/atoms';
import { PointUp } from 'Components/emoji';

const Component = styled('span')`
  &.variant-black {
    color: var(--black);
  }  

  &.variant-white {
    color: var(--white);
  }  
`;

export const FreeFrom: React.FC<{ variant?: 'black' | 'white'; }> = ({ variant = 'black' }) => (
  <Component
    className="free-from"
    // @ts-ignore
    variant={variant}
  >
    <PointUp />
    <Box as="b" css={css`font-weight: 700;`}>Від 250</Box> гривень — безкоштовна доставка
  </Component>
);
