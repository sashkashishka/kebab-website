import { useMachine } from '@xstate/react';
import { css } from 'astroturf';
import {
  Box,
  Container,
  H1,
  Text,
  Button,
} from 'Components/atoms';
import { Socials } from 'Components/socials';
import {
  KebabEmoji,
  PizzaEmoji,
  DroolingFaceEmoji,
} from 'Components/emoji';

import { CarouselMachine, CarouselStates } from 'Machines';

import imgKebab from 'Img/img-kebab.png';
import imgPizza from 'Img/img-pizza.png';

import { CarouselItem } from './item';

export const TitleBlock = () => {
  const [state, send] = useMachine(CarouselMachine);

  return (
    <Box
      css={css`
        background-color: var(--black);
        background-image: linear-gradient(to bottom, #fff 60%, #131313 40%);

        @media all and (min-width: 768px) {
          & {
            background-image: linear-gradient(to bottom, #fff 75%, #131313 25%);
          }
        }
      `}
    >
      <Container
        css={css`
          padding-top: 32px;
          padding-bottom: 32px;
          background-image: url('Img/bg-title-mobile.png');
          background-size: contain;
          background-position: 50% 100%;
          background-repeat: no-repeat;

          @media all and (min-width: 768px) {
            & {
              background-position: center right;
              background-image: url('Img/bg-title-desktop.png');
            } 
          }
        `}
      >
        <Box
          css={css`
            display: grid;
            grid-template-columns: 100%;
            grid-gap: 18px;
            text-align: center;
            color: var(--black);

            @media all and (min-width: 768px) {
              & {
                grid-template-columns: 40% 60%;
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
              Ідеальна шаурма та піца Житомир
            </H1>

            <Text
              css={css`
                margin: 0 auto 18px auto;
                max-width: 280px;
                color: var(--text);

                @media all and (min-width: 768px) {
                  & {
                    margin: 0 0 18px 0;
                  }
                }
              `}
            >
              Ель Шейх замовити шаурму и піцу
              з доставкою додому від 250 грн
            </Text>

            <Text
              css={css`
                margin: 0 auto;
                text-align: center;
                color: var(--accent);
                font-weight: 900;

                @media all and (min-width: 768px) {
                  & {
                    display: none;
                  }
                }
              `}
            >
              пн / пт 10-20
              <br />
              сб 10-19 нд 11-18
            </Text>

            <Box
              css={css`
                display: none;

                @media all and (min-width: 768px) {
                  & {
                    display: block;
                  }
                }
              `}
            >
              <Button
                css={css`
                  margin-bottom: 24px;
                `}
              >
                <DroolingFaceEmoji />
                {' '}
                Замовити з доставкою
              </Button>

               <br />

              <Socials />
            </Box>
          </Box>

          <Box
            css={css`
              overflow: hidden;
              width: 100%;

              @media all and (min-width: 768px) {
                & {
                  justify-self: center;
                } 
              }
            `}
          >
            <Box
              css={css`
                display: flex;
                justify-content: space-around;
                width: 200%;
                transform: translateX(${state.value === CarouselStates.PIZZA ? '-50%' : 0});
                transition: transform 0.5s;
              `}
            >
              <CarouselItem
                img={imgKebab}
                alt="kebab"
                price={40}
                name={(
                  <>
                    Соковита шаурма <KebabEmoji />
                  </>
                )}
              />

              <CarouselItem
                img={imgPizza}
                alt="pizza"
                price={55}
                name={(
                  <>
                    Ароматна піцца <PizzaEmoji />
                  </>
                )}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
