import { URL, headers, firebaseApp } from './firebase';
import { Photo, TitleLogo, TitleLogoDatabase } from '../types/logo';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage(firebaseApp);

export const getPhoto = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null | Error
): Promise<Photo> => {
  let photo: Photo = {
    url: ''
  };

  try {
    const resp = await fetch(`${URL}photo/${user}/${token}/${authorizedDatabase}`);
    const result = await resp.json() as Photo;
    photo = result;
  } catch (error) {
    throw new Error('Erro ao buscando logo, reinicie o aplicativo');
  }

  return photo;
};

// Não consegui enviar o arquivo para o server.
export const uploadingPhoto = async (
  user: string | null | undefined,
  authorizedDatabase: string | null,
  file: File
) => {
  let referredDatabase = user;
  if (authorizedDatabase !== null) {
    referredDatabase = authorizedDatabase;
  }

  const extensions = ['image/jpeg', 'image/jpg', 'image/png'];

  if (extensions.includes(file.type)) {
    const newFile = ref(storage, `${referredDatabase}/imageLogo`);

    const upload = await uploadBytes(newFile, file);

    const photoUrl = await getDownloadURL(upload.ref);

    return photoUrl;
  } else {
    throw new Error('Tipo de arquivo Não permitido');
  }
};

export const setTitleDatabase = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null,
  texts: TitleLogo
) => {
  try {
    await fetch(`${URL}settings`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ user, token, authorizedDatabase, texts })
    });
  } catch (error) {
    throw new Error('Erro ao inserir o nome da empresa, reinicie a aplicação ou tente novamente.');
  }
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

  try {
    const resp = await fetch(`${URL}settings/${user}/${token}/${authorizedDatabase}`, {
      method: 'GET',
      headers: headers
    });
    const result = await resp.json();
    titles = result;
  } catch (error) {
    throw new Error('Erro ao buscando nome da empresa, reinicie a aplicação ou tente novamente.');
  }
  return titles;
};

export const updateTitleDatabase = async (
  user: string | null | undefined,
  token: string | undefined,
  authorizedDatabase: string | null,
  idTexts: string,
  texts: TitleLogo
) => {
  try {
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
    });
  } catch (error) {
    throw new Error('Problemas no servidor ao atualizar nome da empresa, reinicie a aplicação ou tente novamente.');
  }
};
