import * as React from 'react';

export const RoundPushpin: React.FC<{ style?: { [style: string]: string | number }; }> = ({ style, ...rest }) => (
  <span
    aria-label="emoji"
    role="img"
    style={{
      ...style,
    }}
    {...rest}
  >
    📍
  </span>
);
