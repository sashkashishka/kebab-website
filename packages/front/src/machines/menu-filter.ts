import { Machine, assign } from 'xstate';

import { ProductsList } from '@kebab/types';

export enum MenuFilterStates {
  INIT = 'init',
  MENU = 'menu',
}

export enum MenuFilterActions {
  ALWAYS = 'always',
  SET_FILTER = 'SET_FILTER',
}

interface Filter {
  value: 'all' | 'kebab' | 'pizza' | 'drinks';
  text: string;
}

interface MenuFilterMachineContext {
  filter: Filter;
  filters: Filter[];
  products: ProductsList;
  selected: ProductsList;
}

interface MenuFilterMachineStateSchema {
  states: {
    [MenuFilterStates.INIT]: {},
    [MenuFilterStates.MENU]: {},
  }
}

type MenuFilterMachineEvents =
  | { type: MenuFilterActions.ALWAYS }
  | { type: MenuFilterActions.SET_FILTER, filter: Filter };

const initialFilter: Filter = {
  value: 'all',
  text: 'Все позиции',
};

export const MenuFilterMachine = Machine<MenuFilterMachineContext, MenuFilterMachineStateSchema, MenuFilterMachineEvents>({
  id: 'menu-filter',
  initial: MenuFilterStates.INIT,
  context: {
    filter: initialFilter,
    filters: [initialFilter],
    products: [],
    selected: [],
  },
  states: {
    [MenuFilterStates.INIT]: {
      [MenuFilterActions.ALWAYS]: {
        target: MenuFilterStates.MENU,
        actions: assign({
          filters: (ctx) => {
            const fltrs = ctx.products
              .reduce((acc, { type_name, type }) => {
                acc[type] = {
                  value: type,
                  text: type_name,
                };
                return acc;
              }, {});

            return [
              ...ctx.filters,
              ...Object.values<Filter>(fltrs),
            ];
          },
          selected: (ctx) => ctx.products,
        }),
      },
    },
    [MenuFilterStates.MENU]: {
      on: {
        [MenuFilterActions.SET_FILTER]: {
          actions: assign({
            filter: (_ctx, event) => event.filter,
            selected: (ctx, event) => {
              if (event.filter.value === initialFilter.value) return ctx.products;

              return ctx.products.filter(({ type }) => type === event.filter.value);
            },
          }),
        },
      },
    },
  },
});
