import * as React from 'react';
import { useSelector } from '@xstate/react';
import { css } from 'astroturf';

import { ShopContext } from 'Components/provider';
import { Box } from 'Components/atoms';
import { ProductCard, ProductCardSkeleton } from 'Components/product-card';

import {
  ShopStates,
  MenuFilterMachineContext,
  MenuFilterActor,
} from 'Machines';

interface ListProps {
  menuFilterRef: MenuFilterActor;
}

export const List: React.FC<ListProps> = ({ menuFilterRef }) => {
  const selected = useSelector<MenuFilterActor, MenuFilterMachineContext['selected']>(
    menuFilterRef,
    (state) => state.context.selected,
  );

  return (
    <Box
      css={css`
        display: grid;
        grid-gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(284px, 1fr));
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
  );
};

export const MenuList: React.FC = () => {
  const [state] = React.useContext(ShopContext);

  switch (true) {
    case state.matches(ShopStates.BUY):
      return (
        <List
          menuFilterRef={state.context.menuFilterRef}
        />
      );

    default:
      return (
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
      );
  }
};
