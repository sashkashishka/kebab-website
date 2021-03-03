import * as React from 'react';

export const PointUp: React.FC<{ style?: { [key: string]: string | number }; }> = ({ style, ...rest }) => (
  <span
    aria-label="emoji"
    role="img"
    style={{
      fontSize: '30px',
      ...style,
    }}
    {...rest}
  >
    ☝️
  </span>
);
