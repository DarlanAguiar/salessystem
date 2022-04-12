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

  const authorizations = {
    user: userAuthorized,
    allowedDatabase: user
  };

  try {
    await addDoc(collection(db, `${user}.auth`), userValid);
    setResponseHeader(res);

    await addDoc(collection(db, 'invitations'), invitationCard);
    setResponseHeader(res);

    await addDoc(collection(db, 'accessPermissions'), authorizations);
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
    const querySnapshotInvitations = await getDocs(dbRefInvitations);
    querySnapshotInvitations.forEach(async (docInvitations) => {
      await deleteDoc(doc(db, 'invitations', docInvitations.id));
    });

    const accessPermissions = collection(db, 'accessPermissions');
    const RefaccessPermissions = query(accessPermissions, where('user', '==', userToRemove), where('allowedDatabase', '==', user));
    const querySnapshotPermission = await getDocs(RefaccessPermissions);
    querySnapshotPermission.forEach(async (docPermissions) => {
      await deleteDoc(doc(db, 'accessPermissions', docPermissions.id));
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
    const listInvitations: Array<string | undefined> = [];

    result.docs.forEach((data: QueryDocumentSnapshot) => {
      const typedData: {guestUser?: string, userSentInvitation?: string} = data.data();
      if (typedData.guestUser === user) {
        listInvitations.push(typedData.userSentInvitation);
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

export const searchAuthorizedDatabase = async (
  req: Request,
  res: Response
) => {
  const user = req.params.user;

  try {
    const listAuthorizedDatabase: Array<string | undefined> = [];

    const result = collection(db, 'accessPermissions');
    const dbRefPermission = query(result, where('user', '==', user));
    const querySnapshot = await getDocs(dbRefPermission);

    querySnapshot.forEach(async (data: QueryDocumentSnapshot) => {
      const typedData: {allowedDatabase?: string} = data.data();
      listAuthorizedDatabase.push(typedData.allowedDatabase);
    });

    // const result = await getDocs(
    //   query(collection(db, 'invitations'))
    // );
    // const listAuthorizedDatabase: Array<string | undefined> = [];

    // result.docs.forEach((data: QueryDocumentSnapshot) => {
    //   const typedData: {user?: string, allowedDatabase?: string} = data.data();
    //   if (typedData.user === user) {
    //     listAuthorizedDatabase.push(typedData.userSentInvitation);
    //   }
    // });

    return res.status(StatusCodes.OK).json(listAuthorizedDatabase);
  } catch (err) {
    console.error('Erro do serverRoutes: ', err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro interno do servidor (GET), buscando usuario' });
  }
};
