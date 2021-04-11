import { RequestHandler } from 'express';

export const useHttps: RequestHandler = (req, res, next) => {
  if (
    process.env.NODE_ENV === 'production'
    && req.header('x-forwarded-proto') !== 'https'
  ) {
    res.redirect(`https://${req.header('host')}${req.url}`);
  }

  next();
};
