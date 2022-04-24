import { URL, headers, firebaseApp } from './firebase';
import { Photo, TitleLogo, TitleLogoDatabase } from '../types/logo';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage(firebaseApp);

export const getPhoto = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null | undefined
): Promise<Photo> => {
  let photo: Photo = {
    url: ''
  };
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}photo/${user}/${token}/${authorizedDatabase}`, {
      method: 'GET',
      headers: headers
    });

    if (resp.ok) {
      photo = await resp.json();
    } else {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }

  return photo;
};

// Não consegui enviar o arquivo para o server.
export const uploadingPhoto = async (
  user: string | null | undefined,
  authorizedDatabase: string | null | undefined,
  file: File
) => {
  const referredDatabase = authorizedDatabase;

  const extensions = ['image/jpeg', 'image/jpg', 'image/png'];

  if (extensions.includes(file.type)) {
    const newFile = ref(storage, `${referredDatabase}/imageLogo`);

    const upload = await uploadBytes(newFile, file);

    const photoUrl = await getDownloadURL(upload.ref);

    return photoUrl;
  } else {
    throw new Error('Formato não aceito, permitido apenas .jpeg, .jpg e .png');
  }
};

export const setTitleDatabase = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null | undefined,
  texts: TitleLogo
) => {
  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}settings`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ user, token, authorizedDatabase, texts })
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

export const getTitles = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null | undefined
): Promise<TitleLogoDatabase> => {
  let titles: TitleLogoDatabase = {
    id: '',
    textLeft: '',
    textRight: ''
  };

  let errorMessage = '';

  try {
    const resp = await fetch(`${URL}settings/${user}/${token}/${authorizedDatabase}`, {
      method: 'GET',
      headers: headers
    });
    if (resp.ok) {
      titles = await resp.json();
    } else {
      const err = await resp.json();
      errorMessage = err.message;
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }
  return titles;
};

export const updateTitleDatabase = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null | undefined,
  idTexts: string,
  texts: TitleLogo
) => {
  let errorMessage = '';
  try {
    const resp = await fetch(`${URL}settings`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        authorizedDatabase,
        idTexts,
        user,
        token,
        texts
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
