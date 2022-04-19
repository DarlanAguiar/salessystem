import { initializeApp } from 'firebase/app';
import { Item, ItemDataBase } from '../types/Item';
import { Product, ProductDatabase } from '../types/Product';

const firebaseConfig = {
  apiKey: 'AIzaSyDIKzT2bn4MzVPAoi6vAPJr5ty4n2GgtJQ',
  authDomain: 'salessystem-659c6.firebaseapp.com',
  projectId: 'salessystem-659c6',
  storageBucket: 'salessystem-659c6.appspot.com',
  messagingSenderId: '402827702936',
  appId: '1:402827702936:web:bcee0d74934dc1cc6016ed'
};

export const firebaseApp = initializeApp(firebaseConfig);

export const URL = '/home/';

export const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

export const insertTransactionModelIntoDatabase = async (
  data: Product,
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null | undefined
) => {
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}modeltransaction`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ data, user, token, authorizedDatabase })
    });
    if (!resp.ok) {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(err.message);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }
};

export const insertTransactionIntoDatabase = async (
  data: Item,
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null | undefined
) => {
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}transaction`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ data, user, token, authorizedDatabase })
    });

    if (!resp.ok) {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(err.message);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }
};

export const getTransactionList = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null | undefined,
  initialDate: number,
  finalDate: number
) => {
  let data: ItemDataBase[] = [];
  let errorMessage = '';

  try {
    const resp = await fetch(
      `${URL}transaction/${user}/${token}/${initialDate}/${finalDate}/${authorizedDatabase}`,
      {
        method: 'GET',
        headers: headers
      }
    );
    if (resp.ok) {
      data = await resp.json();
    } else {
      const err = await resp.json();
      errorMessage = err.message;
      console.log(errorMessage);

      throw new Error(err.message);
    };
  } catch (error) {
    throw new Error(errorMessage);
  }

  return data;
};

export const getModelTransactionList = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null | undefined
) => {
  let data: ProductDatabase[] = [];
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}modeltransaction/${user}/${token}/${authorizedDatabase}`, {
      method: 'GET',
      headers: headers
    });
    console.log(resp);

    if (resp.ok) {
      data = await resp.json();
    } else {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(err.message);
    };
  } catch (error) {
    throw new Error(errorMessage);
  }

  return data;
};

export const deleteTransactionDatabase = async (
  id: string,
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null | undefined
) => {
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}transaction`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ id, user, token, authorizedDatabase })
    });
    if (!resp.ok) {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(err.message);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }
};

export const deleteModelDatabase = async (
  id: string,
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null | undefined
) => {
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}modeltransaction`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ id, user, token, authorizedDatabase })
    });
    if (!resp.ok) {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(err.message);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }
};
