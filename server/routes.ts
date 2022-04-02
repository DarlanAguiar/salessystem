import { Router } from 'express';
import { credentials } from './serverController/helpers/salessystem-credential-firebase-admin';

import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import {
  addModelTransaction,
  addTransaction,
  deleteModelTransaction,
  deleteTransaction,
  getModelTransaction,
  getTransaction
} from './serverController/transactionRoutes';
import {
  addAuthorizedUser,
  checkAuthorizationInUserList,
  lisAllAuthorizedUser,
  removeAuthorizedUser
} from './serverController/authorizationRoutes';
import {
  addAccessDatabase,
  fetchAccessDatabase,
  changeAccessDatabase,
  removeAccessDatabase
} from './serverController/accessDatabaseConfiguration';
import { validateToken } from './serverController/middleware/handleValidation';

const router = Router();

const firebaseConfig = {
  apiKey: 'AIzaSyDIKzT2bn4MzVPAoi6vAPJr5ty4n2GgtJQ',
  authDomain: 'salessystem-659c6.firebaseapp.com',
  projectId: 'salessystem-659c6',
  storageBucket: 'salessystem-659c6.appspot.com',
  messagingSenderId: '402827702936',
  appId: '1:402827702936:web:bcee0d74934dc1cc6016ed'
};

initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});
export const db = getFirestore();

// Rotas de Transações

router.post('/home/modeltransaction', validateToken, addModelTransaction);

router.post('/home/transaction', validateToken, addTransaction);

router.get(
  '/home/transaction/:user/:token/:initialdate/:finaldate/:authorizedDatabase', validateToken,
  getTransaction
);

router.get(
  '/home/modeltransaction/:user/:token/:authorizedDatabase', validateToken,
  getModelTransaction
);

router.delete('/home/transaction', validateToken, deleteTransaction);

router.delete('/home/modeltransaction', validateToken, deleteModelTransaction);

// Rotas de autorizações

router.post('/home/auth', validateToken, addAuthorizedUser);

router.get('/home/auth/:user/:token', validateToken, lisAllAuthorizedUser);

router.delete('/home/auth', validateToken, removeAuthorizedUser);

router.get(
  '/home/auth/:user/:token/:usertoconfirm', validateToken,
  checkAuthorizationInUserList
);

// Rotas para banco de dado autorizado(CRUD)

router.post('/home/authaccess', validateToken, addAccessDatabase);

router.get('/home/authaccess/:user/:token', fetchAccessDatabase);

router.patch('/home/authaccess', validateToken, changeAccessDatabase);

router.delete('/home/authaccess', validateToken, removeAccessDatabase);

export default router;
