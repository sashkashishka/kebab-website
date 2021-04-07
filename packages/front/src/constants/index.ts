import {
  setHours,
  setMinutes,
  addDays,
  startOfHour,
} from 'date-fns';

export const MIN_TIME = startOfHour(setHours(setMinutes(new Date(), 0), 11));
export const MAX_TIME = setHours(MIN_TIME, 20);
export const MAX_DATE = addDays(MAX_TIME, 14);

export const KEBAB_TYPE = 'kebab';
export const PIZZA_TYPE = 'pizza';
export const DRINK_TYPE = 'drinks';

export const PRODUCT_TYPES = {
  [KEBAB_TYPE]: 'Шаурма',
  [PIZZA_TYPE]: 'Піцца',
  [DRINK_TYPE]: 'Напої',
};
