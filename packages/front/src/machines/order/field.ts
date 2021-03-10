import {
  Machine,
  assign,
  SpawnedActorRef,
  sendParent,
} from 'xstate';

import { Field } from '@kebab/types';

import { OrderActions } from 'Machines';

export enum FieldStates {
  EDIT = 'edit',
}

export enum FieldActions {
  CHANGE = 'CHANGE',
}

export interface FieldMachineContext extends Field {}

export type FieldMachineEvents =
  | { type: FieldActions.CHANGE, value: string | number };

export type FieldActor = SpawnedActorRef<FieldMachineEvents>;

export const createFieldMachine = (field: Field, name: string = 'noname') => Machine<FieldMachineContext, FieldMachineEvents>(
  {
    id: `${name}-field`,
    initial: FieldStates.EDIT,
    context: field,
    states: {
      [FieldStates.EDIT]: {
        on: {
          [FieldActions.CHANGE]: {
            actions: [
              'setValue',
              'setError',
              sendParent((ctx) => ({
                type: OrderActions.CHANGE,
                field: {
                  value: ctx.value,
                  error: ctx.error,
                  name,
                },
              })),
            ],
          },
        },
      },
    },
  },
  {
    actions: {
      setValue: assign({
        value: (_ctx, event) => event.value,
      }),
      // @ts-ignore
      setError: assign({
        error: () => undefined,
      }),
    },
  },
);
