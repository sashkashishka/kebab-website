import * as React from 'react';
import { Box } from 'rebass';
import { FormState } from 'final-form';

import { isFormError } from 'Utils/validators';

interface FormErrorProps {
  state: FormState<any>;
}

const FormError: React.FC<FormErrorProps> = ({ state, ...rest }) => {
  const error = isFormError(state);

  if (!error) return null;

  return (
    <Box
      variant="form-error"
      {...rest}
    >
      {state.submitError}
    </Box>
  );
};

export default FormError;
