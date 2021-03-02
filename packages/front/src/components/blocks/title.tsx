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
    `}
  >
    <Container
      css={css`
        padding-top: 32px;
        padding-bottom: 32px;
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
            width="300px"
            height="300px"
          />
        </Box>

        <Box>
          <Text
            // css={css``}
          >
            Чапаева 10Б (МОД/ЖТК)
          </Text>

          <br />
          
          <FreeFrom
            variant="white"
          />
        </Box>
      </Box>
    </Container>
  </Box>
);
