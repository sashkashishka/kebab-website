import { AxiosRequestConfig } from 'axios';

export const GET_PRODUCT_LIST: Partial<AxiosRequestConfig> = {
  url: '/api/get-product-list/',
  method: 'get',
};
