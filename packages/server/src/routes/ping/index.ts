import { Request, Response } from 'express';

export const ping = (req: Request, res: Response) => {
  res.status(200).json({
    pong: 'pong',
  });
};
