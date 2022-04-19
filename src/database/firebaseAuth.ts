import { Authorized, UserAuth } from '../types/users';
import { URL, headers } from './firebase';

export const insertAuthorizedUser = async (
  userAuthorized: string,
  user: string | null | undefined,
  token: string | undefined
) => {
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}auth`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ userAuthorized, user, token })
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

export const deleteUserAuthorized = async (
  id: string,
  user: string | null | undefined,
  token: string | undefined,
  userToRemove: string
) => {
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}auth`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ id, user, token, userToRemove })
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

export const getAllAllowedUsers = async (
  user: string | null | undefined,
  token: string | undefined
):Promise<UserAuth[]> => {
  let data: UserAuth[] = [];
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}auth/${user}/${token}`, {
      method: 'GET',
      headers: headers
    });

    if (resp.ok) {
      data = await resp.json();
    } else {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }

  return data;
};

// mudar para middleware
export const confirmAuthorization = async (
  user: string | null | undefined,
  token: string | undefined,
  userToConfirm: string | null
): Promise<Authorized> => {
  let authorization: Authorized = {
    authorized: false
  };
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}auth/${user}/${token}/${userToConfirm}`, {
      method: 'GET',
      headers: headers
    });
    if (resp.ok) {
      authorization = await resp.json();
    } else {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }

  return authorization;
};

export const checkInvitationDatabase = async (
  user: string | null | undefined,
  token: string | undefined
) => {
  let invitations = [];
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}invitation/${user}/${token}`);

    if (resp.ok) {
      invitations = await resp.json();
    } else {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }

  return invitations;
};

export const removeInvitation = async (
  user: string | null | undefined,
  token: string | undefined
) => {
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}invitation`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ user, token })
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

export const checkAuthorizedDatabase = async (
  user: string | null | undefined,
  token: string | undefined
) => {
  let authorizedDatabase = [];
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}alloweddb/${user}/${token}`);

    if (resp.ok) {
      authorizedDatabase = await resp.json();
    } else {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }

  return authorizedDatabase;
};
