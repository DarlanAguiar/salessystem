import { useState, useEffect } from 'react';
import * as C from './styles';

import { useInfoContext, FormActions } from '../../contexts/userInfoContext';
import {
  insertAuthorizedUser,
  getAllAllowedUsers,
  deleteUserAuthorized,
  confirmAuthorization
} from '../../database/firebaseAuth';
import { AccessDatabase, UserAuth } from '../../types/users';
import { IoMdClose } from 'react-icons/io';
import {
  deleteAccessToCurrentDatabase,
  saveDatabaseIWantToAccess,
  updateDatabaseIWantToAccess,
  fetchAccessDatabase
} from '../../database/firebaseAuthAccess';
import InvitationModal from '../InvitationModal';

type Props = {
  handleSetShowSettings: () => void;
  showSettings: boolean;
};

function Settings (props: Props) {
  const { handleSetShowSettings, showSettings } = props;

  const { state, dispatch } = useInfoContext();

  const [userWhoHasAccess, setUserWhoHasAccess] = useState('');
  const [userIWantToAccess, setUserIWantToAccess] = useState('');
  const [usersAuthorized, setUsersAuthorized] = useState<UserAuth[]>([]);
  const [messageAuthorization, setMessageAuthorization] = useState('');
  const [showButtonAccessMyDatabase, setShowButtonAccessMyDatabase] =
    useState(false);

  useEffect(() => {
    if (state.infoUser?.email) {
      getAllowedUsers();

      if (state.databaseAuth) {
        setShowButtonAccessMyDatabase(true);
      }
    }
  }, []);

  const getAllowedUsers = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const usersAuth = await getAllAllowedUsers(user, token);

    setUsersAuthorized(usersAuth);
  };

  const sendNewPermission = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();

    await insertAuthorizedUser(userWhoHasAccess, user, token);

    setUserWhoHasAccess('');

    getAllowedUsers();
  };

  const deleteUser = async (id: string, userToRemove: string) => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();

    await deleteUserAuthorized(id, user, token, userToRemove);

    getAllowedUsers();
  };

  const accessDataFromAnotherUser = async (database: string) => {
    if (database === '') return;

    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();

    const approved = await confirmAuthorization(user, token, database);

    if (approved.authorized) {
      setMessageAuthorization(
        `Permissão CONCEDIDA - Acessando dados ${database}...`
      );

      const sharedAccessDatabase = state.databaseAuth;
      const idDatabaseCurrent = state.idDatabaseAuth;
      let newIdCurrentDatabase = '';

      if (sharedAccessDatabase) {
        await updateDatabaseIWantToAccess(
          database,
          idDatabaseCurrent,
          user,
          token
        );
        newIdCurrentDatabase = idDatabaseCurrent;
      } else {
        await saveDatabaseIWantToAccess(database, user, token);
        const accessDatabase: AccessDatabase = await fetchAccessDatabase(
          user,
          token
        );
        newIdCurrentDatabase = accessDatabase.id;
      }

      setTimeout(() => {
        dispatch({
          type: FormActions.setDatabaseAuth,
          payload: database
        });
        dispatch({
          type: FormActions.setIdDatabaseAuth,
          payload: newIdCurrentDatabase
        });
      }, 3000);

      // busca os dados
    } else {
      setMessageAuthorization('Permissão NEGADA');
    }
  };

  const changeDatabase = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const idDatabaseCurrent = state.idDatabaseAuth;

    await deleteAccessToCurrentDatabase(idDatabaseCurrent, user, token);

    setMessageAuthorization('Alterando banco de dados...');

    setTimeout(() => {
      dispatch({ type: FormActions.setDatabaseAuth, payload: null });
      setShowButtonAccessMyDatabase(false);
    }, 5000);
  };

  return (
    <C.Container showSettings={showSettings}>
      <C.ContainerFilds>
        <C.ButtonCloseSettings onClick={() => handleSetShowSettings()}>
          <IoMdClose />
        </C.ButtonCloseSettings>
        <C.Title>Configurações</C.Title>
        <C.DivInput>
          <C.TitleUser>Acessar dados de outro usuário</C.TitleUser>
          <C.Label>E-mail do usuário:</C.Label>
          <C.Input
            type={'email'}
            placeholder={'E-mail do usuário'}
            value={userIWantToAccess}
            onChange={(e) => setUserIWantToAccess(e.target.value)}
          ></C.Input>

          <C.ButtonConfirm onClick={() => accessDataFromAnotherUser(userIWantToAccess)}>
            Verificar Permissão
          </C.ButtonConfirm>

          <C.StatusAuthorization>{messageAuthorization}</C.StatusAuthorization>
        </C.DivInput>
        {showButtonAccessMyDatabase && (
          <C.ContainerFilds>
            <C.StatusAuthorization>
              Você está conectado a <span>{state.databaseAuth}</span>
            </C.StatusAuthorization>
            <C.ButtonAccessMyDatabase onClick={changeDatabase}>
              Acessar conta {state.infoUser?.email}
            </C.ButtonAccessMyDatabase>
          </C.ContainerFilds>
        )}

        <hr />

        <C.DivInput>
          <C.DivInputAuth>
            <C.TitleUser>Permitir acesso ao meus dados</C.TitleUser>
            <C.Label>Autorizar usuário a acessar meus dados</C.Label>
            <C.Input
              type={'email'}
              placeholder={'E-mail autorizado'}
              value={userWhoHasAccess}
              onChange={(e) => setUserWhoHasAccess(e.target.value)}
            ></C.Input>
            <C.ButtonConfirm onClick={sendNewPermission}>
              Confirmar
            </C.ButtonConfirm>
          </C.DivInputAuth>

          <C.DivUsersAuth>
            {usersAuthorized.length > 0 && (
              <C.AllowedUsers>Usuários Permitidos</C.AllowedUsers>
            )}
            {usersAuthorized.map((user, index) => (
              <C.DivUser key={index}>
                <C.User>{user.user}</C.User>
                <C.ButtonRemoveUser onClick={() => deleteUser(user.id, user.user)}>
                  <IoMdClose />
                </C.ButtonRemoveUser>
              </C.DivUser>
            ))}
          </C.DivUsersAuth>
          <hr />
        </C.DivInput>
      </C.ContainerFilds>
      <InvitationModal accessDataFromAnotherUser={accessDataFromAnotherUser}/>
    </C.Container>
  );
}

export default Settings;
