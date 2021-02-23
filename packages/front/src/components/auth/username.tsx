import * as React from 'react';
import { useField } from 'react-final-form';
import { Label, Input } from '@rebass/forms';
import { Box } from 'rebass';

import {
  composeValidators,
  required,
  isError,
} from 'Utils/validators';

import { FieldNames } from 'Constants/auth-form';

import FieldError from './field-error';

const isRequired = required<string>('Це поле є обов\'язковим для заповнення');


const Username: React.FC = () => {
  const { input, meta } = useField(FieldNames.LOGIN, {
    validate: composeValidators<string, string>(isRequired),
  });

  return (
    <Box
      mb={3}
    >
      <Label
        htmlFor={FieldNames.LOGIN}
        pb={0}
      >
        Логін
      </Label>

      <Input
        id={FieldNames.LOGIN}
        autoComplete="username"
        className={isError(meta) ? 'error' : ''}
        sx={{
          textOverflow: 'ellipsis',
        }}
        {...input}
      />

      <FieldError
        meta={meta}
      />
    </Box>
  );
};

export default React.memo(Username);
