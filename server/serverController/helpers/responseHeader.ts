import { Response } from 'express';

export const setResponseHeader = (res: Response) => {
  return res.setHeader('Access-Control-Allow-Origin', '*');
};
