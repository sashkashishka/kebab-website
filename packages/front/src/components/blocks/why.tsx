import { css } from 'astroturf';
import {
  Box,
  Container,
  H2,
  Text,
  Img,
} from 'Components/atoms';

import imgWhy1 from 'Img/img-why-1.png';
import imgWhy2 from 'Img/img-why-2.png';
import imgWhy3 from 'Img/img-why-3.png';
import imgWhy4 from 'Img/img-why-4.png';

export const WhyBlock = () => (
  <Box
    css={css`
      background-color: var(--black);
    `}
  >
    <Container
      css={css`
        display: grid;
        grid-template-rows: 1fr auto auto;
        grid-template-columns: 100%;
        grid-gap: 18px;
        padding-top: 32px;
        padding-bottom: 32px;

        @media all and (min-width: 960px) {
          & {
            grid-template-rows: auto auto;
            grid-template-columns: 1fr 1fr;
            padding-top: 64px;
            padding-bottom: 64px;
          } 
        }
      `}
    >
      <Box
        css={css`
          @media all and (min-width: 960px) {
            & {
              align-self: end;
            }
          }
        `}
      >
        <H2
          css={css`
            margin-bottom: 24px;
          `}
        >
          Почему Ель Шейх?
        </H2>

        <Text>
          Многолетний опыт был передан в этой
          сочной шаурме. Главное в нашем роле
          это балланс ингридиентов, стерильность,
          и все это приправлено любовью к тому
          что я делаю.
        </Text>
      </Box>

      <Box
        css={css`
          justify-self: center;
          display: grid;
          grid-template-rows: 135px 135px;
          grid-template-columns: 135px 135px;
          grid-gap: 18px;

          @media all and (min-width: 425px) {
            & {
              grid-template-rows: 162px 162px;
              grid-template-columns: 162px 162px;
            }
          }

          @media all and (min-width: 960px) {
            & {
              justify-self: end;
              grid-row: 1/3;
              grid-column: 2/3;
              grid-template-rows: 247px 247px;
              grid-template-columns: 247px 247px;
            }
          }
        `}
      >
        <Img
          src={imgWhy1}
          alt="why 1"
          width="100%"
          height="100%"
        />
        <Img
          src={imgWhy2}
          alt="why 2"
          width="100%"
          height="100%"
        />
        <Img
          src={imgWhy3}
          alt="why 3"
          width="100%"
          height="100%"
        />
        <Img
          src={imgWhy4}
          alt="why 4"
          width="100%"
          height="100%"
        />
      </Box>

      <Box>
        <Text
          // css={css``}
        >
          Нежнейшее мясо, выдержаное
          в фирменном маринаде, идеально прожарено , до хрустящей корочки
          с одной стороны, и тающей
          во рту изнутри. Гармонично сочитаемо
          с секретным изысканым соусом.
          Порадует вас идеальным вкусом.
        </Text>
      </Box>
    </Container>
  </Box>
);
