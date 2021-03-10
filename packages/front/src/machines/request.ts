import { Machine, assign } from 'xstate';
import { AxiosResponse } from 'axios';
import { request, isRequestError } from 'Utils';

enum States {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export enum Actions {
  REQUEST_SUCCESS = 'REQUEST_SUCCESS',
  REQUEST_FAIL = 'REQUEST_FAIL',
}

interface RequestMachineContext<Resp> {
  response: AxiosResponse<Resp> | undefined;
  error: any;
}

interface RequestMachineStateSchema {
  states: {
    [States.PENDING]: {},
    [States.SUCCESS]: {},
    [States.FAILURE]: {},
  }
}

type RequestMachineEvents =
  | { type: Actions.REQUEST_SUCCESS }
  | { type: Actions.REQUEST_FAIL };

export function createRequestMachine<Cfg, Resp>(config: Cfg) {
  return Machine<RequestMachineContext<Resp>, RequestMachineStateSchema, RequestMachineEvents>(
    {
      id: 'request-machine',
      initial: States.PENDING,
      context: {
        response: undefined,
        error: undefined,
      },
      states: {
        [States.PENDING]: {
          invoke: {
            src: () => request<Resp>(config),
            onDone: [
              {
                target: States.FAILURE,
                cond: 'isRequestError',
                actions: assign({
                  error: (_ctx, event) => event.data.error,
                }),
              },
              {
                target: States.SUCCESS,
                actions: assign({
                  response: (_ctx, event) => event.data,
                }),
              },
            ],
          },
        },
        [States.SUCCESS]: {
          type: 'final',
          data: {
            response: (ctx: RequestMachineContext<Resp>) => ctx.response,
          },
        },
        [States.FAILURE]: {
          type: 'final',
          data: {
            error: (ctx: RequestMachineContext<Resp>) => ctx.error,
          },
        },
      },
    },
    {
      guards: {
        isRequestError,
      },
    },
  );
}
