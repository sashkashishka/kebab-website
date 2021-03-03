import * as React from 'react';
// import { StateMachine } from 'xstate';
import { useMachine } from '@xstate/react';

import { ShopMachine } from 'Machines';

// TODO provide interpreted machine type
export const ShopContext = React.createContext<any>([]);

export const ShopProvider: React.FC = ({ children }) => {
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
