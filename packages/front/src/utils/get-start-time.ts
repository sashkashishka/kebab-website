import {
  addHours,
  getMinutes,
  startOfHour,
  addMinutes,
  addDays,
  isWithinInterval,
} from 'date-fns';

import { MIN_TIME, MAX_TIME } from 'Constants';

const MINUTES = [15, 30, 45, 60];

const getDeliveryTime = (date: Date): Date => {
  const currMinute = getMinutes(date);

  const startMinute = MINUTES.reduce((acc, curr) => {
    if (acc === 0 && currMinute < curr) return curr;

    return acc;
  }, 0);

  return addMinutes(startOfHour(addHours(date, 1)), startMinute);
};

const getNextDayTime = (): Date => addDays(MIN_TIME, 1);

export const getStartTime = (date: Date): Date => {
  if (isWithinInterval(date, { start: MIN_TIME, end: MAX_TIME })) return getDeliveryTime(date);

  return getNextDayTime();
};
