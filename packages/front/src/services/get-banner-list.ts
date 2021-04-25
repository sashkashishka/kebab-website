import { AxiosRequestConfig } from 'axios';

export const GET_BANNER_LIST: Partial<AxiosRequestConfig> = {
  url: '/api/get-banner-list/',
  method: 'get',
};

export type BannerListResponse = Array<{
  banner_link: string;
  image_link: string;
  description: string;
}>;
