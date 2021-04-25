import * as React from 'react';
import ContentLoader from 'react-content-loader';
import { css } from 'astroturf';

const styles = css`
  .banner-skeleton {
    max-width: 630px;
    max-height: 400px;
    width: 100%;
  }
`;

export const BannerSkeleton: React.FC = () => (
  <ContentLoader
    title="Завантаження..."
    viewBox="0 0 630 400"
    className={styles.bannerSkeleton}
  >
    <rect x="0" y="0" rx="10" ry="10" width="630" height="400" />
  </ContentLoader>
);
