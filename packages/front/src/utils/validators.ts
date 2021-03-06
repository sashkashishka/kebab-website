import { isWithinInterval } from 'date-fns';

interface Validator<V> {
  (v: V): undefined | string;
}

export const required = (error: string) => (value: string | number) => value
  ? undefined
  : error;

export const isPhone = (error: string) => (value: string | number) => {
  // to match exactly +38 (000) 000-00-00
  const phoneRegExp = /^[+]?[0-9]{1,3}\s[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s.0-9]{10}$/;

  return phoneRegExp.test(String(value))
    ? undefined
    : error;
};

export const integer = (error: string) => (value: string | number) => {
  const num = parseFloat(String(value));

  return (
    typeof num === 'number'
    && Number.isFinite(num)
    && Math.floor(num) === num
  )
    ? undefined
    : error;
};

export const positive = (error: string) => (value: string | number) => (
  parseInt(String(value), 10) >= 0
    ? undefined
    : error
);

export const pipeValidators = <V>(...validators: Validator<V>[]) => (
  (value: V) => (
    validators.reduce<string | undefined>((err, validator) => (err || validator(value)), undefined)
  )
);

export const timeInterval = (error: string) => (start: Date, end: Date) => (value: Date) => isWithinInterval(value, { start, end })
  ? undefined
  : error;
