import * as React from 'react';
import { send } from 'xstate';
import { useMachine } from '@xstate/react';
import { css } from 'astroturf';

import { ProductsList } from '@kebab/types';

import { Box, Tab } from 'Components/atoms';
import { ProductCard } from 'Components/product-card';

import {
  MenuFilterMachine,
  MenuFilterStates,
  MenuFilterActions,
} from 'Machines';

interface FiltersProps {
  products: ProductsList;
  shopSend: typeof send;
}

export const List: React.FC<FiltersProps> = ({ products, shopSend }) => {
  const [state, send] = useMachine(MenuFilterMachine, {
    context: {
      products,
    },
  });

  const {
    filters,
    filter,
    selected,
  } = state.context;

  switch (state.value) {
    case MenuFilterStates.MENU:
      return (
        <>
          <Box
            css={css`
              margin-bottom: 16px;
            `}
          >
            {
              filters.map(({ value, text }) => (
                <Tab
                  key={text}
                  // @ts-ignore
                  active={filter.value === value}
                  onClick={() => send({
                    type: MenuFilterActions.SET_FILTER,
                    filter: {
                      value,
                      text,
                    },
                  })}
                >
                  {text}
                </Tab>
              ))
            }
          </Box>
          <Box
            css={css`
              display: grid;
              grid-gap: 16px;
              grid-template-columns: repeat(auto-fit, minmax(284px, 1fr));
            `}
          >
            {
              selected.map(({ name, ...rest }) => (
                <ProductCard
                  key={name}
                  name={name}
                  {...rest}
                />
              ))
            }
          </Box>
        </>
      );

    default:
      // TODO skeleton
      return null;
  }
};
