import * as React from 'react';

interface DrawFuncArgs {
  domRect: DOMRect;
  scrollValue: number;
}

interface AnimateOptions {
  timing: (t: number) => number;
  duration: number;
  draw: (n: number) => number;
  focus: boolean;
  callback: () => void;
  current: HTMLElement;
}

interface UseScrollToOptions {
  duration: number;
  timing: AnimateOptions['timing'];
  draw: (obj: DrawFuncArgs) => AnimateOptions['draw'];
}

const defaultOptions = {
  /**
   * @see https://gist.github.com/gre/1650294
   * @see https://easings.net/en
   */
  timing: (t: number) => (1 + (--t) * t * t * t * t),
  duration: 1000,
  focus: false,
  draw: ({ domRect, scrollValue }: DrawFuncArgs) => (progress: number) => {
    const { top } = domRect;

    window.scrollTo(
      0,
      scrollValue + (top - window.innerHeight / 3) * progress,
    );

    return scrollValue + Math.abs(top - window.innerHeight / 3) * progress;
  },
  callback: () => {},
};

function animate(options: AnimateOptions) {
  const {
    timing,
    duration,
    draw,
    current,
    focus,
    callback,
  } = options;

  const start = window.performance.now();

  const anim = (time: number) => {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    const progress = timing(timeFraction);

    const d = draw(Math.abs(progress));

    if (timeFraction < 1) {
      if (Math.ceil(d) > 1) {
        window.requestAnimationFrame(anim);
      }
    }

    if (timeFraction >= 1) {
      callback();
      if (focus) {
        current.focus();
      }
    }
  };

  window.requestAnimationFrame(anim);
}

export const useScrollTo = (
  options: Partial<UseScrollToOptions> = defaultOptions,
): [React.RefObject<HTMLElement>, () => void] => {
  const ref = React.useRef<HTMLElement>(null);
  const {
    duration,
    timing,
    draw,
    focus,
    callback,
  } = { ...defaultOptions, ...options };

  const scroll = React.useCallback(() => {
    if (ref.current) {
      const domRect = ref?.current?.getBoundingClientRect();
      const scrollValue = window.pageYOffset;

      animate({
        duration,
        timing,
        draw: draw({ domRect, scrollValue }),
        current: ref.current as unknown as HTMLElement,
        focus,
        callback,
      });
    }
  }, [draw, duration, timing, focus]);

  return [ref, scroll];
};
