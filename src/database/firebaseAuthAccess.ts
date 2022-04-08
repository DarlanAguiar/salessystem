import { AccessDatabase } from '../types/users';
import { URL, headers } from './firebase';

export const saveDatabaseIWantToAccess = async (
  userIWantToAccess: string,
  user: string | null | undefined,
  token: string | undefined
) => {
  try {
    await fetch(`${URL}authaccess`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ userIWantToAccess, user, token })
    });
  } catch (error) {
    return new Error(
      'Problemas no servidor ao salvar um banco de dados autorizado, reinicie a aplicação ou tente novamente.'
    );
  }
};

export const fetchAccessDatabase = async (
  user: string | null | undefined,
  token: string | undefined
): Promise<AccessDatabase | Error> => {
  let accessDatabase: AccessDatabase = {
    id: '',
    nameDatabase: ''
  };

  try {
    const resp = await fetch(`${URL}authaccess/${user}/${token}`, {
      method: 'GET',
      headers: headers
    });
    accessDatabase = await resp.json();
  } catch (error) {
    return new Error(
      'Problemas no servidor ao buscar um banco de dados autorizado.'
    );
  }
  return accessDatabase;
};

export const updateDatabaseIWantToAccess = async (
  databaseIWantToAccess: string,
  idDatabaseAuth: string,
  user: string | null | undefined,
  token: string | undefined
) => {
  let message = {};

  await fetch(`${URL}authaccess`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      databaseIWantToAccess,
      idDatabaseAuth,
      user,
      token
    })
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        message = { error: resp.error };
      }
    });
  return message;
};

export const deleteAccessToCurrentDatabase = async (
  id: string,
  user: string | null | undefined,
  token: string | undefined
) => {
  let message = {};

  await fetch(`${URL}authaccess`, {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify({ id, user, token })
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        message = { error: resp.error };
      }
    });

  return message;
};
