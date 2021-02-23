import * as React from 'react';
import {
  Box,
  Text,
  Image,
} from 'rebass';

import Container from 'Components/container';
import Link from 'Components/link';

import lightbulb from 'Img/lightbulb.svg';

const Footer: React.FC = () => (
  <Box
    as="footer"
    bg="basic.5"
  >
    <Container
      py={4}
    >
      <Box
        textAlign="center"
        mb={3}
      >
        <Link
          href="https://teme.com.ua"
          external
          title="Перейти до офіційного сайту студії Teach Me"
          variant="footerLink"
          color="basic.0"
        >
          <Image
            src={lightbulb}
            alt="teme logo"
            display="block"
            height="50px"
            width="50px"
          />
        </Link>
      </Box>

      <Text
        fontSize={0}
        lineHeight="caption"
        textAlign="center"
        color="basic.0"
        sx={{
          '& span': {
            color: 'primary',
          },
        }}
      >
        © 2020 TeMe | <span>Te</span>ach <span>Me</span>
      </Text>
    </Container>
  </Box>
);

export default Footer;
