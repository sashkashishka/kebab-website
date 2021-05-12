import * as React from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import SwiperClass from 'swiper/types/swiper-class';

// SwiperCore.use([Autoplay]);

export const useCarousel = () => {
  const sliderRef = React.useRef<SwiperClass>();
  const paginationRef = React.useRef<HTMLElement>();
  const [activeSlide, setActiveSlide] = React.useState<number>(0);

  const slideBack = () => sliderRef?.current?.slidePrev();
  const slideNext = () => sliderRef?.current?.slideNext();

  return {
    sliderRef,
    paginationRef,
    slideNext,
    slideBack,
    activeSlide,
    setActiveSlide,
  };
};
