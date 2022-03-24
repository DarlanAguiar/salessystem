import { Request, Response } from "express";
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const {
  collection,
  getDocs,
  query,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  where,
} = require("firebase/firestore");

const router = require("express").Router();

const firebaseConfig = {
  apiKey: "AIzaSyDIKzT2bn4MzVPAoi6vAPJr5ty4n2GgtJQ",
  authDomain: "salessystem-659c6.firebaseapp.com",
  projectId: "salessystem-659c6",
  storageBucket: "salessystem-659c6.appspot.com",
  messagingSenderId: "402827702936",
  appId: "1:402827702936:web:bcee0d74934dc1cc6016ed",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const admin = require("firebase-admin");
const serviceAccount = require("../salessystem-credential-firebase-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const { getAuth } = require("firebase-admin/auth");

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

const validateToken = async (userDB: string, token: string) => {
  let validToken = true;
  await getAuth()
    .verifyIdToken(token)
    .then((decodedToken: any) => {
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
  const { data, user, token } = req.body;
  const validated = await validateToken(user, token);

  if (validated) {
    try {
      await addDoc(collection(db, `${user}.transaction`), data);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(201).json({ message: "Iserido com sucesso" });
    } catch (err) {
      res.status(500).json({ error: "Erro interno do servidor (POST)" });
      console.error(err);
    }
  } else {
    res.status(500).json({ error: "Token de usuario invalido" });
  }
});

router.post("/home/transaction", async (req: Request, res: Response) => {
  const { data, user, token } = req.body;
  const validated = await validateToken(user, token);

  data.date = new Date(data.date);

  if (validated) {
    try {
      await addDoc(collection(db, user), data);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(201).json({ message: "Iserido com sucesso" });
    } catch (err) {
      res.status(500).json({ error: "Erro interno do servidor (POST)" });
      console.error(err);
    }
  } else {
    res.status(500).json({ error: "Token de usuario invalido" });
  }
});

router.get(
  "/home/transaction/:user/:token/:initialdate/:finaldate",
  async (req: Request, res: Response) => {
    const user = req.params.user;
    const token = req.params.token;
    const initialDate = new Date(req.params.initialdate);
    const finalDate = new Date(req.params.finaldate);

    const validated = await validateToken(user, token);

    console.log("chamou");

    let arrayData: DataTransaction[] = [];

    if (validated) {
      try {
        const data = await query(
          collection(db, user),
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

        res.status(200).json(arrayData);

        /* const result = await getDocs(query(collection(db, user)));
        //let arrayData: DataTransaction[] = [];

        result.docs.forEach((data: any) => {
          arrayData.push({
            id: data.id,
            amont: data.data().amont,
            category: data.data().category,
            date: new Date(data.data().date.seconds * 1000),
            expense: data.data().expense,
            price: data.data().price,
            product: data.data().product,
            unity: data.data().unity,
          });
        }); */

        //res.status(200).json(arrayData);
      } catch (err) {
        console.error("Erro do serverRoutes: ", err);
        res.status(500).json({ error: "Erro interno do servidor (GET)" });
      }
    } else {
      res.status(500).json({ error: "Token de usuario invalido" });
    }
  }
);

router.get(
  "/home/modeltransaction/:user/:token",
  async (req: Request, res: Response) => {
    const user = req.params.user;
    const token = req.params.token;
    const validated = await validateToken(user, token);

    if (validated) {
      try {
        const result = await getDocs(
          query(collection(db, `${user}.transaction`))
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

        res.status(200).json(arrayData);
      } catch (err) {
        console.error("Erro do serverRoutes: ", err);
        res.status(500).json({ error: "Erro interno do servidor (GET)" });
      }
    } else {
      res.status(500).json({ error: "Token de usuario invalido" });
    }
  }
);

router.delete("/home/transaction", async (req: Request, res: Response) => {
  const { id, user, token } = req.body;
  const validated = await validateToken(user, token);

  if (validated) {
    try {
      await deleteDoc(doc(db, user, id));
      res.status(200).json({ message: "Deletado com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro interno do servidor (DELETE)" });
    }
  } else {
    res.status(500).json({ error: "Token de usuario invalido" });
  }
});

router.delete("/home/modeltransaction", async (req: Request, res: Response) => {
  const { id, user, token } = req.body;
  const validated = await validateToken(user, token);

  if (validated) {
    try {
      await deleteDoc(doc(db, `${user}.transaction`, id));
      res.status(200).json({ message: "Deletado com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro interno do servidor (DELETE)" });
    }
  } else {
    res.status(500).json({ error: "Token de usuario invalido" });
  }
});

//rotas para autorizações
///////////////////////////////////////////////////
router.post("/home/auth", async (req: Request, res: Response) => {
  const { userAuthorized, user, token } = req.body;
  const validated = await validateToken(user, token);

  const userValid = { user: userAuthorized };

  if (validated) {
    try {
      await addDoc(collection(db, `${user}.auth`), userValid);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(201).json({ message: "Iserido com sucesso" });
    } catch (err) {
      res
        .status(500)
        .json({
          error:
            "Erro interno do servidor (POST), postando um usuario autorizado.",
        });
      console.error(err);
    }
  } else {
    res.status(500).json({ error: "Token de usuario invalido" });
  }
});

router.get("/home/auth/:user/:token", async (req: Request, res: Response) => {
  const user = req.params.user;
  const token = req.params.token;
  const validated = await validateToken(user, token);

  if (validated) {
    try {
      const result = await getDocs(query(collection(db, `${user}.auth`)));
      let arrayData: DataUserAuthorized[] = [];

      result.docs.forEach((data: any) => {
        arrayData.push({
          id: data.id,
          user: data.data().user,
        });
      });

      res.status(200).json(arrayData);
    } catch (err) {
      console.error("Erro do serverRoutes: ", err);
      res
        .status(500)
        .json({ error: "Erro interno do servidor (GET), buscando usuario" });
    }
  } else {
    res.status(500).json({ error: "Token de usuario invalido" });
  }
});

router.delete("/home/auth", async (req: Request, res: Response) => {
  const { id, user, token } = req.body;

  const validated = await validateToken(user, token);

  if (validated) {
    try {
      await deleteDoc(doc(db, `${user}.auth`, id));
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (err) {
      console.error(err);

      res.status(500).json({ error: "Erro do seridor (Deletar usuário)" });
    }
  } else {
    res.status(500).json({ error: "Token de usuario invalido" });
  }
});



export default router;
