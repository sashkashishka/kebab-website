import { Machine, assign } from 'xstate';
import { AxiosResponse } from 'axios';
import { request, isRequestError } from 'Utils';

export enum RequestMachineStates {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export enum RequestMachineActions {
  REQUEST_SUCCESS = 'REQUEST_SUCCESS',
  REQUEST_FAIL = 'REQUEST_FAIL',
}

interface RequestMachineContext<Resp> {
  response: AxiosResponse<Resp> | undefined;
  error: any;
}

interface RequestMachineStateSchema {
  states: {
    [RequestMachineStates.PENDING]: {},
    [RequestMachineStates.SUCCESS]: {},
    [RequestMachineStates.FAILURE]: {},
  }
}

type RequestMachineEvents =
  | { type: RequestMachineActions.REQUEST_SUCCESS }
  | { type: RequestMachineActions.REQUEST_FAIL };

export function createRequestMachine<Cfg, Resp>(config: Cfg) {
  return Machine<RequestMachineContext<Resp>, RequestMachineStateSchema, RequestMachineEvents>(
    {
      id: 'request-machine',
      initial: RequestMachineStates.PENDING,
      context: {
        response: undefined,
        error: undefined,
      },
      states: {
        [RequestMachineStates.PENDING]: {
          invoke: {
            src: () => request<Resp>(config),
            onDone: [
              {
                target: RequestMachineStates.FAILURE,
                cond: 'isRequestError',
                actions: assign({
                  error: (_ctx, event) => event.data.error,
                }),
              },
              {
                target: RequestMachineStates.SUCCESS,
                actions: assign({
                  response: (_ctx, event) => event.data,
                }),
              },
            ],
          },
        },
        [RequestMachineStates.SUCCESS]: {
          type: 'final',
          data: {
            response: (ctx: RequestMachineContext<Resp>) => ctx.response,
          },
        },
        [RequestMachineStates.FAILURE]: {
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
