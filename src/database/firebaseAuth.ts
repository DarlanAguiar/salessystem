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
    throw new Error('Erro ao enviar autorização, reinicie a aplicação ou tente novamente.');
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
    throw new Error('Erro ao remover autorização, reinicie a aplicação ou tente novamente.');
  }
};

export const getAllAllowedUsers = async (
  user: string | null | undefined,
  token: string | undefined
):Promise<UserAuth[]> => {
  let data: UserAuth[] = [];

  try {
    const resp = await fetch(`${URL}auth/${user}/${token}`, {
      method: 'GET',
      headers: headers
    });

    data = await resp.json();
  } catch (error) {
    throw new Error('Erro ao buscar lista de usuários autorizados, reinicie a aplicação ou tente novamente.');
  }

  return data;
};

export const confirmAuthorization = async (
  user: string | null | undefined,
  token: string | undefined,
  userToConfirm: string | null
): Promise<Authorized> => {
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
    throw new Error('Erro ao confirmar autorizção, reinicie a aplicação ou tente novamente.');
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
    invitations = await resp.json();
  } catch (error) {
    throw new Error('Problemas no servidor GET, buscando convites');
  }

  return invitations;
};

export const removeInvitation = async (
  user: string | null | undefined,
  token: string | undefined
) => {
  try {
    await fetch(`${URL}invitation`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ user, token })
    });
  } catch (error) {
    throw new Error('Erro ao remover convites, reinicie a aplicação');
  }
};

export const checkAuthorizedDatabase = async (
  user: string | null | undefined,
  token: string | undefined
) => {
  let authorizedDatabase = [];

  try {
    const resp = await fetch(`${URL}alloweddb/${user}/${token}`);
    authorizedDatabase = await resp.json();
  } catch (error) {
    throw new Error('Problemas no servidor GET, buscando banco de dados autorizado');
  }

  return authorizedDatabase;
};
