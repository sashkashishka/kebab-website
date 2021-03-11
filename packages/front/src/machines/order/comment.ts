import { SpawnedActorRef } from 'xstate';

import { Field } from '@kebab/types';

import { createFieldMachine, FieldMachineEvents } from 'Machines';

type Val = string;

export interface CommentFieldMachineContext extends Field<Val> {}

export type CommentFieldActor = SpawnedActorRef<FieldMachineEvents<Val>>;

export const createCommentFieldMachine = (field: Field<Val>) => createFieldMachine<Val>(field, 'comment');
