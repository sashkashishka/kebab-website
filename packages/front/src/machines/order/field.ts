import {
  Machine,
  assign,
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

export interface FieldMachineContext<V> extends Field<V> {}

export interface FieldMachineEvents<V> {
  type: FieldActions.CHANGE;
  value: V;
}
export const createFieldMachine = <V>(field: Field<V>, name: string = 'noname') => Machine<FieldMachineContext<V>, FieldMachineEvents<V>>(
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
