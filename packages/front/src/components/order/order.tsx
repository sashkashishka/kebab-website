import * as React from 'react';

import { ShopContext } from 'Components/provider';

import { ShopStates } from 'Machines';

import { OrderFormPopup } from './popup';

export const OrderForm: React.FC = () => {
  const [state, send] = React.useContext(ShopContext);

  const {
    orderRef,
  } = state.context;

  switch (true) {
    case state.matches({ [ShopStates.BUY]: ShopStates.ORDER }):
      return (
        <OrderFormPopup
          shopSend={send}
          orderRef={orderRef}
        />
      );

    default:
      return null;
  }
};
