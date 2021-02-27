import logger from 'loglevel';
import { Server } from './app';
import { getRoutes } from './routes';

const isTest = process.env.NODE_ENV === 'test';
const logLevel = process.env.LOG_LEVEL || (isTest ? 'warn' : 'info');

// @ts-ignore
logger.setLevel(logLevel);

const server = new Server({
  getRoutes,
  env: {
    PORT: process.env.PORT,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  },
});

server.start();
