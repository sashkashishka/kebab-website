export enum FieldNames {
  LOGIN = 'login',
  PASSWORD = 'password',
}

export const authFormSubscription = {
  submitting: true,
  values: true,
  validating: true,
  submitSucceeded: true,
  submitFailed: true,
  submitError: true,
  hasSubmitErrors: true,
  dirtySinceLastSubmit: true,
};
