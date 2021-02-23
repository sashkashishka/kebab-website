import React from 'react';
import { Heading } from 'rebass';

import Page from 'Components/page';
import Container from 'Components/container';

const NotFoundPage: React.FC = () => (
  <Page>
    <Container>
      <Heading
        as="h1"
        variant="h1"
        textAlign="center"
      >
        Page not found
      </Heading>
    </Container>
  </Page>
);

export default NotFoundPage;
