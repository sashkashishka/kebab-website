import {
  addHours,
  getMinutes,
  startOfHour,
  addMinutes,
} from 'date-fns';

const MINUTES = [15, 30, 45, 60];

export const getStartTime = (date: Date): Date => {
  const currMinute = getMinutes(date);

  const startMinute = MINUTES.reduce((acc, curr) => {
    if (acc === 0 && currMinute < curr) return curr;

    return acc;
  }, 0);

  return addMinutes(startOfHour(addHours(date, 1)), startMinute);
};
