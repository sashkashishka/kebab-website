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
  const {
    phone,
    address,
    addressLink,
  } = useSiteMetadata();

  return (
    <Box
      as="header"
      css={css`
        background-color: #fff;
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
              padding-top: 54px; 
              padding-bottom: 54px; 
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
            href={addressLink}
            target="_blank"
            css={css`
              display: none;
              font-weight: 700;
              color: var(--black);

              @media all and (min-width: 768px) {
                & {
                  display: inline-block;
                  margin-right: 16px;
                }
              }
            `}
          >
            <RoundPushpin /> {address}
          </Link>
          <Text
            css={css`
              display: none;
              color: var(--accent);
              font-weight: 900;

              @media all and (min-width: 768px) {
                & {
                  display: inline-block;
                  margin-right: 16px;
                }
              }
            `}
          >
            пн / пт 10-20 сб 10-19 нд 11-18
          </Text>

          <Link
            external
            href={`tel:${phone}`}
            css={css`
              font-weight: 700;
              color: var(--black);
            `}
          >
            {phone}
          </Link>
        </Box>

      </Container>
    </Box>
  );
};
