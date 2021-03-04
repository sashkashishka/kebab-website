import { Machine, assign, SpawnedActorRef } from 'xstate';

import { ProductItemWithMachine } from 'Machines';

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

export interface MenuFilterMachineContext {
  filter: Filter;
  filters: Filter[];
  products: ProductItemWithMachine[];
  selected: ProductItemWithMachine[];
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

export type MenuFilterActor = SpawnedActorRef<MenuFilterMachineEvents>;

export const createMenuFilterMachine = (products: ProductItemWithMachine[]) => Machine<MenuFilterMachineContext, MenuFilterMachineStateSchema, MenuFilterMachineEvents>({
  id: 'menu-filter',
  initial: MenuFilterStates.INIT,
  context: {
    filter: initialFilter,
    filters: [initialFilter],
    products,
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
