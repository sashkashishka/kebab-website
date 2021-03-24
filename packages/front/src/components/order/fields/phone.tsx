import * as React from 'react';
import { useActor } from '@xstate/react';
import InputMask from 'react-input-mask';

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

      <InputMask
        value={value}
        mask="+38 (999) 999-99-99"
        onChange={({ target: { value: v } }) => send({
          type: FieldActions.CHANGE,
          value: v,
        })}
      >
        {
          (inputProps: any) => (
            <Input
              {...inputProps}
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+38 (000) 000-00-00"
            />
          )
        }
      </InputMask>

      <FieldError
        error={error}
      />
    </Box>
  );
};
