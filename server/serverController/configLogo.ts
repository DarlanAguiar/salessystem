import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  collection,
  getDocs,
  query,
  doc,
  addDoc,
  updateDoc,
  QueryDocumentSnapshot
} from 'firebase/firestore';

import { ref, listAll, getDownloadURL } from 'firebase/storage';

import { db, storage } from '../routes';

import { setResponseHeader } from './helpers/responseHeader';
import { Photo } from './types/logo';

export const fetchFoto = async (req: Request, res: Response) => {
  const referredDatabase = req.params.authorizedDatabase;

  try {
    let photo: Photo | null = null;
    const imageFolder = ref(storage, referredDatabase);
    const photoDetail = await listAll(imageFolder);

    for (const i in photoDetail.items) {
      const photoUrl = await getDownloadURL(photoDetail.items[i]);
      photo = {
        url: photoUrl
      };
    }
    setResponseHeader(res);
    res.status(StatusCodes.CREATED).json(photo);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Erro interno do servidor ao buscar logo.'
    });
    console.error(err);
  }
};

export const setTitlesToLogo = async (req: Request, res: Response) => {
  const { authorizedDatabase, texts } = req.body;
  const referredDatabase = authorizedDatabase;

  try {
    await addDoc(collection(db, `${referredDatabase}.settings`), texts);
    setResponseHeader(res);
    res.status(StatusCodes.CREATED).json({ message: 'Inserido o nome da empesa com sucesso' });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro interno do servidor (POST),  inserindo nome na logo' });
    console.error(err);
  }
};

export const getTitlesToLogo = async (req: Request, res: Response) => {
  const authorizedDatabase = req.params.authorizedDatabase;
  const referredDatabase = authorizedDatabase;

  try {
    const result = await getDocs(
      query(collection(db, `${referredDatabase}.settings`))
    );
    let titles = {};

    result.docs.forEach((data: QueryDocumentSnapshot) => {
      titles = {
        id: data.id,
        textLeft: data.data().textLeft,
        textRight: data.data().textRight
      };
    });

    res.status(StatusCodes.OK).json(titles);
  } catch (err) {
    console.error('Erro do serverRoutes: ', err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro interno do servidor (GET),  buscando nome da empresa' });
  }
};

export const updateTitlesToLogo = async (req: Request, res: Response) => {
  const { authorizedDatabase, idTexts, texts } = req.body;

  const referredDatabase = authorizedDatabase;

  try {
    await updateDoc(doc(db, `${referredDatabase}.settings`, idTexts), texts);
    res
      .status(StatusCodes.OK)
      .json({ message: 'Atualizado o nome da empresa' });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:
      'Problemas no servidor ao atualizar nome da empresa, reinicie a aplicação ou tente novamente.'
    });
  }
};
