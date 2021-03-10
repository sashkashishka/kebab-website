import * as React from 'react';
import { useActor } from '@xstate/react';

import {
  PhoneFieldActor,
  PhoneFieldMachineContext,
  FieldActions,
} from 'Machines';

import {
  Box,
  Label,
  Input,
  Asterisk,
} from 'Components/atoms';

import { FieldError } from '../field-error';

interface PhoneProps {
  phoneRef: PhoneFieldActor;
}

export const Phone: React.FC<PhoneProps> = ({ phoneRef }) => {
  const [state, send] = useActor(phoneRef);

  const { value, error } = state.context as PhoneFieldMachineContext;

  return (
    <Box>
      <Label
        htmlFor="phone"
      >
        Номер телефону
        {' '}
        <Asterisk />
      </Label>

      <Input
        id="phone"
        type="tel"
        autoComplete="tel"
        value={value}
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
