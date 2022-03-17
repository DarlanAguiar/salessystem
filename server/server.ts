//const routes = require("./routes");

const express = require("express");
const cors = require("cors");
const { resolve } = require("path");
///////////////////////////////////////////



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

const validateToken = async (userDB, token) => {
  let validToken = true;
  await getAuth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken;
      if (uid.email !== userDB) {
        validToken = false;
      }
    })
    .catch((error) => {
      validToken = false;
      console.error(error);
    });

  return validToken;
};





////////////////////////////////////////////
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(resolve(__dirname, "../build")));

//app.use("/", routes);
////////////////////////////////////////////////////////





app.post("/home/modeltransaction", async (req, res) => {
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

app.post("/home/transaction", async (req, res) => {
  const { data, user, token } = req.body;
  const validated = await validateToken(user, token);

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

app.get("/home/transaction/:user/:token", async (req, res) => {
  const user = req.params.user;
  const token = req.params.token;
  const validated = await validateToken(user, token);

  if (validated) {
    try {
      const result = await getDocs(query(collection(db, user)));
      let arrayData = [];

      result.docs.forEach((data) => {
        arrayData.push({
          id: data.id,
          amont: data.data().amont,
          category: data.data().category,
          date: data.data().date,
          expense: data.data().expense,
          price: data.data().price,
          product: data.data().product,
          unity: data.data().unity,
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
});

app.get("/home/modeltransaction/:user/:token", async (req, res) => {
  const user = req.params.user;
  const token = req.params.token;
  const validated = await validateToken(user, token);

  if (validated) {
    try {
      const result = await getDocs(
        query(collection(db, `${user}.transaction`))
      );
      let arrayData = [];

      result.docs.forEach((data) => {
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
});

app.delete("/home/transaction", async (req, res) => {
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

app.delete("/home/modeltransaction", async (req, res) => {
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



//////////////////////////////////////////////////////////////////







app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Servidor rodando");
});
