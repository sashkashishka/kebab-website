import * as React from 'react';
import { useMachine } from '@xstate/react';
import { css } from 'astroturf';
import AliceCarousel from 'react-alice-carousel';

import {
  Container,
  Box,
  H2,
  Link,
  Img,
  BackButton,
  NextButton,
} from 'Components/atoms';

import { carouselStyles, useCarousel } from 'Components/carousel';

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
    currSlide,
    slideBack,
    slideNext,
    syncCurrSlide,
  } = useCarousel();

  const isSuccess = state.value === RequestMachineStates.SUCCESS;

  const slidesArr = isSuccess
    ? state.context?.response?.data
    : mockSlidesArr;

  const items = slidesArr?.map(({
    image_link,
    banner_link,
    description,
  }) => (
    <Box
      key={image_link}
      css={css`
        @media all and (min-width: 683px) {
          & {
            margin-right: 20px;
          }
        }
      `}
    >
      {
        isSuccess
          ? (
            <Link
              as={banner_link ? 'a' : 'span'}
              href={banner_link}
              external
            >
              <Img
                src={image_link}
                alt={description}
                title={description}
                css={css`
                  max-width: 630px;
                  max-height: 400px;
                  width: 100%;
                  border-radius: 10px;
                  box-shadow: 0px 0.9625px 5.83333px rgba(0, 0, 0, 0.13);
                `}
              />
            </Link>
          )
          : (
            <BannerSkeleton />
          )
      }
    </Box>
  ));

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
          margin-bottom: 24px;
          touch-action: none;
        `}
      >
        <H2
          css={css`
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
                display: block;
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

      <Box
        className={carouselStyles.carouselWrapper}
      >
        <AliceCarousel
          infinite
          autoPlay
          autoPlayInterval={4000}
          mouseTracking
          disableButtonsControls
          activeIndex={currSlide}
          items={items}
          responsive={{
            682: {
              items: 2,
            },
          }}
          onSlideChanged={syncCurrSlide}
        />
      </Box>
    </Container>
  );
};
