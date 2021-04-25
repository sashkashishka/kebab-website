import * as React from 'react';
import { useMachine } from '@xstate/react';
import { css } from 'astroturf';
import AliceCarousel from 'react-alice-carousel';
import classname from 'classnames';

import { ShopContext } from 'Components/provider';
import {
  Container,
  Box,
  H2,
  Img,
  BackButton,
  NextButton,
} from 'Components/atoms';
import { carouselStyles, useCarousel } from 'Components/carousel';

import {
  createRequestMachine,
  RequestMachineStates,
  ShopActions,
} from 'Machines';

import { GET_PROMOTION_LIST, PromotionListResponse } from 'Services';

import { PromotionSkeleton } from './skeleton';

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
    name,
    price,
    imageUrl,
    bannerUrl,
  }) => (
    <Box
      key={name}
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
          Вигідні акції
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
        className={classname(
          carouselStyles.carouselWrapper,
          carouselStyles.carouselPromotions,
        )}
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
            600: {
              items: 2,
            },
            1024: {
              items: 3,
            },
            1440: {
              items: 4,
            },
          }}
          onSlideChanged={syncCurrSlide}
        />
      </Box>
    </Container>
  );
};

