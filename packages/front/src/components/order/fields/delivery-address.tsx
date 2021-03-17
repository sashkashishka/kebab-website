import * as React from 'react';
import { useActor } from '@xstate/react';
import { css } from 'astroturf';

import {
  DeliveryAddressFieldStates,
  DeliveryAddressFieldActions,
  DeliveryAddressFieldActor,
  DeliveryAddressFieldMachineContext,
  FieldActions,
} from 'Machines';

import {
  Box,
  Button,
  Label,
  Input,
  Asterisk,
} from 'Components/atoms';

import { FieldError } from '../field-error';

interface DeliveryAddressProps {
  deliveryAddressRef: DeliveryAddressFieldActor;
}

export const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ deliveryAddressRef }) => {
  const [state, send] = useActor(deliveryAddressRef);

  const { value, error } = state.context as DeliveryAddressFieldMachineContext;

  const isPickup = state.matches(DeliveryAddressFieldStates.PICKUP);

  return (
    <Box>
      <Label
        htmlFor="delivery_address"
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <Box>
          Адреса доставки
          {' '}
          <Asterisk />
        </Box>

        <Button
          type="button"
          onClick={() => send({
            type: isPickup
              ? DeliveryAddressFieldActions.ADDRESS
              : DeliveryAddressFieldActions.PICKUP,
          })}
          css={css`
            padding: 0;
            font-size: 14px;
            color: var(--accent);
            background-color: transparent;

            &:hover,
            &:active,
            &:focus {
              color: var(--accent);
              background-color: transparent;
              text-decoration: underline;
            }
          `}
        >
          {
            isPickup
              ? 'ввести адресу'
              : 'заберу сам'
          }
        </Button>
      </Label>

      <Input
        id="delivery_address"
        type="text"
        autoComplete="street-address"
        value={value}
        width="100%"
        disabled={isPickup}
        // @ts-ignore
        error={Boolean(error)}
        onChange={({ target: { value: v } }) => send({
          type: FieldActions.CHANGE,
          value: v,
        })}
      />

      <FieldError
        error={error}
      />
    </Box>
  );
};
