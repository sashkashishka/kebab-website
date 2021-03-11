import * as React from 'react';
import { useActor } from '@xstate/react';

import {
  CommentFieldActor,
  CommentFieldMachineContext,
  FieldActions,
} from 'Machines';

import {
  Box,
  Label,
  Textarea,
} from 'Components/atoms';

import { FieldError } from '../field-error';

interface CommentProps {
  commentRef: CommentFieldActor;
}

export const Comment: React.FC<CommentProps> = ({ commentRef }) => {
  const [state, send] = useActor(commentRef);

  const { value, error } = state.context as CommentFieldMachineContext;

  return (
    <Box>
      <Label
        htmlFor="comment"
      >
        Коментарі
      </Label>

      <Textarea
        id="comment"
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
