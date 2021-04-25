import * as React from 'react';
import { css } from 'astroturf';

export const carouselStyles = css`
  :global {
    .alice-carousel__dots {
      position: absolute;
      top: 0;
      right: 0;
      transform: translateY(calc(-100% - 24px));
      margin: 0;
    }

    .alice-carousel__dots-item:not(.__custom) {
      width: 6px;
      height: 6px;
      background-color: #DADAE8;
    }

    .alice-carousel__dots-item:not(.__custom):not(:last-child) {
      margin-right: 5px;
    }

    .alice-carousel__dots-item:not(.__custom).__active {
      background-color: var(--accent);
    }
  }

  .carousel-wrapper {
    position: relative;
  }

  .carousel-promotions {
    :global(.alice-carousel__wrapper) {
      padding-top: 44px;
      padding-bottom: 44px;
    }
  }
`;

export const useCarousel = () => {
  const [currSlide, setSlide] = React.useState(0);

  const slideBack = () => setSlide(currSlide - 1);
  const slideNext = () => setSlide(currSlide + 1);
  const syncCurrSlide = ({ item }: { item: number }) => setSlide(item);

  return {
    currSlide,
    slideNext,
    slideBack,
    syncCurrSlide,
  };
}
