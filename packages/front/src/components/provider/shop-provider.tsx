import * as React from 'react';
import { useMachine } from '@xstate/react';

import { ShopMachine, ShopMachineInterpreted } from 'Machines';

export const ShopContext = React.createContext<ShopMachineInterpreted>(
  // @ts-ignore
  undefined,
);

export const ShopProvider: React.FC = ({ children }) => {
  // TODO FIXME
  const machine = useMachine(ShopMachine, {
    devTools: process.env.NODE_ENV === 'development',
  });

  // TODO show reload page when error state
  return (
    <ShopContext.Provider value={machine}>
      {children}
    </ShopContext.Provider>
  );
};
