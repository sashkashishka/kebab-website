import * as React from 'react';

export const JSONLD: React.FC<{ data: any }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
