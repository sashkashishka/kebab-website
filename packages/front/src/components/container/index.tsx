import * as React from 'react';
import { Box, BoxProps } from 'rebass';

const Container: React.FC<BoxProps> = props => (
  <Box
    maxWidth="1110px"
    mx="auto"
    px={3}
    {...props}
  />
);

export default Container;
