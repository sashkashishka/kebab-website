import * as React from 'react';
import { useActor } from '@xstate/react';
import { css } from 'astroturf';

import { Box, Text, Button } from 'Components/atoms';
import { Popup } from 'Components/popup';
import { PointUp } from 'Components/emoji';

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
        as="form"
        css={css`
          display: grid;
          grid-template-rows: auto 1fr auto;
          height: 100%;
        `}
      >
        <Box
          css={css`
            background-color: #F1F1F9;
            padding: 16px 35px;
            text-align: center;
          `}
        >
          <Text
            css={css`
              display: inline-block;
              margin-bottom: 16px;
              font-size: 24px;
              line-height: 29px;
              font-weight: 800;
              color: var(--black);
            `}
          >
            Оформити замовлення
          </Text>

          <Text
            css={css`
              color: var(--accent);
              font-size: 15px;
            `}
          >
            <PointUp
              style={{
                fontSize: '18px',
              }}
            />
            {' '}
            <Box
              as="b"
              css={css`
                font-weight: bold;
              `}
            >
              від 250 грн
            </Box>
            {' '}
            безкоштовна доставка
          </Text>
        </Box>

        <Box
          css={css`
            padding: 16px;
          `}
        >
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
            position: sticky;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 16px;
            background-color: var(--white);
            border-top: 1px solid var(--2color);
          `}
        >
          {
            cart.length > 0 && (
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  send({ type: OrderActions.SUBMIT });
                }}
                disabled={state.matches({ [OrderStates.IDLE]: OrderStates.SUBMIT })}
              >
                🤤 оформити замовлення
              </Button>
            )
          }
        </Box>
      </Box>
    </Popup>
  );
};
