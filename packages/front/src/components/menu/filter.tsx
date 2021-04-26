import * as React from 'react';
import { useActor } from '@xstate/react';
import { css } from 'astroturf';
import classname from 'classnames';

import { ShopContext } from 'Components/provider';
import { Box, Tab } from 'Components/atoms';

import {
  ShopStates,
  MenuFilterMachineContext,
  MenuFilterActions,
  MenuFilterActor,
} from 'Machines';

import { MenuFiltersSkeleton } from './skeleton';

const styles = css`
  .scrollable {
    overflow-x: scroll;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
  }

  .tabContainer {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
  }

  .tab {
    flex-shrink: 0;
  }
`;

interface MenuFilterProps {
  menuFilterRef: MenuFilterActor;
}

const MenuFilter: React.FC<MenuFilterProps> = ({ menuFilterRef }) => {
  const [state, send] = useActor(menuFilterRef);

  const {
    filters,
    filter,
  } = state.context as MenuFilterMachineContext;

  return (
    <Box
      className={classname(
        styles.scrollable,
        styles.tabContainer,
      )}
      css={css`
        margin-bottom: 8px;

        @media all and (min-width: 768px) {
          & {
            margin-bottom: 0;
          }
        }
      `}
    >
      {
        filters.map(({ value, text }) => (
          <Tab
            key={text}
            className={styles.tab}
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
  );
};

export const Filter: React.FC = () => {
  const [state] = React.useContext(ShopContext);

  switch (true) {
    case state.matches(ShopStates.BUY):
      return (
        <MenuFilter
          menuFilterRef={state.context.menuFilterRef}
        />
      );

    default:
      return (
        <Box
          className={styles.scrollable}
          css={css`
            margin-bottom: 8px;
          `}
        >
          <MenuFiltersSkeleton />
        </Box>
      );
  }
};
