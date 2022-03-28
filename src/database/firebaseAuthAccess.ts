import { AccessDatabase, Authorized, UserAuth } from "../types/users";
import { URL } from "./firebase";

export const saveDatabaseIWantToAccess = async (
  userIWantToAccess: string,
  user: string | null | undefined,
  token: string | undefined
) => {
  let message = {};

  await fetch(`${URL}authaccess`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-allow-Origin": "*",
    },
    body: JSON.stringify({ userIWantToAccess, user, token }),
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
    id: "",
    nameDatabase: "",
  };

  await fetch(`${URL}authaccess/${user}/${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((resp) => resp.json())
    .then((resp) => {
      accessDatabase = resp;
    })
    .catch((err) => {
      throw new Error(
        "Problemas no servidor GET, buscando banco de dado autorizado"
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
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      databaseIWantToAccess,
      idDatabaseAuth,
      user,
      token,
    }),
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
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ id, user, token }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        message = { error: resp.error };
      }
    });

  return message;
};
