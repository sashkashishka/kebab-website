import React from 'react';
import {
  Box,
  Heading,
  Image,
} from 'rebass';

import { useApi } from 'Hooks/useApi';
import { Api } from 'Constants/api';
import { SessionResponse } from 'Types/api';

import Page from 'Components/page';
import Container from 'Components/container';
import Link from 'Components/link';
import AdRow, { AdItem } from 'Components/adrow';
import AuthForm from 'Components/auth';


import rain from 'Img/rain.jpg';

import pageMeta from './page-meta.json';


const MainPage: React.FC = () => {
  const { data } = useApi<SessionResponse>(Api.SESSION);

  return (
    <Page
      {...pageMeta}
    >
      <Container
        py={4}
      >
        <Heading
          as="h1"
          variant="h1"
          textAlign="center"
        >
          Teach Me онлайн-уроки
        </Heading>

        <AdRow
          alignItems="center"
        >
          <AdItem>
            <Image
              src={rain}
              alt="dog Rain"
              display={{
                _: 'none',
                md: 'block',
              }}
              width="100%"
              maxWidth="500px"
              mx="auto"
              sx={{
                borderRadius: 'medium',
                boxShadow: 'medium',
              }}
            />
          </AdItem>
          <AdItem>
            {
              data?.status === 1
                ? (
                  <Box
                    textAlign="center"
                  >
                    Ви вже авторизовані.
                    <br />
                    Перейдіть на <Link href={`/profile/${data?.username}`}>сторінку профілю</Link>
                  </Box>
                )
                : (
                  <AuthForm />
                )
            }
          </AdItem>
        </AdRow>

      </Container>
    </Page>
  );
}

export default MainPage;
