import * as React from 'react';
import { css } from 'astroturf';

import {
  Box,
  Container,
  Link,
  Img,
  Text,
} from 'Components/atoms';
import { RoundPushpin } from 'Components/emoji';

import { useSiteMetadata } from 'Hooks';

import logoExtended from 'Img/logo-extended.svg';

export const Header: React.FC = () => {
  const { phone, address } = useSiteMetadata();

  return (
    <Box
      as="header"
      css={css`
        background-color: var(--black);
      `}
    >
      <Container
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 32px; 
          padding-bottom: 32px; 

          @media all and (min-width: 768px) {
            & {
              padding-top: 64px; 
              padding-bottom: 64px; 
            }
          }
        `}
      >
        <Img
          src={logoExtended}
          alt="logo extended"
          height="32px"
          width="125px"
          css={css`
            flex-shrink: 0;
          `}
        />

        <Box>
          <Link
            external
            // TODO link to google maps
            href="#"
            css={css`
              display: none;
              font-weight: 700;

              @media all and (min-width: 768px) {
                & {
                  display: inline-block;
                  margin-right: 24px;
                }
              }
            `}
          >
            <RoundPushpin /> {address}
          </Link>
          <Text
            css={css`
              display: none;
              font-family: var(--proximaFont);
              color: var(--accent);

              @media all and (min-width: 768px) {
                & {
                  display: inline-block;
                  margin-right: 32px;
                }
              }
            `}
          >
            щодня з 9:00 до 21:00
          </Text>

          <Link
            external
            href={`tel:${phone}`}
            css={css`
              font-weight: 700;
            `}
          >
            {phone}
          </Link>
        </Box>

      </Container>
    </Box>
  );
};
