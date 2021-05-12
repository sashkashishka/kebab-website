import * as React from 'react';
import { useMachine } from '@xstate/react';
import { css } from 'astroturf';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ShopContext } from 'Components/provider';
import {
  Container,
  Box,
  H2,
  Img,
  BackButton,
  NextButton,
} from 'Components/atoms';
import { SliderPagination, useCarousel } from 'Components/carousel';

import {
  createRequestMachine,
  RequestMachineStates,
  ShopActions,
} from 'Machines';

import { GET_PROMOTION_LIST, PromotionListResponse } from 'Services';

import { PromotionSkeleton } from './skeleton';

const styles = css`
  .promo-container {
    width: 100%;
    overflow: visible;

    @media all and (min-width: 1024px) {
      & {
        width: 166%;
        margin-left: -33%;
        padding: 0 33%;
      }
    }
  }
`;

const mockSlidesArr = Array(4).fill(0).map((_v, i) => ({
  name: String(i),
  price: i,
  imageUrl: String(i),
  bannerUrl: String(i),
}));

export const Promotion: React.FC = () => {
  const shopMachine = React.useContext(ShopContext);
  const shopSend = shopMachine[1];

  const [state] = useMachine(createRequestMachine<any, PromotionListResponse>(GET_PROMOTION_LIST));
  const {
    sliderRef,
    activeSlide,
    setActiveSlide,
    slideBack,
    slideNext,
  } = useCarousel();

  const isSuccess = state.value === RequestMachineStates.SUCCESS;

  const slidesArr = isSuccess
    ? state.context?.response?.data
    : mockSlidesArr;

  return (
    <Box
      css={css`
        position: relative;
        width: 100%;
        padding: 32px max(calc((100% - 1248px) / 2), 16px);
        overflow: hidden;

        @media all and (min-width: 768px) {
          & {
            padding-top: 80px;
          }
        }
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
            Вигідні акції
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
          className={styles.promoContainer}
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
              name,
              price,
              imageUrl,
              bannerUrl,
            }) => (
              <SwiperSlide
                key={imageUrl}
                style={{
                  width: 'auto',
                }}
              >
                {
                  isSuccess
                    ? (
                      <Box
                        onClick={() => shopSend({
                          type: ShopActions.ADD_TO_CART,
                          item: {
                            price,
                            name,
                            qty: 1,
                            size: {},
                            toppings: {},
                            item: {
                              type: 'kebab',
                              type_name: '',
                              name,
                              description: '',
                              imageUrl,
                              sizes: {},
                              toppings: {},
                            },
                          },
                        })}
                        css={css`
                          max-width: 270px;
                          max-height: 145px;
                          width: 100%;
                          margin: 0 auto;
                          border-radius: 10px;
                          overflow: hidden;
                          box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.1);
                          cursor: pointer;
                        `}
                      >
                        <Img
                          src={bannerUrl}
                          alt={name}
                          title={name}
                          css={css`
                            width: 270px;
                            height: 145px;
                            object-fit: contain;
                          `}
                        />
                      </Box>
                    )
                    : (
                      <PromotionSkeleton />
                    )
                }
              </SwiperSlide>
            ))
          }
        </Swiper>

        <Box
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: calc((100% - 1280px) / 2);
            background-image: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
            z-index: 2;
          `}
        />
        <Box
          css={css`
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: calc((100% - 1280px) / 2);
            background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
            z-index: 2;
          `}
        />
      </Box>
    </Box>
  );
};
