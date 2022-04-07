import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  collection,
  getDocs,
  query,
  doc,
  addDoc,
  deleteDoc,
  QueryDocumentSnapshot,
  where
} from 'firebase/firestore';

import { DataUserAuthorized } from './types/typesRoutes';

import { db } from '../routes';
import { setResponseHeader } from './helpers/responseHeader';

export const addAuthorizedUser = async (req: Request, res: Response) => {
  const { userAuthorized, user } = req.body;
  const userValid = { user: userAuthorized };

  const invitationCard = {
    guestUser: userAuthorized,
    userSentInvitation: user
  };

  try {
    await addDoc(collection(db, `${user}.auth`), userValid);
    setResponseHeader(res);

    await addDoc(collection(db, 'invitations'), invitationCard);
    setResponseHeader(res);

    res.status(StatusCodes.CREATED).json({ message: 'Iserido com sucesso' });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Erro interno do servidor (POST), postando um usuario autorizado.'
    });
    console.error(err);
  }
};

export const lisAllAuthorizedUser = async (req: Request, res: Response) => {
  const user = req.params.user;

  try {
    const result = await getDocs(query(collection(db, `${user}.auth`)));
    const arrayData: DataUserAuthorized[] = [];

    result.docs.forEach((data: QueryDocumentSnapshot) => {
      arrayData.push({
        id: data.id,
        user: data.data().user
      });
    });
    res.status(StatusCodes.OK).json(arrayData);
  } catch (err) {
    console.error('Erro do serverRoutes: ', err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro interno do servidor (GET), buscando usuario' });
  }
};

export const removeAuthorizedUser = async (req: Request, res: Response) => {
  const { id, user, userToRemove } = req.body;

  try {
    await deleteDoc(doc(db, `${user}.auth`, id));

    const invitations = collection(db, 'invitations');

    const dbRefInvitations = query(invitations, where('guestUser', '==', userToRemove), where('userSentInvitation', '==', user));

    const querySnapshot = await getDocs(dbRefInvitations);

    querySnapshot.forEach(async (docInvitations) => {
      await deleteDoc(doc(db, 'invitations', docInvitations.id));
    });

    res
      .status(StatusCodes.OK)
      .json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro do seridor (Deletar usuário)' });
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

    result.docs.forEach((data: QueryDocumentSnapshot) => {
      if (data.data().user === user) {
        authorized = true;
      }
    });

    return res.status(StatusCodes.OK).json({ authorized: authorized });
  } catch (err) {
    console.error('Erro do serverRoutes: ', err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro interno do servidor (GET), buscando usuario' });
  }
};

export const checkInvitation = async (
  req: Request,
  res: Response
) => {
  const user = req.params.user;

  try {
    const result = await getDocs(
      query(collection(db, 'invitations'))
    );
    const listInvitations = [];

    result.docs.forEach((data: QueryDocumentSnapshot) => {
      if (data.data().guestUser === user) {
        listInvitations.push(data.data().userSentInvitation);
      }
    });

    return res.status(StatusCodes.OK).json(listInvitations);
  } catch (err) {
    console.error('Erro do serverRoutes: ', err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro interno do servidor (GET), buscando usuario' });
  }
};

export const deleteInvitation = async (req: Request, res: Response) => {
  const { user } = req.body;

  try {
    // await deleteDoc(doc(db, `${user}.auth`, id));

    const invitations = collection(db, 'invitations');

    const dbRefInvitations = query(invitations, where('guestUser', '==', user));

    const querySnapshot = await getDocs(dbRefInvitations);

    querySnapshot.forEach(async (docInvitations) => {
      await deleteDoc(doc(db, 'invitations', docInvitations.id));
    });

    res
      .status(StatusCodes.OK)
      .json({ message: 'convites deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro do seridor (Deletar convites)' });
  }
};
