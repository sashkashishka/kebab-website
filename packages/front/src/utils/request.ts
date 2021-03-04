import axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';
import * as R from 'ramda';

// import { EventBus } from 'Utils/event-bus';

export * from 'axios';

// NOTE if we find some bugs with this implementation - fix
// TODO handle network error (return axios response like object) set 1000 status to show in snackbar
// TODO handle timeout errors and send to snackbar
// TODO is not axios error - send to snackbar
// TODO handle 500+ errors (return axios response like object)
// TODO handle 400+ errors
export function request<Resp>(cfg: AxiosRequestConfig): Promise<AxiosResponse<Resp> | { error: AxiosError<Resp> }> {
  const source = axios.CancelToken.source();
  const config: AxiosRequestConfig = R.mergeDeepRight(
    {
      cancelToken: source.token,
      validateStatus: (status: number) => status >= 200 && status < 400,
    },
    cfg,
  );

  return axios(config)
    .catch((error: AxiosError<Resp>) => {
      const {
        response,
        message,
      } = error;

      if (response && response.status >= 400 && response.status < 500) {
        return response;
      }

      // TODO snackbak
      // EventBus.notify(
      //   'snackbar',
      //   {
      //     payload: {
      //       error,
      //       message,
      //     },
      //   },
      // );
      console.error(error);

      return {
        error,
      };
    });
}
