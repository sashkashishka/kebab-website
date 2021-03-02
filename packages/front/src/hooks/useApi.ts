/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import * as R from 'ramda';

const { CancelToken } = axios;

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
  const [state, setState] = React.useState(initialState);

  const configSerialized = JSON.stringify(config);
  const source = CancelToken.source();

  const request = (): void => {
    axios(
      url,
      R.mergeDeepRight(
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
          cancelToken: source.token,
        },
        config,
      ),
    )
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

  React.useEffect(() => {
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
