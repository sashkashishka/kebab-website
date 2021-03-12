import * as React from 'react';
import { css } from 'astroturf';
import ContentLoader from 'react-content-loader';

import { Box } from 'Components/atoms';

export const ProductCardSkeleton = () => (
  <Box
    css={css`
      padding: 16px;
      color: var(--black);
      background-color: var(--white);
      border-radius: 10px;
      box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.1);
    `}
  >
    <ContentLoader
      title="Завантаження..."
      width="100%"
      viewBox="0 0 380 350"
    >
      <rect x="0" y="0" rx="10" ry="10" width="380" height="150" />

      <rect x="0" y="166" rx="4" ry="4" width="300" height="20" />

      <rect x="0" y="202" rx="3" ry="3" width="280" height="10" />
      <rect x="0" y="220" rx="3" ry="3" width="250" height="10" />

      <rect x="0" y="246" rx="2" ry="2" width="380" height="40" />

      <rect x="0" y="298" rx="8" ry="8" width="380" height="48" />
    </ContentLoader>
  </Box>
);
