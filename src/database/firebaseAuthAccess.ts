import { AccessDatabase } from '../types/users';
import { URL, headers } from './firebase';

export const saveDatabaseIWantToAccess = async (
  userIWantToAccess: string,
  user: string | null | undefined,
  token: string | undefined
) => {
  let message = {};

  await fetch(`${URL}authaccess`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ userIWantToAccess, user, token })
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        message = { error: resp.error };
      }
    });

  return message;
};

export const fetchAccessDatabase = async (
  user: string | null | undefined,
  token: string | undefined
) => {
  let accessDatabase: AccessDatabase = {
    id: '',
    nameDatabase: ''
  };

  await fetch(`${URL}authaccess/${user}/${token}`, {
    method: 'GET',
    headers: headers
  })
    .then((resp) => resp.json())
    .then((resp) => {
      accessDatabase = resp;
    })
    .catch(() => {
      throw new Error(
        'Problemas no servidor GET, buscando banco de dado autorizado'
      );
    });

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

/*   const resp = await fetch(`${URL}authaccess`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ userIWantToAccess, user, token }),
  });
  if (resp.json().error) {
      message = { error: resp.error };
  }
  return message; */
