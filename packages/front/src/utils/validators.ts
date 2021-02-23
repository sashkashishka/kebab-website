import { FieldState, FormState } from 'final-form';
import {
  FieldValidatorCustom,
  FieldValidatorCustomError,
  FieldValidatorCustomErrorPredefined,
} from 'Types/final-form';


export const required: FieldValidatorCustomError = error => value => value
  ? undefined
  : error;

export const email: FieldValidatorCustomErrorPredefined<string> = error => (value) => {
  const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegExp.test(value)
    ? undefined
    : error;
};

export const integer: FieldValidatorCustomErrorPredefined<string | number> = error => (value) => {
  const num = parseFloat(String(value));

  return (
    typeof num === 'number'
    && Number.isFinite(num)
    && Math.floor(num) === num
  )
    ? undefined
    : error;
};

export const positive: FieldValidatorCustomErrorPredefined<string | number> = error => value => (
  parseInt(String(value), 10) > 0
    ? undefined
    : error
);

export function isError<FV>(meta: Partial<FieldState<FV>>): boolean {
  return (
    meta.touched
    && (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit))
  );
}

export function isFormError<FormValues>({
  hasSubmitErrors,
  submitting,
  dirtySinceLastSubmit,
  submitError,
}: Partial<FormState<FormValues>>): boolean {
  return (
    hasSubmitErrors
    && !submitting
    && !dirtySinceLastSubmit
    && submitError
  );
}

export function isSubmitError<FV>(meta: FieldState<FV>): boolean | void {
  return (meta.submitError && meta.touched);
}


export function composeValidators<FV, R>(...validators: FieldValidatorCustom<FV, R>[]) {
  const v: FieldValidatorCustom<FV, R> = (value, allValues, meta) => (validators.reduce(
    (error, validator) => error || validator(value, allValues, meta),
    undefined,
  ));

  return v;
}

export const spaces: FieldValidatorCustomError = error => (value) => {
  if (typeof value === 'string' || typeof value === 'number') {
    const isSpace = String(value).match(/\s/g);
    if (!isSpace) return undefined;
  }

  return error;
};

/**
 * Value is greater than or equal to n
 */
export function lengthGte<FV>(error: string) {
  return (n: number): FieldValidatorCustom<FV, string> => value => (value && String(value).length >= n
    ? undefined
    : error
  );
}

export function equal<FV>(error: string) {
  return (a: FV): FieldValidatorCustom<FV, string> => b => (a === b
    ? undefined
    : error
  );
}
