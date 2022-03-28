import { initializeApp } from "firebase/app";
import { Item, ItemDataBase } from "../types/Item";
import { Product, ProductDatabase } from "../types/Product";

const firebaseConfig = {
  apiKey: "AIzaSyDIKzT2bn4MzVPAoi6vAPJr5ty4n2GgtJQ",
  authDomain: "salessystem-659c6.firebaseapp.com",
  projectId: "salessystem-659c6",
  storageBucket: "salessystem-659c6.appspot.com",
  messagingSenderId: "402827702936",
  appId: "1:402827702936:web:bcee0d74934dc1cc6016ed",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const URL = "/home/";

export const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
}

export const insertTransactionModelIntoDatabase = async (
  data: Product,
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string |null,
) => {
  let message = {};

  await fetch(`${URL}modeltransaction`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ data, user, token, authorizedDatabase }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        message = { error: resp.error };
      }
    });
  return message;
};

export const insertTransactionIntoDatabase = async (
  data: Item,
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string |null
) => {
  
  let message = {};

  await fetch(`${URL}transaction`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ data, user, token, authorizedDatabase }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        message = { error: resp.error };
      }
    });
  return message;
};

export const getTransactionList = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null,
  initialDate: string,
  finalDate: string
) => {
  let data: ItemDataBase[] = [];

  await fetch(
    `${URL}transaction/${user}/${token}/${initialDate}/${finalDate}/${authorizedDatabase}`,
    {
      method: "GET",
      headers: headers,
    }
  )
    .then((resp) => {
      const parsedResp = resp.json();

      return parsedResp;
    })
    .then((resp) => (data = resp))
    .catch((err) => {
      throw new Error("Problemas no servidor GET");
    });

  return data;
};

export const getModelTransactionList = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null
) => {
  let data: ProductDatabase[] = [];

  await fetch(`${URL}modeltransaction/${user}/${token}/${authorizedDatabase}`, {
    method: "GET",
    headers: headers,
  })
    .then((resp) => {
      const parsedResp = resp.json();

      return parsedResp;
    })
    .then((resp) => (data = resp))
    .catch((err) => {
      throw new Error("Problemas no servidor GET");
    });

  return data;
};

export const deleteTransactionDatabase = async (
  id: string,
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null
) => {
  let message = {};

  await fetch(`${URL}transaction`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify({ id, user, token, authorizedDatabase }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        message = { error: resp.error };
      }
    });
  return message;
};

export const deleteModelDatabase = async (
  id: string,
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null
) => {
  let message = {};

  await fetch(`${URL}modeltransaction`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify({ id, user, token, authorizedDatabase }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        message = { error: resp.error };
      }
    });
  return message;
};
