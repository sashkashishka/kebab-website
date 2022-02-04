export const getInitialState = (numItems: number): CarouselState => ({ pos: numItems - 1, sliding: false, dir: 'NEXT' });

export function reducer(state: CarouselState, action: CarouselAction): CarouselState {
  switch (action.type) {
    case "PREV":
      return {
        ...state,
        dir: 'PREV',
        sliding: true,
        pos: state.pos === 0 ? action.numItems - 1 : state.pos - 1
      };
    case 'NEXT':
      return {
        ...state,
        dir: 'NEXT',
        sliding: true,
        pos: state.pos === action.numItems - 1 ? 0 : state.pos + 1
      };
    case 'stopSliding':
      return { ...state, sliding: false };
    default:
      return state;
  }
}
