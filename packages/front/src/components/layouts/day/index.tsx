import * as React from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { Box, Heading } from 'rebass';

import { useApi } from 'Hooks/useApi';
import { Api } from 'Constants/api';
import { SessionResponse } from 'Types/api';

import Page from 'Components/page';
import Container from 'Components/container';
// import Link from 'Components/link';


const DayPage: React.FC<RouteComponentProps<{ userSlug: string; daySlug: string }>> = ({
  daySlug,
}) => {
  const { data, isLoading } = useApi<SessionResponse>(Api.SESSION);

  if (isLoading) return null;

  if (data?.status === 0) {
    return (
      <Redirect
        noThrow
        to="/"
      />
    );
  }

  return (
    <Page
      title="Teach me - Вправи на день"
      auth
    >
      <Box>
        <Container
          textAlign="center"
          py={{
            _: 4,
            md: 5,
          }}
        >
          <Heading
            as="h1"
            variant="h1"
          >
            day
            Потренуємося!
          </Heading>
        </Container>
      </Box>
    </Page>
  );
};

export default DayPage;
