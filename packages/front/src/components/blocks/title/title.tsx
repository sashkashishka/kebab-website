import { useMachine } from '@xstate/react';
import { css } from 'astroturf';
import {
  Box,
  Container,
  H1,
  Text,
} from 'Components/atoms';
import { Socials } from 'Components/socials';
import { KebabEmoji, PizzaEmoji } from 'Components/emoji';

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
        background-image: linear-gradient(to bottom, #131313 60%, #F1F1F9 40%);

        @media all and (min-width: 768px) {
          & {
            background-image: linear-gradient(to bottom, #131313 70%, #F1F1F9 30%);
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
          background-position: center;
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
            grid-template-rows: 1fr auto auto;
            grid-template-columns: 100%;
            grid-gap: 18px;
            text-align: center;

            @media all and (min-width: 768px) {
              & {
                grid-template-rows: auto 1fr;
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
              Ідеальна шаурма та піцца
            </H1>

            <Text
              css={css`
                margin-bottom: 18px;
              `}
            >
              З доставкою по Житомиру
            </Text>

            <Text
              css={css`
                color: var(--accent);
                font-weight: bold;
              `}
            >
              з 9:00 до 21:00
            </Text>

          </Box>

          <Box
            css={css`
              overflow: hidden;
              width: 100%;

              @media all and (min-width: 768px) {
                & {
                  grid-row: 1/3;
                  grid-column: 2/3;
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

          <Box
            css={css`
              display: none;

              @media all and (min-width: 768px) {
                & {
                  display: block;
                  margin-top: 32px;
                  grid-row: 2/3;
                  grid-column: 1/2;
                  align-self: end;
                  color: var(--black);
                } 
              }
            `}
          >
            <Socials />
          </Box>

        </Box>
      </Container>
    </Box>
  );
};
