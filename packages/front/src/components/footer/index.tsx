import { css } from 'astroturf';

import {
  Box,
  Container,
  Link,
  Text,
  H2,
  H3,
} from 'Components/atoms';
import { FreeFrom } from 'Components/free-from';

export const Footer: React.FC = () => (
  <Box
    as="footer"
    css={css`
      background-image: url('Img/bg-footer.svg');
      background-position: center;
      background-size: cover; 
      padding-top: 32px;
      padding-bottom: 32px;

      @media all and (min-width: 768px) {
        & {
          min-height: 900px;
          padding-top: 64px;
          padding-bottom: 64px;
        }
      }
    `}
  >
    <Container
      css={css`
        display: grid;
        grid-template-rows: auto auto 300px auto;
        grid-template-columns: 100%;
        grid-row-gap: 24px;
        min-height: 100%;

        @media all and (min-width: 768px) {
          & {
            grid-template-rows: 1fr auto 0.7fr;
            grid-template-columns: auto 1fr auto;
          }
        }
      `}
    >
      <Box
        css={css`
          @media all and (min-width: 768px) {
            & {
              grid-column: 1 / 2;
              align-self: end;
            }
          }
        `}
      >
        <H2
          css={css`
            padding-bottom: 24px;
          `}
        >
          Доставка на дом
          <br />
          Также Предзаказ
        </H2>

        <Text
          css={css`
            margin-bottom: 24px;
          `}
        >
          с 11 утра до 20 вечера
        </Text>

        <Link
          external
          href="tel:+38 068 835 29 96"
          css={css`
            color: var(--accent);
            font-size: 32px;
            line-height: 35px;
          `}
        >
          +38 068 835 29 96
        </Link>
      </Box>

      <Box
        css={css`
          @media all and (min-width: 768px) {
            & {
              grid-column: 3 / 4;
              grid-row: 1/3;
              align-self: end;
            }
          }
        `}
      >
        <H3
          css={css`
            padding-bottom: 8px;
          `}
        >
          Адрес
        </H3>

        <Text
          css={css`
            margin-bottom: 24px;
          `}
        >
          Ул. Чапаева 10б
          <br />
          (Територия колледжа МОД/ЖТК)
        </Text>

        <Link
          external
          // TODO provide link
          href="#"
          css={css`
            color: var(--accent);
            margin-bottom: 24px;

            @media all and (min-width: 768px) {
              & {
                margin-bottom: 48px;
              }
            }
          `}
        >
          Как пройти?
        </Link>

        <H3
          css={css`
            padding-bottom: 16px;
          `}
        >
          Мы в соц сетях
        </H3>

        <Box>
          <Link
            external
            // TODO provide link
            href="https://instagram.com"
            css={css`
              margin-right: 24px;
            `}
          >
            instagram
          </Link>

          <Link
            external
            // TODO provide link
            href="https://tiktok.com"
          >
            tiktok
          </Link>
        </Box>
      </Box>

      <Box
        css={css`
          grid-row: 4/5;

          @media all and (min-width: 768px) {
            & {
              grid-column: 1/2;
              grid-row: 2/3;
            }
          }
        `}
      >
        <FreeFrom
          variant="white"
        />
      </Box>
    </Container>
  </Box>
);
