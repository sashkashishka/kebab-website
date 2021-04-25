import { AxiosRequestConfig } from 'axios';

export const GET_PROMOTION_LIST: Partial<AxiosRequestConfig> = {
  url: '/api/get-promotion-list/',
  method: 'get',
};

export type PromotionListResponse = Array<{
  name: string;
  price: number;
  imageUrl: string;
  bannerUrl: string;
}>;
