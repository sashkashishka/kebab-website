import { SpawnedActorRef, assign } from 'xstate';
import * as R from 'ramda';
import {
  getMinutes,
  getHours,
  setMinutes,
  setHours,
  startOfHour,
} from 'date-fns';

import { Field } from '@kebab/types';

import {
  pipeValidators,
  timeInterval,
  getStartTime,
} from 'Utils';

import { createFieldMachine, FieldMachineEvents } from 'Machines';

import {
  MIN_TIME,
  MAX_TIME,
  MAX_DATE,
} from 'Constants';

type Val = Date;

export interface DeliveryTimeFieldMachineContext extends Field<Val> {}

export type DeliveryTimeFieldActor = SpawnedActorRef<FieldMachineEvents<Val>>;

const isInTwoWeekInterval = timeInterval('Оберіть будь-який активний день у календарі')(
  getStartTime(new Date()),
  MAX_DATE,
);

const isWorkingHours = R.pipe<
Date,
Date,
Date,
string | undefined
>(
  (date: Date): Date => setHours(setMinutes(new Date(), getMinutes(date)), getHours(date)),
  startOfHour,
  timeInterval('Оберіть, будь ласка, у проміжку від 11-ї до 20-ї години')(
    MIN_TIME,
    MAX_TIME,
  ),
);

export const createDeliveryTimeFieldMachine = (field: Field<Val>) => createFieldMachine<Val>(field, 'deliveryTime')
  .withConfig({
    actions: {
      setError: assign({
        error: (_ctx, event) => pipeValidators(
          isInTwoWeekInterval,
          isWorkingHours,
        )(event.value),
      }),
    },
  });
