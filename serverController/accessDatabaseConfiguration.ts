import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  collection,
  getDocs,
  query,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../server/routes";

export const addAccessDatabase = async (req: Request, res: Response) => {
  const { userIWantToAccess, user } = req.body;
  const databaseValid = { accessDatabase: userIWantToAccess };

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
};

export const fetchAccessDatabase = async (req: Request, res: Response) => {
  const user = req.params.user;

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
};

export const changeAccessDatabase = async (req: Request, res: Response) => {
  const { databaseIWantToAccess, idDatabaseAuth, user } = req.body;
  const id = idDatabaseAuth;
  const databaseValid = { accessDatabase: databaseIWantToAccess };

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
};

export const removeAccessDatabase = async (req: Request, res: Response) => {
  const { id, user } = req.body;

  try {
    await deleteDoc(doc(db, `${user}.access.database`, id));
    res.status(StatusCodes.OK).json({ message: "Deletado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Erro interno do servidor (deletar acesso ao banco de dados)",
    });
  }
};
