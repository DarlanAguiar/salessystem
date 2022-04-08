import { Authorized, UserAuth } from '../types/users';
import { URL, headers } from './firebase';

export const insertAuthorizedUser = async (
  userAuthorized: string,
  user: string | null | undefined,
  token: string | undefined
) => {
  try {
    await fetch(`${URL}auth`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ userAuthorized, user, token })
    });
  } catch (error) {
    return new Error('Erro ao enviar autorização, reinicie a aplicação ou tente novamente.');
  }
};

export const deleteUserAuthorized = async (
  id: string,
  user: string | null | undefined,
  token: string | undefined,
  userToRemove: string
) => {
  try {
    await fetch(`${URL}auth`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ id, user, token, userToRemove })
    });
  } catch (error) {
    return new Error('Erro ao remover autorização, reinicie a aplicação ou tente novamente.');
  }
};

export const getAllAllowedUsers = async (
  user: string | null | undefined,
  token: string | undefined
):Promise<UserAuth[] | Error> => {
  let data: UserAuth[] = [];

  try {
    const resp = await fetch(`${URL}auth/${user}/${token}`, {
      method: 'GET',
      headers: headers
    });

    data = await resp.json();
  } catch (error) {
    return new Error('Erro ao buscar lista de usuários autorizados, reinicie a aplicação ou tente novamente.');
  }

  return data;
};

export const confirmAuthorization = async (
  user: string | null | undefined,
  token: string | undefined,
  userToConfirm: string | null
): Promise<Authorized | Error> => {
  let authorization: Authorized = {
    authorized: false
  };

  try {
    const resp = await fetch(`${URL}auth/${user}/${token}/${userToConfirm}`, {
      method: 'GET',
      headers: headers
    });

    authorization = await resp.json();
  } catch (error) {
    return new Error('Problemas no servidor GET, confirmando autorizção');
  }

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
