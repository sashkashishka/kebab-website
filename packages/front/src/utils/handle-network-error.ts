import { FORM_ERROR } from 'final-form';

const handleNetworkErrors = (e: any) => ({
  [FORM_ERROR]: e.message as string,
});

export default handleNetworkErrors;
