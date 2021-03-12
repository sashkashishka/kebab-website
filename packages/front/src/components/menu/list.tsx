import * as React from 'react';
import { useActor } from '@xstate/react';
import { css } from 'astroturf';

import { ShopContext } from 'Components/provider';
import { Box, Tab } from 'Components/atoms';
import { ProductCard, ProductCardSkeleton } from 'Components/product-card';

import {
  ShopStates,
  MenuFilterMachineContext,
  MenuFilterActor,
  MenuFilterActions,
} from 'Machines';

import { MenuFiltersSkeleton } from './skeleton';

interface FilterAndListProps {
  menuFilterRef: MenuFilterActor;
}

const FilterAndList: React.FC<FilterAndListProps> = ({ menuFilterRef }) => {
  const [state, send] = useActor(menuFilterRef);

  const {
    filters,
    filter,
    selected,
  } = state.context as MenuFilterMachineContext;

  return (
    <>
      <Box
        css={css`
          margin-bottom: 8px;
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
          selected.map((product) => (
            <ProductCard
              key={product.name}
              {...product}
            />
          ))
        }
      </Box>
    </>
  );
};

export const MenuList: React.FC = () => {
  const [state] = React.useContext(ShopContext);

  switch (true) {
    case state.matches(ShopStates.BUY):
      return (
        <FilterAndList
          menuFilterRef={state.context.menuFilterRef}
        />
      );

    case state.matches(ShopStates.FETCH):
      return (
        <>
          <Box
            css={css`
              margin-bottom: 8px;
            `}
          >
            <MenuFiltersSkeleton />
          </Box>
          <Box
            css={css`
              display: grid;
              grid-gap: 16px;
              grid-template-columns: repeat(auto-fit, minmax(284px, 1fr));
            `}
          >
            {
              Array.from(Array(10).keys()).map((_v, i) => (
                <ProductCardSkeleton
                  key={i} // eslint-disable-line
                />
              ))
            }
          </Box>
        </>
      );

    default:
      return null;
  }
};
