import { Request, Response, Router } from "express";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { StatusCodes } from "http-status-codes";

import { credentials } from "../salessystem-credential-firebase-admin";

import admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  where,
} from "firebase/firestore";

const router = Router();

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
const db = getFirestore();

type DataTransaction = {
  id: string;
  date: Date;
  category: string;
  product: string;
  unity: boolean;
  amont: number;
  price: number;
  expense: boolean;
};

type DataModelTransaction = {
  category: string;
  name: string;
  unity: boolean;
  price: number;
  expense: boolean;
  id: string;
};

type DataUserAuthorized = {
  id: string;
  user: string;
};

type AccessDatabase = {
  id: string;
  accessDatabase: string;
};

const validateToken = async (userDB: string, token: string) => {
  let validToken = true;
  await getAuth()
    .verifyIdToken(token)
    .then((decodedToken: DecodedIdToken) => {
      const uid = decodedToken;
      if (uid.email !== userDB) {
        validToken = false;
      }
    })
    .catch((error: object) => {
      validToken = false;
      console.error(error);
    });

  return validToken;
};

router.post("/home/modeltransaction", async (req: Request, res: Response) => {
  const { data, user, token, authorizedDatabase } = req.body;
  let referredDatabase = user;
  const validated = await validateToken(user, token);

  if (authorizedDatabase !== null) {
    referredDatabase = authorizedDatabase;
  }

  if (!validated) {
    res
      .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
      .json({ error: "Token de usuario invalido" });
    return;
  }

  try {
    await addDoc(collection(db, `${referredDatabase}.transaction`), data);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(StatusCodes.OK).json({ message: "Iserido com sucesso" });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro interno do servidor (POST)" });
    console.error(err);
  }
});

router.post("/home/transaction", async (req: Request, res: Response) => {
  const { data, user, token, authorizedDatabase } = req.body;
  const validated = await validateToken(user, token);
  let referredDatabase = user;

  if (authorizedDatabase !== null) {
    referredDatabase = authorizedDatabase;
  }

  data.date = new Date(data.date);

  if (!validated) {
    res
      .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
      .json({ error: "Token de usuario invalido" });
    return;
  }

  try {
    await addDoc(collection(db, referredDatabase), data);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(StatusCodes.CREATED).json({ message: "Iserido com sucesso" });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro interno do servidor (POST)" });
    console.error(err);
  }
});

router.get(
  "/home/transaction/:user/:token/:initialdate/:finaldate/:authorizedDatabase",
  async (req: Request, res: Response) => {
    const user = req.params.user;
    const token = req.params.token;
    const authorizedDatabase = req.params.authorizedDatabase;
    const initialDate = new Date(req.params.initialdate);
    const finalDate = new Date(req.params.finaldate);
    let referredDatabase = user;
    const validated = await validateToken(user, token);

    if (authorizedDatabase !== "null") {
      referredDatabase = authorizedDatabase;
    }

    let arrayData: DataTransaction[] = [];

    if (!validated) {
      res
        .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
        .json({ error: "Token de usuario invalido" });
      return;
    }

    try {
      const data = await query(
        collection(db, referredDatabase),
        where("date", ">", new Date(initialDate)),
        where("date", "<", new Date(finalDate))
      );

      const querySnapshot = await getDocs(data);
      querySnapshot.forEach((doc: any) => {
        arrayData.push({
          id: doc.id,
          amont: doc.data().amont,
          category: doc.data().category,
          date: new Date(doc.data().date.seconds * 1000),
          expense: doc.data().expense,
          price: doc.data().price,
          product: doc.data().product,
          unity: doc.data().unity,
        });
      });

      res.status(StatusCodes.OK).json(arrayData);
    } catch (err) {
      console.error("Erro do serverRoutes: ", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro interno do servidor (GET)" });
    }
  }
);

router.get(
  "/home/modeltransaction/:user/:token/:authorizedDatabase",
  async (req: Request, res: Response) => {
    const user = req.params.user;
    const token = req.params.token;
    const authorizedDatabase = req.params.authorizedDatabase;
    let referredDatabase = user;
    const validated = await validateToken(user, token);

    if (authorizedDatabase !== "null") {
      referredDatabase = authorizedDatabase;
    }

    if (!validated) {
      res
        .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
        .json({ error: "Token de usuario invalido" });
      return;
    }

    try {
      const result = await getDocs(
        query(collection(db, `${referredDatabase}.transaction`))
      );
      let arrayData: DataModelTransaction[] = [];

      result.docs.forEach((data: any) => {
        arrayData.push({
          id: data.id,
          name: data.data().name,
          unity: data.data().unity,
          price: data.data().price,
          expense: data.data().expense,
          category: data.data().category,
        });
      });

      res.status(StatusCodes.OK).json(arrayData);
    } catch (err) {
      console.error("Erro do serverRoutes: ", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro interno do servidor (GET)" });
    }
  }
);

router.delete("/home/transaction", async (req: Request, res: Response) => {
  const { id, user, token, authorizedDatabase } = req.body;
  const validated = await validateToken(user, token);
  let referredDatabase = user;

  if (authorizedDatabase !== null) {
    referredDatabase = authorizedDatabase;
  }

  if (!validated) {
    res
      .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
      .json({ error: "Token de usuario invalido" });
    return;
  }
  try {
    await deleteDoc(doc(db, referredDatabase, id));
    res.status(StatusCodes.OK).json({ message: "Deletado com sucesso" });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro interno do servidor (DELETE)" });
  }
});

router.delete("/home/modeltransaction", async (req: Request, res: Response) => {
  const { id, user, token, authorizedDatabase } = req.body;
  const validated = await validateToken(user, token);
  let referredDatabase = user;

  if (authorizedDatabase !== null) {
    referredDatabase = authorizedDatabase;
  }
  if (!validated) {
    res
      .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
      .json({ error: "Token de usuario invalido" });
    return;
  }

  try {
    await deleteDoc(doc(db, `${referredDatabase}.transaction`, id));
    res.status(StatusCodes.OK).json({ message: "Deletado com sucesso" });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro interno do servidor (DELETE)" });
  }
});

//rotas para autorizações
///////////////////////////////////////////////////
router.post("/home/auth", async (req: Request, res: Response) => {
  const { userAuthorized, user, token } = req.body;
  const validated = await validateToken(user, token);

  const userValid = { user: userAuthorized };

  if (!validated) {
    res
      .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
      .json({ error: "Token de usuario invalido" });
    return;
  }
  try {
    await addDoc(collection(db, `${user}.auth`), userValid);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(StatusCodes.CREATED).json({ message: "Iserido com sucesso" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Erro interno do servidor (POST), postando um usuario autorizado.",
    });
    console.error(err);
  }
});

router.get("/home/auth/:user/:token", async (req: Request, res: Response) => {
  const user = req.params.user;
  const token = req.params.token;
  const validated = await validateToken(user, token);

  if (!validated) {
    res
      .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
      .json({ error: "Token de usuario invalido" });
    return;
  }
  try {
    const result = await getDocs(query(collection(db, `${user}.auth`)));
    let arrayData: DataUserAuthorized[] = [];

    result.docs.forEach((data: any) => {
      arrayData.push({
        id: data.id,
        user: data.data().user,
      });
    });
    res.status(StatusCodes.OK).json(arrayData);
  } catch (err) {
    console.error("Erro do serverRoutes: ", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro interno do servidor (GET), buscando usuario" });
  }
});

router.delete("/home/auth", async (req: Request, res: Response) => {
  const { id, user, token } = req.body;

  const validated = await validateToken(user, token);

  if (!validated) {
    res
      .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
      .json({ error: "Token de usuario invalido" });
    return;
  }
  try {
    await deleteDoc(doc(db, `${user}.auth`, id));
    res
      .status(StatusCodes.OK)
      .json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro do seridor (Deletar usuário)" });
  }
});

router.get(
  "/home/auth/:user/:token/:usertoconfirm",
  async (req: Request, res: Response) => {
    const user = req.params.user;
    const token = req.params.token;
    const usertoconfirm = req.params.usertoconfirm;
    const validated = await validateToken(user, token);

    if (!validated) {
      res
        .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
        .json({ error: "Token de usuario invalido" });
      return;
    }
    try {
      const result = await getDocs(
        query(collection(db, `${usertoconfirm}.auth`))
      );
      let authorized = false;

      result.docs.forEach((data: any) => {
        if (data.data().user === user) {
          authorized = true;
        }
      });

      return res.status(StatusCodes.OK).json({ authorized: authorized });
    } catch (err) {
      console.error("Erro do serverRoutes: ", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro interno do servidor (GET), buscando usuario" });
    }
  }
);

//rotas para banco de dados autorizados
///////////////////////////////////////////////////
router.post("/home/authaccess", async (req: Request, res: Response) => {
  const { userIWantToAccess, user, token } = req.body;
  const validated = await validateToken(user, token);

  const databaseValid = { accessDatabase: userIWantToAccess };

  if (!validated) {
    res
      .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
      .json({ error: "Token de usuario invalido" });
    return;
  }

  try {
    await addDoc(collection(db, `${user}.access.database`), databaseValid);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(StatusCodes.CREATED).json({ message: "Iserido com sucesso" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Erro interno do servidor (POST), postando um usuario autorizado.",
    });
    console.error(err);
  }
});

router.get(
  "/home/authaccess/:user/:token",
  async (req: Request, res: Response) => {
    const user = req.params.user;
    const token = req.params.token;
    const validated = await validateToken(user, token);

    if (!validated) {
      res
        .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
        .json({ error: "Token de usuario invalido" });
      return;
    }

    try {
      const result = await getDocs(
        query(collection(db, `${user}.access.database`))
      );

      let databaseAuth = {};
      result.docs.forEach((data: any) => {
        databaseAuth = {
          id: data.id,
          nameDatabase: data.data().accessDatabase,
        };
      });

      return res.status(StatusCodes.OK).json(databaseAuth);
    } catch (err) {
      console.error("Erro do serverRoutes: ", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro interno do servidor (GET), buscando usuario" });
    }
  }
);

router.patch("/home/authaccess", async (req, res) => {
  const { databaseIWantToAccess, idDatabaseAuth, user, token } = req.body;
  const id = idDatabaseAuth;
  const databaseValid = { accessDatabase: databaseIWantToAccess };

  const validated = await validateToken(user, token);

  if (!validated) {
    res
      .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
      .json({ error: "Token de usuario invalido" });
    return;
  }

  try {
    await updateDoc(doc(db, `${user}.access.database`, id), databaseValid);
    res
      .status(StatusCodes.OK)
      .json({ message: "Atualizado o banco de dados que quero acessar" });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error:
        "Erro interno do servidor ( ao atualizar o banco de dados que quero acesso)",
    });
  }
});

router.delete("/home/authaccess", async (req: Request, res: Response) => {
  const { id, user, token } = req.body;
  const validated = await validateToken(user, token);

  if (!validated) {
    res
      .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
      .json({ error: "Token de usuario invalido" });
    return;
  }

  try {
    await deleteDoc(doc(db, `${user}.access.database`, id));
    res.status(StatusCodes.OK).json({ message: "Deletado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Erro interno do servidor (deletar acesso ao banco de dados)",
    });
  }
});

export default router;
