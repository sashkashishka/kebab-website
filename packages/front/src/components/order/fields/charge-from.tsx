import * as React from 'react';
import { useActor } from '@xstate/react';

import {
  ChargeFromFieldActor,
  ChargeFromFieldMachineContext,
  FieldActions,
} from 'Machines';

import {
  Box,
  Label,
  Input,
  Asterisk,
} from 'Components/atoms';

import { FieldError } from '../field-error';

interface ChargeFromProps {
  chargeFromRef: ChargeFromFieldActor;
}

export const ChargeFrom: React.FC<ChargeFromProps> = ({ chargeFromRef }) => {
  const [state, send] = useActor(chargeFromRef);

  const { value, error } = state.context as ChargeFromFieldMachineContext;

  return (
    <Box>
      <Label
        htmlFor="charge_from"
      >
        Решта з
        {' '}
        <Asterisk />
      </Label>

      <Input
        id="charge_from"
        type="number"
        value={value}
        step="1"
        min="0"
        max="1000"
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
