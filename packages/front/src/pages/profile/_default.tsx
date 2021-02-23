import * as React from 'react';
import { RouteComponentProps } from '@reach/router';

import Page from 'Components/page';
import Container from 'Components/container';
import Link from 'Components/link';

const ProfileDefault: React.FC<RouteComponentProps> = () => (
  <Page
    title="Teach Me - Перейти до авторизації"
  >
    <Container
      textAlign="center"
    >
      <Link
        href="/"
      >
        Перейти до авторизації
      </Link>
    </Container>
  </Page>
);

export default ProfileDefault;
