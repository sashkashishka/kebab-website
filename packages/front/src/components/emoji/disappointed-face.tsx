import * as React from 'react';

export const DisappointedFaceEmoji: React.FC<{ style?: { [style: string]: string | number }; }> = ({ style, ...rest }) => (
  <span
    aria-label="emoji"
    role="img"
    style={{
      ...style,
    }}
    {...rest}
  >
    😞
  </span>
);