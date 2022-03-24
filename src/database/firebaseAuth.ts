import { UserAuth } from "../types/users";
import { URL } from "./firebase";

export const insertAuthorizedUser = async (
  userAuthorized: string,
  user: string | null | undefined,
  token: string | undefined
) => {
  let message = {};

  await fetch(`${URL}auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-allow-Origin": "*",
    },
    body: JSON.stringify({ userAuthorized, user, token }),
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
  token: string | undefined
) => {
  let message = {};

  await fetch(`${URL}auth`, {
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

export const getAllAllowedUsers = async (
  user: string | null | undefined,
  token: string | undefined
) => {
  let data: UserAuth[] = [];

  await fetch(`${URL}auth/${user}/${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((resp) => resp.json())
    .then((resp) => (data = resp))
    .catch((err) => {
      throw new Error("Problemas no servidor GET, buscando usuario");
    });

  return data;
};


