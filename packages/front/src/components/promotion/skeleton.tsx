import * as React from 'react';
import ContentLoader from 'react-content-loader';
import { css } from 'astroturf';

const styles = css`
  .promotion-skeleton {
    max-width: 270px;
    max-height: 145px;
    width: 100%;
  }
`;

export const PromotionSkeleton: React.FC = () => (
  <ContentLoader
    title="Завантаження..."
    viewBox="0 0 270 145"
    className={styles.promotionSkeleton}
  >
    <rect x="0" y="0" rx="10" ry="10" width="270" height="145" />
  </ContentLoader>
);
