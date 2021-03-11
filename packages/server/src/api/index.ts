import express from 'express';

import { initGoogleSheet } from '../middlewares';
import { getProductList } from './get-product-list';
import { postOrder } from './order';
import { ping } from './ping';

export const getApis = () => {
  const router = express.Router();

  router.get('/get-product-list', initGoogleSheet, getProductList);
  router.post('/order', initGoogleSheet, postOrder);
  router.get('/ping', ping);

  return router;
};
