import * as React from 'react';
import { Box } from 'rebass';
import { Input, Label } from '@rebass/forms';
import { useField } from 'react-final-form';

import {
  composeValidators,
  required,
  spaces,
  isError,
} from 'Utils/validators';

import { FieldNames } from 'Constants/auth-form';

import FieldError from './field-error';

const isRequired = required<string>('Це поле є обов\'язковим для заповнення');
const isSpaces = spaces<string>('Пароль не може містити пробілів');

const Password: React.FC = () => {
  const { input, meta } = useField(FieldNames.PASSWORD, {
    validate: composeValidators(isRequired, isSpaces),
    type: 'password',
  });

  return (
    <Box
      mb={3}
    >
      <Label
        htmlFor={FieldNames.PASSWORD}
      >
        Пароль
      </Label>
      <Input
        {...input}
        id={FieldNames.PASSWORD}
        autoComplete="current-password"
        className={isError(meta) ? 'error' : ''}
        sx={{
          textOverflow: 'ellipsis',
        }}
      />

      <FieldError
        meta={meta}
      />
    </Box>
  );
};

export default Password;
