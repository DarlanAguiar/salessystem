import * as C from './styles';
import { useState, useEffect, FormEvent } from 'react';
import { useInfoContext } from '../../contexts/userInfoContext';
import { checkAccess } from '../../helpers/authorizations';
import { getPhoto, getTitles, setTitleDatabase, updateTitleDatabase, uploadingPhoto } from '../../database/firebaseLogo';
import { Photo, TitleLogo, TitleLogoDatabase } from '../../types/logo';
import { IoMdClose } from 'react-icons/io';
import Logo from '../../img/logo.png';
import { showError } from '../../helpers/error';

function Headerlogo () {
  const { state } = useInfoContext();

  const [textLeft, setTextLeft] = useState('Sua');
  const [textRight, setTextRight] = useState('Marca');
  const [idTexts, setIdTexts] = useState('');
  const [logo, setLogo] = useState(Logo);
  const [uploading, setUploading] = useState(false);
  const [showFieldSendPhoto, setShowFieldSendPhoto] = useState(false);

  useEffect(() => {
    if (state.infoUser?.email) {
      getTitlesDatabase();
      getLogo();
    }
  }, []);

  const getLogo = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const authorizedDatabase = state.databaseAuth;

    if (authorizedDatabase) {
      const accessAuthorized = await checkAccess(state);
      if (!accessAuthorized) {
        return;
      }
    }

    try {
      const logo: Photo | null = await getPhoto(user, token, authorizedDatabase);

      setLogo(logo.url);
    } catch (error) {
      return showError(error);
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;
    if (file && file.size > 0) {
      setUploading(true);
      const user = state.infoUser?.email;
      const authorizedDatabase = state.databaseAuth;

      if (authorizedDatabase) {
        const accessAuthorized = await checkAccess(state);
        if (!accessAuthorized) {
          return;
        }
      }

      setUploading(false);
      handleShowFieldSendPhoto();

      try {
        await uploadingPhoto(user, authorizedDatabase, file);
      } catch (error) {
        return showError(error);
      }

      getLogo();
    }
  };

  const handleShowFieldSendPhoto = () => {
    setShowFieldSendPhoto(!showFieldSendPhoto);
  };

  const getTitlesDatabase = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const authorizedDatabase = state.databaseAuth;

    if (authorizedDatabase) {
      const accessAuthorized = await checkAccess(state);
      if (!accessAuthorized) {
        return;
      }
    }

    try {
      const titles: TitleLogoDatabase = await getTitles(user, token, authorizedDatabase);
      setIdTexts(titles.id);
      setTextLeft(titles.textLeft);
      setTextRight(titles.textRight);
    } catch (error) {
      return showError(error);
    }
  };

  const insertTitleDatabase = async () => {
    const texts: TitleLogo = {
      textLeft: textLeft,
      textRight: textRight
    };

    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const authorizedDatabase = state.databaseAuth;

    if (authorizedDatabase) {
      const accessAuthorized = await checkAccess(state);
      if (!accessAuthorized) {
        return;
      }
    }

    if (idTexts !== undefined) {
      try {
        await updateTitleDatabase(user, token, authorizedDatabase, idTexts, texts);
      } catch (error) {
        return showError(error);
      }
    } else {
      try {
        await setTitleDatabase(user, token, authorizedDatabase, texts);
      } catch (error) {
        return showError(error);
      }
    }
    getTitlesDatabase();
  };

  return (
    <C.Container>
      <C.AreaLogo>
        <C.TextLeft
          onChange={(e) => setTextLeft(e.target.value)}
          onBlur={insertTitleDatabase}
          value={textLeft}
        ></C.TextLeft>
        <img src={logo} alt={'Logo'} onClick={handleShowFieldSendPhoto} />
        <C.TextRight
          onChange={(e) => setTextRight(e.target.value)}
          onBlur={insertTitleDatabase}
          value={textRight}
        ></C.TextRight>
      </C.AreaLogo>
      <C.FormArea showFieldSendPhoto={showFieldSendPhoto}>
        <C.UploadForm method="Post" onSubmit={handleFormSubmit}>
          <C.ButtonClose onClick={handleShowFieldSendPhoto}>
            <IoMdClose />
          </C.ButtonClose>
          <h3>Deseja alterar logo?</h3>
          <input type="file" name="image" className="chooseFile" />
          <input type="submit" value="Enviar" className="send" />
        </C.UploadForm>
        {uploading && <C.Uploading>Enviando...</C.Uploading>}
      </C.FormArea>
    </C.Container>
  );
}

export default Headerlogo;
