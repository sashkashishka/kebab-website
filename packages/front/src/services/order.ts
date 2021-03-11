import { AxiosRequestConfig } from 'axios';

export const ORDER: Partial<AxiosRequestConfig> = {
  url: '/api/order/',
  method: 'post',
};
