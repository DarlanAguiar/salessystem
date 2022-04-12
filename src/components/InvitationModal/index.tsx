import { useState, useEffect } from 'react';
import * as C from './styled';
import { IoMdSettings, IoMdClose } from 'react-icons/io';
import { useInfoContext } from '../../contexts/userInfoContext';
import { checkInvitationDatabase, removeInvitation } from '../../database/firebaseAuth';
import { showError } from '../../helpers/error';

type Props = {
  accessDataFromAnotherUser: (database: string) => void;
  showInvitation: boolean;
  setShowInvitation: React.Dispatch<React.SetStateAction<boolean>>
}

function InvitationModal (props: Props) {
  const { accessDataFromAnotherUser, showInvitation, setShowInvitation } = props;

  const { state } = useInfoContext();

  const [listInvitation, setListInvitation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state.infoUser?.email) {
      checkNewInvitation();
    }
  }, []);

  const checkNewInvitation = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();

    try {
      const invitation = await checkInvitationDatabase(user, token);
      setListInvitation(invitation);
      if (invitation.length === 0) {
        setShowInvitation(false);
      };
    } catch (error) {
      return showError(error);
    }
    setLoading(false);
  };

  const removeInvitationDatabase = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    try {
      await removeInvitation(user, token);
    } catch (error) {
      return showError(error);
    }
  };

  return (
    <C.container showInvitation={showInvitation}>
      <C.CardModal>
        {loading && <C.Loading>Carregando...</C.Loading>}
        <C.ButtonClose onClick={removeInvitationDatabase}><IoMdClose/></C.ButtonClose>
        <C.Title>Você possui {listInvitation.length} convite{listInvitation.length > 1 ? 's' : ''} para acessar banco{listInvitation.length > 1 ? 's' : ''} de dados externo{listInvitation.length > 1 ? 's' : ''}.</C.Title>
        <C.DivButtons>
          {listInvitation.map((database, index) => (
            <C.ButtonAccept key={index} onClick={() => {
              accessDataFromAnotherUser(database);
              removeInvitationDatabase();
            }} >Acessar <span>{database}</span></C.ButtonAccept>
          ))}
          <C.ButtonDeny onClick={removeInvitationDatabase}>Continuar com o banco de dados atual</C.ButtonDeny>
        </C.DivButtons>
        <C.HelpInformation>* Você pode verificar esta permissão a qualquer hora, acesse as <span>Configurações <IoMdSettings /> </span> e suas permissões aparecerão no campo: <span>Bancos de dados permitidos</span>.</C.HelpInformation>

      </C.CardModal>
    </C.container>
  );
}

export default InvitationModal;
