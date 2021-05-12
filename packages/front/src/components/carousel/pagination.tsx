import * as React from 'react';
import { css } from 'astroturf';

import { Box } from 'Components/atoms';

interface SliderPaginationProps {
  length: number;
  active: number;
}

export const SliderPagination: React.FC<SliderPaginationProps> = ({ length, active }) => (
  <Box>
    {
      Array.from({ length }, (_v, i) => (
        <Box
          key={i}
          css={css`
            display: inline-block;
            width: 6px;
            height: 6px;
            background-color: ${active === i ? '#FF0633' : '#DADAE8'};
            border-radius: 50%;
            margin-right: 5px;

            &:last-of-type {
              margin-right: 0;
            }
          `}
        />
      ))
    }
  </Box>
);
