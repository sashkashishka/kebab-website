import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { css } from 'astroturf';

import {
  Box,
  Container,
  H1,
  Text,
  Button,
  BackButton,
  NextButton,
} from 'Components/atoms';
import { Socials } from 'Components/socials';
import {
  DroolingFaceEmoji,
} from 'Components/emoji';
import { useCarousel } from 'Components/carousel';

import imgKebab from 'Img/img-kebab.png';
import imgPizza from 'Img/img-pizza.png';

import { CarouselItem } from './item';

interface TitleBlockProps {
  scroll: () => void;
}

export const TitleBlock: React.FC<TitleBlockProps> = ({ scroll }) => {
  const {
    slideBack,
    slideNext,
    sliderRef,
  } = useCarousel();

  return (
    <Box
      css={css`
        background-color: var(--black);
        background-image: linear-gradient(to bottom, #fff 60%, #131313 40%);
        border-radius: 0 0 14px 14px;
        margin-bottom: 48px;

        @media all and (min-width: 768px) {
          & {
            background-image: linear-gradient(to bottom, #fff 75%, #131313 25%);
            border-radius: 0;
            margin-bottom: 80px;
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
          background-position: 50% 75%;
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
                grid-template-rows: 1fr auto;
                text-align: start;
              } 
            }
          `}
        >
          <Box
            css={css`
              @media all and (min-width: 768px) {
                & {
                  grid-column: 1/2;
                  grid-row: 1/2;
                  align-self: center;
                } 
              }
            `}
          >
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
                onClick={scroll}
                css={css`
                  margin-bottom: 24px;
                `}
              >
                <DroolingFaceEmoji />
                {' '}
                Замовити з доставкою
              </Button>
            </Box>
          </Box>

          <Box
            css={css`
              @media all and (min-width: 768px) {
                & {
                  grid-column: 2/3;
                  grid-row: 1/3;
                } 
              }
            `}
          >
            <Swiper
              slidesPerView={1}
              onSwiper={(s) => {
                sliderRef.current = s;
                return undefined;
              }}
            >
              <SwiperSlide>
                <CarouselItem
                  img={imgKebab}
                  alt="kebab"
                  price={40}
                  name="Соковита шаурма"
                />
              </SwiperSlide>
              <SwiperSlide>
                <CarouselItem
                  img={imgPizza}
                  alt="pizza"
                  price={55}
                  name="Ароматна піцца"
                />
              </SwiperSlide>
            </Swiper>

            <Box
              css={css`
                margin-top: 16px;
                text-align: center;
              `}
            >
              <BackButton
                type="button"
                onClick={slideBack}
                css={css`
                  margin-right: 16px;
                `}
              />

              <NextButton
                type="button"
                onClick={slideNext}
              />
            </Box>
          </Box>

          <Box
            css={css`
              display: none;
              color: var(--white);

              @media all and (min-width: 768px) {
                & {
                  display: block;
                  grid-row: 2/3;
                  grid-column: 1/2;
                }
              }
            `}
          >
            <Socials
              theme="white"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
