import * as React from 'react';

import { Page } from 'Components/page';
import { TitleBlock, WhyBlock } from 'Components/blocks';
import { Menu } from 'Components/menu';
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
      <TitleBlock />

      <WhyBlock />

      <Menu />
    </Page>
  );
};

export default MainPage;
