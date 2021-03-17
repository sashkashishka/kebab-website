import { SpawnedActorRef, assign } from 'xstate';

import { Field } from '@kebab/types';

import {
  pipeValidators,
  timeInterval,
} from 'Utils';

import { createFieldMachine, FieldMachineEvents } from 'Machines';

import { MIN_DATE, MAX_DATE } from 'Constants';

type Val = Date;

export interface DeliveryTimeFieldMachineContext extends Field<Val> {}

export type DeliveryTimeFieldActor = SpawnedActorRef<FieldMachineEvents<Val>>;

// TODO handle case when close. maybe order on next day?
const isInIterval = timeInterval(MIN_DATE, MAX_DATE)('На жаль, ми закрились');

export const createDeliveryTimeFieldMachine = (field: Field<Val>) => createFieldMachine<Val>(field, 'deliveryTime')
  .withConfig({
    actions: {
      setError: assign({
        error: (_ctx, event) => pipeValidators(
          isInIterval,
        )(event.value),
      }),
    },
  });
