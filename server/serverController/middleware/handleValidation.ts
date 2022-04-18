import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { DecodedIdToken, getAuth } from 'firebase-admin/auth';

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let validToken = false;

  let { user, token } = req.body;
  if (user === undefined) {
    user = req.params.user;
    token = req.params.token;
  }

  await getAuth()
    .verifyIdToken(token)
    .then((decodedToken: DecodedIdToken) => {
      const uid = decodedToken;
      if (uid.email === user) {
        validToken = true;
      }
    })
    .catch((error: object) => {
      validToken = false;
      console.error(error);
    });

  if (validToken) return next();

  res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ error: 'Token de usuario invalido' });
};
