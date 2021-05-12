import * as React from 'react';
import ContentLoader from 'react-content-loader';
import { css } from 'astroturf';

const styles = css`
  .banner-skeleton {
    width: 270px;
    border-radius: 10px;
    box-shadow: 0px 0.9625px 5.83333px rgba(0, 0, 0, 0.13);

    @media all and (min-width: 425px) {
      & {
        width: 370px;
      }
    }

    @media all and (min-width: 768px) {
      & {
        width: 630px;
      }
    }
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
