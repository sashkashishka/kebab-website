import * as React from 'react';
import { useActor } from '@xstate/react';
import { css } from 'astroturf';

import { Box, Text, Button } from 'Components/atoms';
import { Popup } from 'Components/popup';
import { SumUp } from 'Components/sum-up';

import {
  ShopActions,
  OrderActor,
  OrderStates,
  OrderActions,
  OrderMachineContext,
} from 'Machines';

import {
  Phone,
  DeliveryAddress,
  Payment,
  ChargeFrom,
  DeliveryTime,
  Comment,
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
    paymentRef,
    chargeFromRef,
    deliveryTimeRef,
    commentRef,
    payment,
  } = state.context as OrderMachineContext;

  if (state.matches({ [OrderStates.IDLE]: OrderStates.ERROR })) {
    return (
      <Popup
        isOpen
        onDismiss={() => shopSend({ type: ShopActions.CLOSE_ORDER })}
        ariaLabel="order-form"
        product
      >
        <Box
          css={css`
            display: grid;
            grid-template-rows: 1fr auto;
            align-items: center;
            justify-items: center;
            height: 100%;
            padding: 16px;
          `}
        >
          <Text
            css={css`
              margin-bottom: 16px;
              font-size: 24px;
              font-weight: bold;
              color: var(--black);
            `}
          >
            Непередбачена помилка
          </Text>

          <Button
            type="button"
            onClick={() => send({ type: OrderActions.RETRY })}
          >
            Спробувати ще раз
          </Button>
        </Box>
      </Popup>
    );
  }

  return (
    <Popup
      isOpen
      onDismiss={() => shopSend({ type: ShopActions.CLOSE_ORDER })}
      ariaLabel="order-form"
      product
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

          <Box
            css={css`
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              grid-gap: 24px;
            `}
          >
            <Phone
              phoneRef={phoneRef}
            />

            <DeliveryAddress
              deliveryAddressRef={deliveryAddressRef}
            />

            <Payment
              paymentRef={paymentRef}
            />

            {
              payment.value === 'cash' && (
                <ChargeFrom
                  chargeFromRef={chargeFromRef}
                />
              )
            }

            <DeliveryTime
              deliveryTimeRef={deliveryTimeRef}
            />

            <Comment
              commentRef={commentRef}
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
            background-color: var(--white);
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
                disabled={state.matches({ [OrderStates.IDLE]: OrderStates.SUBMIT })}
                send={() => send({ type: OrderActions.SUBMIT })}
                order
              />
            )
          }
        </Box>
      </Box>
    </Popup>
  );
};
