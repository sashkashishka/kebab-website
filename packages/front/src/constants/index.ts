import { setHours, setMinutes } from 'date-fns';

export const MIN_DATE = setHours(setMinutes(new Date(), 0), 9);
export const MAX_DATE = setHours(setMinutes(new Date(), 1), 20);
