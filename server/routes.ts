import { Router } from 'express';
import { credentials } from './serverController/helpers/salessystem-credential-firebase-admin';

import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
  checkInvitation,
  deleteInvitation,
  lisAllAuthorizedUser,
  removeAuthorizedUser,
  searchAuthorizedDatabase
} from './serverController/authorizationRoutes';
import {
  addAccessDatabase,
  fetchAccessDatabase,
  changeAccessDatabase,
  removeAccessDatabase
} from './serverController/accessDatabaseConfiguration';
import { validateDatabaseAccess, validateToken } from './serverController/middleware/handleValidation';
import { fetchFoto, getTitlesToLogo, setTitlesToLogo, updateTitlesToLogo } from './serverController/configLogo';

const router = Router();

const firebaseConfig = {
  apiKey: 'AIzaSyDIKzT2bn4MzVPAoi6vAPJr5ty4n2GgtJQ',
  authDomain: 'salessystem-659c6.firebaseapp.com',
  projectId: 'salessystem-659c6',
  storageBucket: 'salessystem-659c6.appspot.com',
  messagingSenderId: '402827702936',
  appId: '1:402827702936:web:bcee0d74934dc1cc6016ed'
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});
export const db = getFirestore();

// Rotas de Transações

router.post('/home/modeltransaction', validateToken, validateDatabaseAccess, addModelTransaction);

router.post('/home/transaction', validateToken, validateDatabaseAccess, addTransaction);

router.get(
  '/home/transaction/:user/:token/:initialdate/:finaldate/:authorizedDatabase', validateToken, validateDatabaseAccess,
  getTransaction
);

router.get(
  '/home/modeltransaction/:user/:token/:authorizedDatabase', validateToken, validateDatabaseAccess,
  getModelTransaction
);

router.delete('/home/transaction', validateToken, validateDatabaseAccess, deleteTransaction);

router.delete('/home/modeltransaction', validateToken, validateDatabaseAccess, deleteModelTransaction);

// Rotas de autorizações

router.post('/home/auth', validateToken, addAuthorizedUser);

router.get('/home/auth/:user/:token', validateToken, lisAllAuthorizedUser);

router.delete('/home/auth', validateToken, removeAuthorizedUser);

router.get(
  '/home/auth/:user/:token/:usertoconfirm', validateToken,
  checkAuthorizationInUserList
);

router.get(
  '/home/invitation/:user/:token/', validateToken,
  checkInvitation
);

router.delete(
  '/home/invitation', validateToken,
  deleteInvitation
);

router.get(
  '/home/alloweddb/:user/:token/', validateToken,
  searchAuthorizedDatabase
);

// Rotas para banco de dado autorizado(CRUD)

router.post('/home/authaccess', validateToken, addAccessDatabase);

router.get('/home/authaccess/:user/:token', fetchAccessDatabase);

router.patch('/home/authaccess', validateToken, changeAccessDatabase);

router.delete('/home/authaccess', validateToken, removeAccessDatabase);

// Rotas para o Logo e nome da empresa

router.get('/home/photo/:user/:token/:authorizedDatabase', validateToken, validateDatabaseAccess, fetchFoto);

router.post('/home/settings', validateToken, validateDatabaseAccess, setTitlesToLogo);

router.get('/home/settings/:user/:token/:authorizedDatabase', validateToken, validateDatabaseAccess, getTitlesToLogo);

router.patch('/home/settings', validateToken, validateDatabaseAccess, updateTitlesToLogo);

export default router;
