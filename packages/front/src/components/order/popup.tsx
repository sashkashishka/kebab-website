import * as React from 'react';
import { useActor } from '@xstate/react';
import { css } from 'astroturf';

import { Box, Text } from 'Components/atoms';
import { Popup } from 'Components/popup';
import { SumUp } from 'Components/sum-up';

import {
  ShopActions,
  OrderActor,
  OrderActions,
  OrderMachineContext,
} from 'Machines';

import {
  Phone,
  DeliveryAddress,
} from './fields';

interface OrderFormPopupProps {
  shopSend: (...args: any[]) => any;
  orderRef: OrderActor;
}

export const OrderFormPopup: React.FC<OrderFormPopupProps> = ({
  shopSend,
  orderRef,
}) => {
  const [state, send] = useActor(orderRef);

  const {
    cart,
    phoneRef,
    deliveryAddressRef,
  } = state.context as OrderMachineContext;

  return (
    <Box
      css={css`
        position: fixed;
        top: 20%;
        left: 20%;
        right: 20%;
        bottom: 20%;
        background: #fff;
      `}
    >
      <Box
        css={css`
          display: grid;
          grid-template-rows: 1fr auto;
          height: 100%;
        `}
      >
        <Box
          css={css`
            padding: 16px;
          `}
        >
          <Text
            css={css`
              margin-bottom: 16px;
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              color: var(--black);

              @media all and (min-width: 768px) {
                & {
                  text-align: start;
                }
              }
            `}
          >
            Оформити замовлення
          </Text>

          <Box>
            <Phone
              phoneRef={phoneRef}
            />

            <DeliveryAddress
              deliveryAddressRef={deliveryAddressRef}
            />
          </Box>

        </Box>

        <Box
          css={css`
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 16px;
            border-top: 1px solid var(--2color);

            @media all and (min-width: 768px) {
              & {
                position: sticky;
              }
            }
          `}
        >
          {
            cart.length > 0 && (
              <SumUp
                cart={cart}
                // TODO check validity
                disabled
                send={() => send({ type: OrderActions.SUBMIT })}
                order
              />
            )
          }
        </Box>
      </Box>
    </Box>
  );

  // return (
  //   <Popup
  //     isOpen
  //     onDismiss={() => shopSend({ type: ShopActions.CLOSE_ORDER })}
  //     ariaLabel="order-form"
  //   >
  //     <Box
  //       css={css`
  //         display: grid;
  //         grid-template-rows: 1fr auto;
  //         height: 100%;
  //       `}
  //     >
  //       <Box
  //         css={css`
  //           padding: 16px;
  //         `}
  //       >
  //         <Text
  //           css={css`
  //             margin-bottom: 16px;
  //             font-size: 24px;
  //             font-weight: bold;
  //             text-align: center;
  //             color: var(--black);
  //
  //             @media all and (min-width: 768px) {
  //               & {
  //                 text-align: start;
  //               }
  //             }
  //           `}
  //         >
  //           Оформити замовлення
  //         </Text>
  //
  //
  //       </Box>
  //
  //       <Box
  //         css={css`
  //           position: fixed;
  //           bottom: 0;
  //           left: 0;
  //           right: 0;
  //           padding: 16px;
  //           border-top: 1px solid var(--2color);
  //
  //           @media all and (min-width: 768px) {
  //             & {
  //               position: sticky;
  //             }
  //           }
  //         `}
  //       >
  //         {
  //           cart.length > 0 && (
  //             <SumUp
  //               cart={cart}
  //               // TODO check validity
  //               disabled
  //               send={() => send({ type: OrderActions.SUBMIT })}
  //               order
  //             />
  //           )
  //         }
  //       </Box>
  //     </Box>
  //   </Popup>
  // );
};
