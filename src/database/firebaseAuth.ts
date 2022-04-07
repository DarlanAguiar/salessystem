import { Authorized, UserAuth } from '../types/users';
import { URL, headers } from './firebase';

export const insertAuthorizedUser = async (
  userAuthorized: string,
  user: string | null | undefined,
  token: string | undefined
) => {
  let message = {};

  await fetch(`${URL}auth`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ userAuthorized, user, token })
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        message = { error: resp.error };
      }
    });

  return message;
};

export const deleteUserAuthorized = async (
  id: string,
  user: string | null | undefined,
  token: string | undefined,
  userToRemove: string
) => {
  let message = {};

  await fetch(`${URL}auth`, {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify({ id, user, token, userToRemove })
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        message = { error: resp.error };
      }
    });

  return message;
};

export const getAllAllowedUsers = async (
  user: string | null | undefined,
  token: string | undefined
) => {
  let data: UserAuth[] = [];

  await fetch(`${URL}auth/${user}/${token}`, {
    method: 'GET',
    headers: headers
  })
    .then((resp) => resp.json())
    .then((resp) => (data = resp))
    .catch(() => {
      throw new Error('Problemas no servidor GET, buscando usuario');
    });

  return data;
};

export const confirmAuthorization = async (
  user: string | null | undefined,
  token: string | undefined,
  userToConfirm: string | null
) => {
  let authorization: Authorized = {
    authorized: false
  };

  await fetch(`${URL}auth/${user}/${token}/${userToConfirm}`, {
    method: 'GET',
    headers: headers
  })
    .then((resp) => resp.json())
    .then((resp) => {
      authorization = resp;
    })
    .catch(() => {
      throw new Error('Problemas no servidor GET, confirmando autorizção');
    });

  return authorization;
};

export const checkInvitationDatabase = async (
  user: string | null | undefined,
  token: string | undefined
) => {
  let invitations = [];

  try {
    const resp = await fetch(`${URL}invitation/${user}/${token}`);
    const result = await resp.json(); // as type
    invitations = result;
  } catch (error) {
    throw new Error('Problemas no servidor GET, buscando convites');
  }

  return invitations;
};

export const removeInvitation = async (
  user: string | null | undefined,
  token: string | undefined
) => {
  let message = {};

  await fetch(`${URL}invitation`, {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify({ user, token })
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        message = { error: resp.error };
      }
    });

  return message;
};
