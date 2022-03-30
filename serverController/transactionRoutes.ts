import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  collection,
  getDocs,
  query,
  doc,
  addDoc,
  deleteDoc,
  where,
} from "firebase/firestore";

import { DataTransaction, DataModelTransaction } from "./types/typesRoutes";

import { db } from "../server/routes";
import { setResponseHeader } from "./helpers/responseHeader";

export const addModelTransaction = async (req: Request, res: Response) => {
  const { data, user, authorizedDatabase } = req.body;
  let referredDatabase = user;

  if (authorizedDatabase !== null) {
    referredDatabase = authorizedDatabase;
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
};

export const addTransaction = async (req: Request, res: Response) => {
  const { data, user, authorizedDatabase } = req.body;
  let referredDatabase = user;

  if (authorizedDatabase !== null) {
    referredDatabase = authorizedDatabase;
  }

  data.date = new Date(data.date);

  try {
    await addDoc(collection(db, referredDatabase), data);
    setResponseHeader(res);
    res.status(StatusCodes.CREATED).json({ message: "Iserido com sucesso" });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro interno do servidor (POST)" });
    console.error(err);
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  const user = req.params.user;
  const authorizedDatabase = req.params.authorizedDatabase;
  const initialDate = new Date(Number(req.params.initialdate));
  const finalDate = new Date(Number(req.params.finaldate));
  let referredDatabase = user;

  if (authorizedDatabase !== "null") {
    referredDatabase = authorizedDatabase;
  }

  let arrayData: DataTransaction[] = [];

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
};

export const getModelTransaction = async (req: Request, res: Response) => {
  const user = req.params.user;
  const authorizedDatabase = req.params.authorizedDatabase;
  let referredDatabase = user;

  if (authorizedDatabase !== "null") {
    referredDatabase = authorizedDatabase;
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
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { id, user, authorizedDatabase } = req.body;
  let referredDatabase = user;

  if (authorizedDatabase !== null) {
    referredDatabase = authorizedDatabase;
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
};

export const deleteModelTransaction = async (req: Request, res: Response) => {
  const { id, user, authorizedDatabase } = req.body;
  let referredDatabase = user;

  if (authorizedDatabase !== null) {
    referredDatabase = authorizedDatabase;
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
};
