import * as React from 'react';
import { Form } from 'react-final-form';
import {
  Text,
  Box,
  Button,
} from 'rebass';

import { authFormSubscription } from 'Constants/auth-form';

import FormError from './form-error';

import Email from './username';
import Password from './password';

import submit from './submit';


export interface FormValues {
  login: string;
  password: string;
}

const initialValues: FormValues = {
  login: '',
  password: '',
};

const SignInForm: React.FC = () => (
  <Form
    onSubmit={submit}
    initialValues={initialValues}
    subscription={authFormSubscription}
    render={(formState) => {
      const {
        handleSubmit,
        submitting,
      } = formState;

      return (
        <Box
          as="form"
          // @ts-ignore
          onSubmit={handleSubmit}
          variant="card"
          maxWidth="350px"
          width="100%"
          mx="auto"
          sx={{
            boxShadow: 'medium',
          }}
        >
          <Text
            variant="subtitle"
            color="basic.5"
            textAlign="center"
            mb="24px"
          >
            Авторизація
          </Text>

          <Email />

          <Password />

          <FormError
            state={formState}
          />

          <Button
            type="submit"
            disabled={submitting}
          >
            Увійти
          </Button>
        </Box>
      );
    }}
  />
);

export default SignInForm;
