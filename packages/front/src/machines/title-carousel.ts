import { Machine } from 'xstate';

export enum CarouselStates {
  KEBAB = 'kebab',
  PIZZA = 'pizza',
}

export enum CarouselActions {
  CHANGE = 'CHANGE',
}

export interface CarouselMachineContext {
  delay: number;
}

interface CarouselMachineStateSchema {
  states: {
    [CarouselStates.KEBAB]: {},
    [CarouselStates.PIZZA]: {},
  }
}

type CarouselMachineEvents =
  | { type: CarouselActions.CHANGE };

export const CarouselMachine = Machine<CarouselMachineContext, CarouselMachineStateSchema, CarouselMachineEvents>(
  {
    id: 'carousel',
    initial: CarouselStates.KEBAB,
    context: {
      delay: 5000,
    },
    states: {
      [CarouselStates.KEBAB]: {
        after: {
          CAROUSEL_DELAY: CarouselStates.PIZZA,
        },
      },
      [CarouselStates.PIZZA]: {
        after: {
          CAROUSEL_DELAY: CarouselStates.KEBAB,
        },
      },
    },
  },
  {
    delays: {
      CAROUSEL_DELAY: (ctx) => ctx.delay,
    },
  },
);
