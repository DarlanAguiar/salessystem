import { URL, headers, firebaseApp } from './firebase';
import { Photo, TitleLogo, TitleLogoDatabase } from '../types/logo';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage(firebaseApp);

export const getPhoto = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null
): Promise<Photo> => {
  let photo: Photo = {
    url: ''
  };

  await fetch(`${URL}photo/${user}/${token}/${authorizedDatabase}`, {
    method: 'GET',
    headers: headers
  })
    .then((resp) => resp.json())
    .then((resp) => {
      photo = resp;
    })
    .catch(() => {
      throw new Error('Problemas no servidor GET, buscando logo');
    });

  return photo;
};

// Não consegui enviar o arquivo para o sever.
export const uploadingPhoto = async (
  user: string | null | undefined,
  authorizedDatabase: string | null,
  file: File
) => {
  let referredDatabase = user;
  if (authorizedDatabase !== null) {
    referredDatabase = authorizedDatabase;
  }

  if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
    const newFile = ref(storage, `${referredDatabase}/imageLogo`);

    const upload = await uploadBytes(newFile, file);

    const photoUrl = await getDownloadURL(upload.ref);

    return photoUrl;
  } else {
    return new Error('tipo de arquivo Não permitido');
  }
};

export const setTitleDatabase = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null,
  texts: TitleLogo
) => {
  let message = {};
  console.log(texts);

  await fetch(`${URL}settings`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ user, token, authorizedDatabase, texts })
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        message = { error: resp.error };
      }
    });
  return message;
};

export const getTitles = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null
): Promise<TitleLogoDatabase> => {
  let titles: TitleLogoDatabase = {
    id: '',
    textLeft: '',
    textRight: ''
  };

  await fetch(`${URL}settings/${user}/${token}/${authorizedDatabase}`, {
    method: 'GET',
    headers: headers
  })
    .then((resp) => resp.json())
    .then((resp) => (titles = resp))
    .catch(() => {
      throw new Error('Problemas no servidor GET');
    });

  return titles;
};

export const updateTitleDatabase = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null,
  idTexts: string,
  texts: TitleLogo
) => {
  let message = {};

  await fetch(`${URL}settings`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      authorizedDatabase,
      idTexts,
      user,
      token,
      texts
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
