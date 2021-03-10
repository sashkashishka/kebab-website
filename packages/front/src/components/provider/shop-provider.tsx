import * as React from 'react';
import { State } from 'xstate';
import { useMachine } from '@xstate/react';

import { ShopMachine, ShopMachineInterpreted } from 'Machines';

import { LS } from 'Utils';

export const ShopContext = React.createContext<ShopMachineInterpreted>(
  // @ts-ignore
  undefined,
);

// const SHOP_KEY = 'shop-state';
//
// const stateDefinition: typeof ShopMachine.initialState = LS.get(SHOP_KEY) || ShopMachine.initialState;
//
// const previousState = State.create(stateDefinition);

export const ShopProvider: React.FC = ({ children }) => {
  const machine = useMachine(ShopMachine, {
    devTools: process.env.NODE_ENV === 'development',
    // state: previousState,
  });

  // React.useEffect(() => {
  //   LS.set(SHOP_KEY, machine[0]);
  // }, machine);

  // TODO show reload page when error state
  return (
    <ShopContext.Provider value={machine}>
      {children}
    </ShopContext.Provider>
  );
};
