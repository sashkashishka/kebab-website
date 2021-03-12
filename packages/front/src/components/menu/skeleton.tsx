import * as React from 'react';
import ContentLoader from 'react-content-loader';

export const MenuFiltersSkeleton: React.FC = () => (
  <ContentLoader
    title="Завантаження..."
    height="50px"
    viewBox="0 0 432 50"
  >
    <rect x="0" y="0" rx="10" ry="10" width="140" height="50" />

    <rect x="146" y="0" rx="10" ry="10" width="140" height="50" />

    <rect x="292" y="0" rx="10" ry="10" width="140" height="50" />
  </ContentLoader>
);
