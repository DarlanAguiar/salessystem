import { Router } from "express";
//import { credentials } from "../salessystem-credential-firebase-admin";

import admin, { ServiceAccount } from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
  addModelTransaction,
  addTransaction,
  deleteModelTransaction,
  deleteTransaction,
  getModelTransaction,
  getTransaction,
} from "../serverController/transactionRoutes";
import {
  addAuthorizedUser,
  checkAuthorizationInUserList,
  lisAllAuthorizedUser,
  removeAuthorizedUser,
} from "../serverController/authorizationRoutes";
import {
  addAccessDatabase,
  fetchAccessDatabase,
  changeAccessDatabase,
  removeAccessDatabase,
} from "../serverController/accessDatabaseConfiguration";
import { validateToken } from "../serverController/middleware/handleValidation";

const router = Router();

const credentials: ServiceAccount = {
  projectId: "salessystem-659c6",
  privateKey:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCEis2RxwT7FfCn\nkZkf6t2Eoi5Tymw8YuMoXCSXN1//7sdjwuUXfUe7n70XD2vjG1IIlK1Prmu9xjJI\naMYtLm6jX725wEe795uw72MRwC29+OmdhGZ/SP5FHZVHS+1SGguFVswp+/P+ldda\nrjHX0PZfaUy2aFfwRSxmehgopDFPw3o+bfibsA0ACjuacqPSCVgFqoMP1OYnuALI\nouOtgnxYOPnnckTR4nFOgI0oY/eQr2iw1NBrY9YI3YCWOdE+dLR0NxQWYcv1W3sG\nc5Anbq7RPrWGibaMZHvohRbB2wCIbSXJZJdwb95ik4Hf3WQ9z5IpKkON8/yO2+SK\n0VI3w8wtAgMBAAECggEADS2l4d7ewmj8jBS1xmQk+/6KH6pVQlh3YI3E1O+HETHj\nIQABpOkVHEp2KRhPRaieP/HUckM+kthlgH3rvRX29IcyRzP0jfPBHFcOS8yxX52j\nphXs1lliGr97FmMuE1yOlQaRIdgw0Dktd+aGWIB+Np9dfBd6LY7F1YyXNqyYpeb+\nRmbRLOWJQ3nDvWuGC1P2xji5zolxEXYVeptC4ddxGRXC/NmnS4NjQMQ8qL328rId\nkFuifWH/wn/Vb7DJOvcaK9rht8+2twExs/6bWyNGgjBd6NO1KuWj3a5G+1lGXzRT\n7BnPjWpyviQf8aNOnFZwsi+M43qHO/SeEEzl73wNiwKBgQC4cXIK2M16tokq5xWQ\n1Wg1L77kFOraxmIgiUCn7hjxS0vK1bEAgdJsQ4oOnOrdVAsnrI56Qk8DPdBd0JnA\nYBjUFPwy8d/WmxLTB+ee46pf0RbVtztyAEDD7GNsN9HyJrU6po9BKb2eNUIMOahq\nq7uwWGXywCaB3nf+q1hu5NDrzwKBgQC39qaZ43BkDx9qbLciXe+sUcQLfksAGiXv\nvDOtyXhX9p+kSl/68BqLb+/o/lYn5wUWAv14zeWZ+//GNgk2vpAOo/rg08hEkO3N\nvC3MGKNDN0e5u7C/RN/EqXWubiGv27Wih7aEWCBl/LZgsvIXnpGjXTAuc/NCItvC\n8zp9ueTbQwKBgFEjJsX6xbm73u+OpIAIQUVUcacoRIBlUPl7J4Q4S6SqOPdLtgfB\nFG4n7+2pvfALbrTPRgYmcVe9s5HxmBF2tLVnXeKTYKKpqUhIa+4LvQFVm7P8XRwz\nXEpUDRCoJaVevc7FQrOpxw5340w5eQsj7PcQjBiTytzKnwLbIZX29qklAoGAQ429\njBEq+nNbM/eMIICiPIMiHJ5Z6EWx3KEd0RmEqbiU0v3E1R9KgB2w2bxb4vdAtN6Q\nOcZSJAOX3y+EnqfHuriYrerXReZ6jOwnXSVG/q3UFu5Hb1VZXpxj7JPgpvVlc7Om\nYF8ENq9gQY40vFusW3Mi+Ev37jdiv+oVdonG8oUCgYBn0oECJrFUtBlyUKiA0vMq\npEn7CV3I809rOjNvyL7F6w1qwkpQtdsnZU2hRvrwyOpCovQG7nP7StEs10eMunlW\n//D62fvRgF5Q1wh+vyS32z5u/aWDMGnkuyUMksGLXWknIAtK6wE8BUs/xydIvq0l\njxxywEnZBm06za1vrjrv4A==\n-----END PRIVATE KEY-----\n",
  clientEmail:
    "firebase-adminsdk-g4x7x@salessystem-659c6.iam.gserviceaccount.com",
  
};

const firebaseConfig = {
  apiKey: "AIzaSyDIKzT2bn4MzVPAoi6vAPJr5ty4n2GgtJQ",
  authDomain: "salessystem-659c6.firebaseapp.com",
  projectId: "salessystem-659c6",
  storageBucket: "salessystem-659c6.appspot.com",
  messagingSenderId: "402827702936",
  appId: "1:402827702936:web:bcee0d74934dc1cc6016ed",
};

initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});
export const db = getFirestore();

//Rotas de Transações

router.post("/home/modeltransaction", validateToken, addModelTransaction);

router.post("/home/transaction", validateToken, addTransaction);

router.get(
  "/home/transaction/:user/:token/:initialdate/:finaldate/:authorizedDatabase", validateToken,
  getTransaction
);

router.get(
  "/home/modeltransaction/:user/:token/:authorizedDatabase", validateToken,
  getModelTransaction
);

router.delete("/home/transaction", validateToken, deleteTransaction);

router.delete("/home/modeltransaction", validateToken, deleteModelTransaction);

//Rotas de autorizações

router.post("/home/auth", validateToken, addAuthorizedUser);

router.get("/home/auth/:user/:token", validateToken, lisAllAuthorizedUser);

router.delete("/home/auth", validateToken, removeAuthorizedUser);

router.get(
  "/home/auth/:user/:token/:usertoconfirm", validateToken,
  checkAuthorizationInUserList
);

//Rotas para banco de dado autorizado(CRUD)

router.post("/home/authaccess", validateToken, addAccessDatabase);

router.get("/home/authaccess/:user/:token", fetchAccessDatabase);

router.patch("/home/authaccess", validateToken, changeAccessDatabase);

router.delete("/home/authaccess", validateToken, removeAccessDatabase);

export default router;

