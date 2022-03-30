import { Request, Response, Router } from "express";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { StatusCodes } from "http-status-codes";

import {
  collection,
  getDocs,
  query,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import { DataUserAuthorized } from "./types/typesRoutes";

import { db } from "../server/routes";

export const addAuthorizedUser = async (req: Request, res: Response) => {
  const { userAuthorized, user } = req.body;
  const userValid = { user: userAuthorized };

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
};

export const lisAllAuthorizedUser = async (req: Request, res: Response) => {
  const user = req.params.user;

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
};

export const removeAuthorizedUser = async (req: Request, res: Response) => {
  const { id, user } = req.body;

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
};

export const checkAuthorizationInUserList = async (
  req: Request,
  res: Response
) => {
  const user = req.params.user;
  const usertoconfirm = req.params.usertoconfirm;

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
};
