import * as React from 'react';

import { Page } from 'Components/page';
import { TitleBlock, WhyBlock } from 'Components/blocks';
import { MenuBlock } from 'Components/menu';
import { Cart } from 'Components/cart';
import { OrderForm } from 'Components/order';

import pageMeta from './page-meta.json';

const MainPage: React.FC = () => (
  <Page
    {...pageMeta}
  >
    <TitleBlock />

    <WhyBlock />

    <MenuBlock />

    <Cart />

    <OrderForm />
  </Page>
);

export default MainPage;
