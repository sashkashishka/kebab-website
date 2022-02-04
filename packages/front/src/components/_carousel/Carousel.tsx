import * as React from 'react';
import { useSwipeable } from 'react-swipeable';
import { css } from 'astroturf';

import {
  Box,
  Img,
} from 'Components/atoms';

import { throttle, getOrder } from './utils';
import { reducer, getInitialState } from './reducer';

interface iCarouselProps {
  images: string[];

}

export const Carousel = ({ images }) => {
  const numItems = images.length;
  const [state, dispatch] = React.useReducer(reducer, getInitialState(numItems));

  const myRef = React.useRef();

  // console.log(state)
  const slide = (dir: Direction) => {
    dispatch({ type: dir, numItems });
    setTimeout(() => {
      dispatch({ type: 'stopSliding' });
    }, 2000);

  };
  const handlers = useSwipeable({
    onSwiping: throttle(({ deltaX }) => {
      const node = myRef.current;

      if (!node) return;

      node.dataset.sliding = true;
      node.style.setProperty('--deltaX', `${deltaX}px`);
    }, 50),
    onSwiped: () => {
      console.log('swiped')
      const node = myRef.current;

      if (!node) return;

      node.style.setProperty('--deltaX', `0px`);
      node.dataset.sliding = false;
    },
    onSwipedLeft: ({ deltaX }) => {
      console.log('left', deltaX)
      if (deltaX < -70) {
        slide('NEXT');
      }
    },
    onSwipedRight: ({ deltaX }) => {
      console.log('right', deltaX)
      if (deltaX > 70) {
        slide('PREV');
      }
    },
  });

  const refPassthrough = (el) => {
    // call useSwipeable ref prop with el
    handlers.ref(el);

    // set myRef el so you can access it yourself
    myRef.current = el;
  }

  return (
    <Box
      css={css`
        height: 200px;
        overflow: hidden;
      `}
    >
      <button onClick={() => slide('PREV')}>prev</button>
      <button onClick={() => slide('NEXT')}>next</button>
      <Box
        className="car"
        onTransitionEnd={() => {console.log('transitionenv')}}
        css={css`
          display: flex;
          flex-wrap: nowrap;
          will-change: transform;
          transition: ${() => state.sliding ? 'none' : 'transform 0.4s ease'};
          transform: ${() => {
            if (!state.sliding) return 'translateX(calc(var(--translate) + var(--deltaX)))';
            if (state.dir === 'PREV') return 'translateX(calc(2 * var(--translate)))';
            return 'translateX(0%)';
          }};

          &[data-sliding="true"] {
            transition: none;
          }

          & img {
            flex: 1 0 100%;
            width: 100%;
            height: 100%;
            object-fit: cover;
            order: var(--order);
          }
        `}
        style={{
          '--deltaX': '0px',
          '--translate': '-100%',
        }}
        {...handlers}
        ref={refPassthrough}
      >
        {
          images.map((src, index) => (
            <Img
              src={src}
              style={{
                '--order': getOrder(index, state.pos, numItems),
              }}
            /> 
          ))
        }
      </Box>
    </Box>

  );
};
