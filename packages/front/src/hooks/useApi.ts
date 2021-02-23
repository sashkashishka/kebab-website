/* eslint-disable react-hooks/exhaustive-deps */
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  AxiosError,
} from 'axios';
import {
  useEffect,
  useState,
} from 'react';
import { mergeDeepRight, prop } from 'ramda';

const { CancelToken } = axios;


interface InitialStateMultiple {
  data: any[];
  response: AxiosResponse[];
  error: undefined | Error;
  isLoading: boolean;
}

const initialStateMultiple: InitialStateMultiple = {
  data: [],
  response: [],
  error: undefined,
  isLoading: true,
};

/**
 * useMultipleApi hook for multiple requests
 */
export function useMultipleApi<A>(configs: AxiosRequestConfig[]): {
  response: [AxiosResponse<A>];
  data: [A];
  isLoading: boolean;
  error?: AxiosError;
};
export function useMultipleApi<A, B>(configs: AxiosRequestConfig[]): {
  response: [
    AxiosResponse<A>,
    AxiosResponse<B>,
  ];
  data: [A, B];
  isLoading: boolean;
  error?: AxiosError;
};
export function useMultipleApi<A, B, C>(configs: AxiosRequestConfig[]): {
  response: [
    AxiosResponse<A>,
    AxiosResponse<B>,
    AxiosResponse<C>,
  ];
  data: [A, B, C];
  isLoading: boolean;
  error?: AxiosError;
};
export function useMultipleApi<A, B, C, D>(configs: AxiosRequestConfig[]): {
  response: [
    AxiosResponse<A>,
    AxiosResponse<B>,
    AxiosResponse<C>,
    AxiosResponse<D>,
  ];
  data: [A, B, C, D];
  isLoading: boolean;
  error?: AxiosError;
};
export function useMultipleApi<A, B, C, D, E>(configs: AxiosRequestConfig[]): {
  response: [
    AxiosResponse<A>,
    AxiosResponse<B>,
    AxiosResponse<C>,
    AxiosResponse<D>,
    AxiosResponse<E>,
  ];
  data: [A, B, C, D, E];
  isLoading: boolean;
  error?: AxiosError;
};
export function useMultipleApi(configs: AxiosRequestConfig[]): any {
  const [state, setState] = useState(initialState);

  const source = CancelToken.source();

  const request = (config: AxiosRequestConfig): AxiosPromise<any> => axios(mergeDeepRight(config, {
    cancelToken: source.token,
  }));

  useEffect(() => {
    axios.all(configs.map(request))
      .then((responses) => {
        setState({
          data: responses.map(prop('data')),
          error: undefined,
          response: responses,
          isLoading: false,
        });
      })
      .catch((reason) => {
        if (axios.isCancel(reason)) {
          console.log('Request canceled: ', reason.message);
        } else {
          setState({
            data: [],
            error: reason,
            response: [],
            isLoading: false,
          });
        }
      });

    return (): void => {
      source.cancel('useEffect cleanup');
    };
  }, []);

  return state;
}

interface InitialState {
  response?: AxiosResponse;
  error?: AxiosError;
  isLoading: boolean;
}

const initialState: InitialState = {
  response: undefined,
  error: undefined,
  isLoading: true,
};

export function useApi<T>(url: string, config: AxiosRequestConfig = {}, run = true): {
  data: T;
  response: AxiosResponse<T>;
  error?: AxiosError;
  isLoading: boolean;
  request(): void;
} {
  const [state, setState] = useState(initialState);

  const configSerialized = JSON.stringify(config);
  const source = CancelToken.source();

  const request = (): void => {
    axios(url, {
      ...config,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        ...config.headers,
      },
      cancelToken: source.token,
    })
      .then((response) => {
        setState({
          error: undefined,
          response,
          isLoading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled: ', error.message);
        } else {
          setState({
            error,
            response: undefined,
            isLoading: false,
          });
        }
      });
  };

  useEffect(() => {
    if (run) {
      request();
    }

    return (): void => {
      source.cancel('useEffect cleanup');
    };
  }, [url, configSerialized]);

  const { response, error, isLoading } = state;

  const data = response
    ? response.data
    : undefined;

  return {
    data,
    // @ts-ignore
    response,
    error,
    isLoading,
    request,
  };
}
