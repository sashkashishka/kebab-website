/* eslint-disable import/no-default-export */
import * as React from 'react';
import { css } from 'astroturf';

import { Page } from 'Components/page';
import {
  Container,
  Link,
  Text,
  Img,
} from 'Components/atoms';

import { Carousel } from 'Components/_carousel';

import notFoundImg from 'Img/404.png';

const images = [
  "https://unsplash.it/476/205",
  'http://placekitten.com/476/205',
  'http://placekitten.com/g/476/205',
];

const NotFound: React.FC = () => (
  <Page
    title="Сторінку не знайдено"
  >
    <Container
      css={css`
        padding-top: 32px;
        padding-bottom: 32px;
      `}
    >
      <Carousel
        images={images}
      />
    </Container>
  </Page>
);

export default NotFound;
