import * as React from 'react';
import { Box } from 'rebass';
import { FieldState } from 'final-form';

import { RebassProps } from 'Types/rebass';

import { isError } from 'Utils/validators';

interface FieldErrorProps extends RebassProps {
  meta: Partial<FieldState<any>>;
}

const FieldError: React.FC<FieldErrorProps> = ({ meta, ...rest }) => {
  const error = isError(meta);

  if (!error) return null;

  return (
    <Box
      as="span"
      variant="field-error"
      {...rest}
    >
      {meta.error || meta.submitError}
    </Box>
  );
};

export default FieldError;
