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

import notFoundImg from 'Img/404.png';

const NotFound: React.FC = () => (
  <Page
    title="Сторінку не знайдено"
  >
    <Container
      css={css`
        padding-top: 32px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        align-items: center;
        text-align: center;
        color: var(--black);

        @media all and (min-width: 768px) {
          & {
            text-align: start;
          }
        }
      `}
    >
      <Text>
        Сторінки не доступна, але президент так і запрошує скуштувати смачну шаурму
        {' '}
        <Link
          href="/"
          css={css`
            color: var(--accent);
          `}
        >
          тут
        </Link>
      </Text>
      <Img
        src={notFoundImg}
        alt="not found"
        css={css`
          width: 100%;

        `}
      />
    </Container>
  </Page>
);

export default NotFound;
