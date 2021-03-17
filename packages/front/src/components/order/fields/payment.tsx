import * as React from 'react';
import { css } from 'astroturf';
import { useActor } from '@xstate/react';

import {
  PaymentFieldActor,
  PaymentFieldMachineContext,
  FieldActions,
} from 'Machines';

import {
  Box,
  Label,
  Asterisk,
  Tab,
} from 'Components/atoms';

import { FieldError } from '../field-error';

interface PaymentProps {
  paymentRef: PaymentFieldActor;
}

const styles = css`
  .tab {
    display: flex;
    align-items: center;
    margin: 0 16px 0 0;
    cursor: pointer;
  }
`;

export const Payment: React.FC<PaymentProps> = ({ paymentRef }) => {
  const [state, send] = useActor(paymentRef);

  const { value, error } = state.context as PaymentFieldMachineContext;

  return (
    <Box>
      <Label
        htmlFor="payment"
      >
        Спосіб оплати
        {' '}
        <Asterisk />
      </Label>

      <Box
        css={css`
          display: flex;
        `}
      >
        <Tab
          type="button"
          // @ts-ignore
          active={value === 'card'}
          onClick={() => send({ type: FieldActions.CHANGE, value: 'card' })}
          className={styles.tab}
        >
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
            <path d="M13.9998 3.16675H1.99984C1.26346 3.16675 0.666504 3.7637 0.666504 4.50008V12.5001C0.666504 13.2365 1.26346 13.8334 1.99984 13.8334H13.9998C14.7362 13.8334 15.3332 13.2365 15.3332 12.5001V4.50008C15.3332 3.7637 14.7362 3.16675 13.9998 3.16675Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0.666504 7.16675H15.3332" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          Картою
        </Tab>

        <Tab
          type="button"
          // @ts-ignore
          active={value === 'cash'}
          onClick={() => send({ type: FieldActions.CHANGE, value: 'cash' })}
          className={styles.tab}
        >
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
            <path d="M7.92952 14.978C6.60352 14.978 5.58352 14.7117 4.86952 14.179C4.15552 13.6463 3.79852 12.8417 3.79852 11.765C3.79852 11.3343 3.86086 10.9433 3.98552 10.592H3.18652V9.504H4.61452C4.84119 9.27733 5.14152 9.07333 5.51552 8.892C5.90086 8.69933 6.29752 8.52933 6.70552 8.382C7.12486 8.23467 7.49319 8.11 7.81052 8.008C8.12786 7.89467 8.33186 7.81533 8.42252 7.77H3.18652V6.682H9.68052C9.77119 6.52333 9.83352 6.359 9.86752 6.189C9.91286 6.019 9.93552 5.80367 9.93552 5.543C9.93552 5.01033 9.75419 4.59667 9.39152 4.302C9.02886 3.996 8.46219 3.843 7.69152 3.843C7.13619 3.843 6.60919 3.91667 6.11052 4.064C5.62319 4.21133 5.18686 4.37567 4.80152 4.557L4.37652 3.214C4.80719 3.01 5.33419 2.84 5.95752 2.704C6.58086 2.568 7.18719 2.5 7.77652 2.5C8.92119 2.5 9.82219 2.738 10.4795 3.214C11.1482 3.67867 11.4825 4.39267 11.4825 5.356C11.4825 5.594 11.4655 5.832 11.4315 6.07C11.3975 6.29667 11.3352 6.50067 11.2445 6.682H12.1795V7.77H10.7005C10.5192 7.95133 10.2359 8.13833 9.85052 8.331C9.46519 8.51233 9.06286 8.68233 8.64352 8.841C8.22419 8.99967 7.84452 9.13567 7.50452 9.249C7.16452 9.36233 6.94352 9.44733 6.84152 9.504H12.1795V10.592H5.56652C5.47586 10.762 5.41352 10.9207 5.37952 11.068C5.34552 11.2153 5.32852 11.4193 5.32852 11.68C5.32852 12.9947 6.24086 13.652 8.06552 13.652C8.71152 13.652 9.33486 13.5727 9.93552 13.414C10.5475 13.244 11.0575 13.0683 11.4655 12.887V14.264C11.0802 14.4453 10.5645 14.6097 9.91852 14.757C9.27252 14.9043 8.60952 14.978 7.92952 14.978Z" fill="currentColor" />
          </svg>

          Готівкою
        </Tab>
      </Box>

      <FieldError
        error={error}
      />
    </Box>
  );
};
