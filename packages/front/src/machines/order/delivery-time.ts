import { SpawnedActorRef } from 'xstate';

import { Field } from '@kebab/types';

import { createFieldMachine, FieldMachineEvents } from 'Machines';

type Val = Date;

export interface DeliveryTimeFieldMachineContext extends Field<Val> {}

export type DeliveryTimeFieldActor = SpawnedActorRef<FieldMachineEvents<Val>>;

export const createDeliveryTimeFieldMachine = (field: Field<Val>) => createFieldMachine<Val>(field, 'delivery-time');
