import express from 'express';
import { ping } from './ping';

export const getRoutes = () => {
  const router = express.Router();

  router.use('/ping', ping);

  return router;
};
