import { AccessDatabase } from '../types/users';
import { URL, headers } from './firebase';

export const saveDatabaseIWantToAccess = async (
  userIWantToAccess: string,
  user: string | null | undefined,
  token: string | undefined
) => {
  let errorMessage = '';
  try {
    const resp = await fetch(`${URL}authaccess`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ userIWantToAccess, user, token })
    });
    if (!resp.ok) {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }
};

export const fetchAccessDatabase = async (
  user: string | null | undefined,
  token: string | undefined
): Promise<AccessDatabase> => {
  let accessDatabase: AccessDatabase = {
    id: '',
    nameDatabase: ''
  };
  let errorMessage = '';
  try {
    const resp = await fetch(`${URL}authaccess/${user}/${token}`, {
      method: 'GET',
      headers: headers
    });
    if (resp.ok) {
      accessDatabase = await resp.json();
    } else {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }

  return accessDatabase;
};

export const updateDatabaseIWantToAccess = async (
  databaseIWantToAccess: string,
  idDatabaseAuth: string,
  user: string | null | undefined,
  token: string | undefined
) => {
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}authaccess`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        databaseIWantToAccess,
        idDatabaseAuth,
        user,
        token
      })
    });
    if (!resp.ok) {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }
};

export const deleteAccessToCurrentDatabase = async (
  id: string,
  user: string | null | undefined,
  token: string | undefined
) => {
  let errorMessage = '';
  try {
    const resp = await fetch(`${URL}authaccess`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ id, user, token })
    });
    if (!resp.ok) {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }
};
