import * as React from 'react';
import styled from 'astroturf';

import { useApi } from 'Hooks/useApi';
import { Api } from 'Constants/api';

import { Page } from 'Components/page';
// import Container from 'Components/container';
// import Link from 'Components/link';
// import AdRow, { AdItem } from 'Components/adrow';
// import AuthForm from 'Components/auth';


import pageMeta from './page-meta.json';


const MainPage: React.FC = () => {
  // const { data } = useApi<SessionResponse>(Api.SESSION);

  return (
    <Page
      {...pageMeta}
    >
      test
    </Page>
  );
}

export default MainPage;
