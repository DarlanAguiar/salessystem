import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where
} from 'firebase/firestore';
import { db } from '../../routes';

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
    .json({ message: 'Token de usuario invalido' });
};

export const validateDatabaseAccess = async (req: Request,
  res: Response,
  next: NextFunction) => {
  let { user, authorizedDatabase } = req.body;
  if (user === undefined) {
    user = req.params.user;
    authorizedDatabase = req.params.authorizedDatabase;
  }

  if (user === authorizedDatabase) return next();

  let authorized = false;

  try {
    const result = await query(collection(db, 'accessPermissions'), where('allowedDatabase', '==', authorizedDatabase), where('user', '==', user));
    const querySnapshot = await getDocs(result);

    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      authorized = true;
    });
  } catch (err) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Erro no servidor ao validar banco de dados' });
  }

  if (authorized) return next();
  res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ message: `O banco de dados ${authorizedDatabase} não autorizou o seu acesso, vá em configs e altere o banco de dados.` });
};
