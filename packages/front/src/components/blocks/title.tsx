import { css } from 'astroturf';
import {
  Box,
  Container,
  H1,
  Text,
  Img,
} from 'Components/atoms';
import { FreeFrom } from 'Components/free-from';

import imgKebab from 'Img/img-kebab.png';

export const TitleBlock = () => (
  <Box
    css={css`
      background-color: var(--black);
      background-image: url('Img/bg-wave.svg');
      background-position: center bottom;
      background-repeat: no-repeat;

      @media all and (min-width: 768px) {
        & {
          background-size: contain;
        } 
      }

      @media all and (min-width: 2560px) {
        & {
          background-position: 80% 250px;
        } 
      }
    `}
  >
    <Container
      css={css`
        padding-top: 32px;
        padding-bottom: 32px;
        background-image: url('Img/bg-title-mobile.svg');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;

        @media all and (min-width: 768px) {
          & {
            background-image: url('Img/bg-title-desktop.svg');
          } 
        }
      `}
    >
      <Box
        css={css`
          display: grid;
          grid-template-rows: 1fr auto auto;
          grid-template-columns: 100%;
          grid-gap: 18px;
          text-align: center;

          @media all and (min-width: 768px) {
            & {
              grid-template-rows: auto 1fr;
              grid-template-columns: 50% 50%;
              text-align: start;
            } 
          }
        `}
      >
        <Box>
          <H1
            css={css`
              margin-bottom: 18px;
            `}
          >
            Идеальная шаурма
          </H1>

          <Text
            css={css`
              margin-bottom: 18px;
            `}
          >
            C доставкой по городу Житомир
          </Text>

          <Text
            css={css`
              color: var(--accent);
            `}
          >
            c 9:00 до 21:00
          </Text>
        </Box>

        <Box
          css={css`
            @media all and (min-width: 768px) {
              & {
                grid-row: 1/3;
                grid-column: 2/3;
                justify-self: center;
              } 
            }
          `}
        >
          <Img
            src={imgKebab}
            alt="kebab"
            css={css`
              width: 100%;
              height: 100%;
              object-fit: contain;
              max-width: 500px;
              max-height: 500px;
            `}
            width="300px"
            height="300px"
          />
        </Box>

        <Text
          css={css`
            color: var(--black);

            @media all and (min-width: 768px) {
              & {
                color: var(--white);
              } 
            }
          `}
        >
          <Text
            as="b"
            css={css`
              font-weight: 700;
            `}
          >
            Чапаева 10Б (МОД/ЖТК)
          </Text>

          <br />
          <br />

          <FreeFrom
            variant="white"
          />
        </Text>
      </Box>
    </Container>
  </Box>
);
