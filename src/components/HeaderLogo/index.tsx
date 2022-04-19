import * as C from './styles';
import { useState, useEffect, FormEvent } from 'react';
import { useInfoContext } from '../../contexts/userInfoContext';
import { getPhoto, getTitles, setTitleDatabase, updateTitleDatabase, uploadingPhoto } from '../../database/firebaseLogo';
import { Photo, TitleLogo, TitleLogoDatabase } from '../../types/logo';
import { IoMdClose } from 'react-icons/io';
import Logo from '../../img/logo.png';
import { errorText } from '../../helpers/error';

type Props = {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

function Headerlogo (props: Props) {
  const { setErrorMessage } = props;
  const { state } = useInfoContext();

  const [textLeft, setTextLeft] = useState('Sua');
  const [textRight, setTextRight] = useState('Marca');
  const [idTexts, setIdTexts] = useState('');
  const [logo, setLogo] = useState(Logo);
  const [uploading, setUploading] = useState(false);
  const [showFieldSendPhoto, setShowFieldSendPhoto] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const getInfoHeader = async () => {
      if (state.infoUser?.email) {
        const titles = await getTitlesDatabase() as TitleLogoDatabase;
        const logo = await getLogo() as string;
        if (titles && logo) {
          if (isMounted) {
            setIdTexts(titles.id);
            setTextLeft(titles.textLeft);
            setTextRight(titles.textRight);
            setLogo(logo);
          };
        }
      }
    };
    getInfoHeader();
    return () => { isMounted = false; };
  }, []);

  const getLogo = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const authorizedDatabase = state.databaseAuth || user;

    try {
      const logo: Photo | null = await getPhoto(user, token, authorizedDatabase);

      if (logo !== null) {
        return logo.url;
      }
    } catch (error) {
      return setErrorMessage(errorText(error));
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;
    if (file && file.size > 0) {
      setUploading(true);
      const user = state.infoUser?.email;
      const authorizedDatabase = state.databaseAuth || user;

      try {
        await uploadingPhoto(user, authorizedDatabase, file);
      } catch (error) {
        setUploading(false);
        return setErrorMessage(errorText(error));
      }
      const logo = await getLogo() as string;
      setLogo(logo);
      setUploading(false);
      handleShowFieldSendPhoto();
    }
  };

  const handleShowFieldSendPhoto = () => {
    setShowFieldSendPhoto(!showFieldSendPhoto);
  };

  const getTitlesDatabase = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const authorizedDatabase = state.databaseAuth || user;

    try {
      const titles: TitleLogoDatabase = await getTitles(user, token, authorizedDatabase);
      return titles;
    } catch (error) {
      return setErrorMessage(errorText(error));
    }
  };

  const insertTitleDatabase = async () => {
    const texts: TitleLogo = {
      textLeft: textLeft,
      textRight: textRight
    };

    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const authorizedDatabase = state.databaseAuth || user;

    if (idTexts !== undefined) {
      try {
        await updateTitleDatabase(user, token, authorizedDatabase, idTexts, texts);
      } catch (error) {
        return setErrorMessage(errorText(error));
      }
    } else {
      try {
        await setTitleDatabase(user, token, authorizedDatabase, texts);
      } catch (error) {
        return setErrorMessage(errorText(error));
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
