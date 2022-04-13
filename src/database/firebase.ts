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
  authorizedDatabase: string | null
) => {
  try {
    await fetch(`${URL}modeltransaction`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ data, user, token, authorizedDatabase })
    });
  } catch (error) {
    throw new Error('Erro ao inserir os dados, reinicie a aplicação ou tente novamente.');
  }
};
export const insertTransactionIntoDatabase = async (
  data: Item,
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null
) => {
  try {
    await fetch(`${URL}transaction`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ data, user, token, authorizedDatabase })
    });
  } catch (error) {
    throw new Error('Erro ao inserir os dados, reinicie a aplicação ou tente novamente.');
  };
};

export const getTransactionList = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null,
  initialDate: number,
  finalDate: number
) => {
  let data: ItemDataBase[] = [];

  try {
    const resp = await fetch(
      `${URL}transaction/${user}/${token}/${initialDate}/${finalDate}/${authorizedDatabase}`,
      {
        method: 'GET',
        headers: headers
      }
    );
    data = await resp.json();
    console.log(data);
  } catch (error) {
    throw new Error('Erro ao buscar as transações(vendas/despesa), reinicie a aplicação ou tente novamente.');
  }

  return data;
};

export const getModelTransactionList = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null
) => {
  let data: ProductDatabase[] = [];

  try {
    const resp = await fetch(`${URL}modeltransaction/${user}/${token}/${authorizedDatabase}`, {
      method: 'GET',
      headers: headers
    });

    data = await resp.json();
  } catch (error) {
    throw new Error('Erro ao buscar as transações(modelos), reinicie a aplicação ou tente novamente.');
  }

  return data;
};

export const deleteTransactionDatabase = async (
  id: string,
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null
) => {
  try {
    await fetch(`${URL}transaction`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ id, user, token, authorizedDatabase })
    });
  } catch (error) {
    throw new Error('Erro ao deletar a transação(venda/despesa), reinicie a aplicação ou tente novamente.');
  }
};

export const deleteModelDatabase = async (
  id: string,
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null
) => {
  try {
    await fetch(`${URL}modeltransaction`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ id, user, token, authorizedDatabase })
    });
  } catch (error) {
    throw new Error('Erro ao deletar a transação(modelo), reinicie a aplicação ou tente novamente.');
  }
};
