import * as React from 'react';
import { useMachine } from '@xstate/react';
import { css } from 'astroturf';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  Container,
  Box,
  H2,
  Link,
  Img,
  BackButton,
  NextButton,
} from 'Components/atoms';

import { SliderPagination, useCarousel } from 'Components/carousel';

import {
  createRequestMachine,
  RequestMachineStates,
} from 'Machines';

import { GET_BANNER_LIST, BannerListResponse } from 'Services';

import { BannerSkeleton } from './skeleton';

const mockSlidesArr = Array(4).fill(0).map((_v, i) => ({
  image_link: String(i),
  banner_link: String(i),
  description: '',
}));

export const PromoBanners: React.FC = () => {
  const [state] = useMachine(createRequestMachine<any, BannerListResponse>(GET_BANNER_LIST));
  const {
    slideBack,
    slideNext,
    sliderRef,
    activeSlide,
    setActiveSlide,
  } = useCarousel();

  const isSuccess = state.value === RequestMachineStates.SUCCESS;

  const slidesArr = isSuccess
    ? state.context?.response?.data
    : mockSlidesArr;

  return (
    <Container
      css={css`
        padding-top: 32px;
        padding-bottom: 32px;
      `}
    >
      <Box
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          touch-action: none;
        `}
      >
        <Box
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <H2
            css={css`
              display: inline-block;
              margin-right: 16px;
              font-size: 18px;
              line-height: 18px;
              font-weight: 600;
              color: var(--black);
            `}
          >
            Спеціальні пропозиції
          </H2>

          <Box
            css={css`
              display: none;

              @media all and (min-width: 768px) {
                & {
                  display: inline-block;
                }
              }
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

        <SliderPagination
          length={slidesArr?.length as number}
          active={activeSlide}
        />
      </Box>

      <Box>
        <Swiper
          style={{
            width: '100%',
          }}
          slidesPerView="auto"
          loopedSlides={slidesArr?.length}
          observer
          spaceBetween={10}
          onSwiper={(s) => {
            sliderRef.current = s;
            return undefined;
          }}
          onSlideChange={(s) => setActiveSlide(s?.activeIndex)}
        >
          {
            slidesArr?.map(({
              image_link,
              banner_link,
              description,
            }) => (
              <SwiperSlide
                key={image_link}
                style={{
                  width: 'auto',
                }}
              >
                {
                  isSuccess
                    ? (
                      <Link
                        as={banner_link ? 'a' : 'span'}
                        href={banner_link}
                        target="_blank"
                        external
                      >
                        <Img
                          src={image_link}
                          alt={description}
                          title={description}
                          css={css`
                            max-width: 270px;
                            width: 100%;
                            border-radius: 10px;
                            box-shadow: 0px 0.9625px 5.83333px rgba(0, 0, 0, 0.13);

                            @media all and (min-width: 425px) {
                              & {
                                max-width: 370px;
                              }
                            }

                            @media all and (min-width: 768px) {
                              & {
                                max-width: 630px;
                                max-height: 400px;
                              }
                            }
                          `}
                        />
                      </Link>
                    )
                    : (
                      <BannerSkeleton />
                    )
                }
              </SwiperSlide>
            ))
          }
        </Swiper>
      </Box>
    </Container>
  );
};
