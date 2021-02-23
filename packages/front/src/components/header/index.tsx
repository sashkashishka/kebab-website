import * as React from 'react';
import { useParams } from '@reach/router';
import {
  Box,
  Image,
} from 'rebass';

import Link from 'Components/link';
import Container from 'Components/container';

import logo from 'Img/logo.png';

interface HeaderProps {
  auth: boolean;
}

const Header: React.FC<HeaderProps> = ({ auth }) => {
  const { userSlug } = useParams() || {};

  return (
    <Box
      as="header"
      bg="primary"
      sx={{
        boxShadow: 'small',
      }}
    >
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100px"
      >
        <Link
          href="/"
          variant="footerLink"
        >
          <Image
            src={logo}
            alt="logo teme"
            display="block"
            height="80px"
          />
        </Link>


        {
          auth && (
            <React.Fragment>
              <Link
                href={`/profile/${userSlug}`}
                variant="footerLink"
                ml="auto"
                mr={2}
              >
                Розклад
              </Link>
              <Link
                external
                href="/api/logout"
                variant="footerLink"
              >
                Вийти
              </Link>
            </React.Fragment>
          )
        }
      </Container>
    </Box>
  );
};

export default Header;
