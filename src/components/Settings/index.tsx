import { useState, useEffect } from 'react';
import * as C from './styles';

import { useInfoContext, FormActions } from '../../contexts/userInfoContext';
import {
  insertAuthorizedUser,
  getAllAllowedUsers,
  deleteUserAuthorized,
  confirmAuthorization,
  checkAuthorizedDatabase
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
import { errorText } from '../../helpers/error';

type Props = {
  handleSetShowSettings: () => void;
  showSettings: boolean;
  showInvitation: boolean;
  setShowInvitation: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

function Settings (props: Props) {
  const { handleSetShowSettings, showSettings, showInvitation, setShowInvitation, setErrorMessage } = props;

  const { state, dispatch } = useInfoContext();

  const [userWhoHasAccess, setUserWhoHasAccess] = useState('');
  const [usersAuthorized, setUsersAuthorized] = useState<UserAuth[]>([]);
  const [messageAuthorization, setMessageAuthorization] = useState('');
  const [showButtonAccessMyDatabase, setShowButtonAccessMyDatabase] =
    useState(false);
  const [allowedDatabases, setAllowedDatabases] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    const getUsersAndDatabases = async () => {
      if (state.infoUser?.email) {
        const usersAuth = await getAllowedUsers() as UserAuth[];
        const databases = await fetchAllowedDatabase();
        if (isMounted) {
          setUsersAuthorized(usersAuth);
          setAllowedDatabases(databases);

          if (state.databaseAuth) {
            setShowButtonAccessMyDatabase(true);
          }
        }
      };
    };
    getUsersAndDatabases();
    return () => { isMounted = false; };
  }, []);

  const getAllowedUsers = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();

    try {
      const usersAuth = await getAllAllowedUsers(user, token);
      return usersAuth;
    } catch (error) {
      return setErrorMessage(errorText(error));
    }
  };

  const sendNewPermission = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();

    try {
      await insertAuthorizedUser(userWhoHasAccess, user, token);
    } catch (error) {
      return setErrorMessage(errorText(error));
    }
    setUserWhoHasAccess('');

    const usersAuth = await getAllowedUsers() as UserAuth[];
    setUsersAuthorized(usersAuth);
  };

  const deleteUser = async (id: string, userToRemove: string) => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();

    try {
      await deleteUserAuthorized(id, user, token, userToRemove);
    } catch (error) {
      return setErrorMessage(errorText(error));
    }

    const usersAuth = await getAllowedUsers() as UserAuth[];
    setUsersAuthorized(usersAuth);
  };

  const accessDataFromAnotherUser = async (database: string) => {
    if (database === '') return;

    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();

    try {
      const resp = await confirmAuthorization(user, token, database);
      if (resp.authorized) {
        setMessageAuthorization(
          `Permissão CONCEDIDA - Acessando dados ${database}...`
        );

        const sharedAccessDatabase = state.databaseAuth;
        const idDatabaseCurrent = state.idDatabaseAuth;
        let newIdCurrentDatabase = '';

        if (sharedAccessDatabase) {
          try {
            await updateDatabaseIWantToAccess(
              database,
              idDatabaseCurrent,
              user,
              token
            );
          } catch (error) {
            return setErrorMessage(errorText(error));
          }

          newIdCurrentDatabase = idDatabaseCurrent;
        } else {
          try {
            await saveDatabaseIWantToAccess(database, user, token);
          } catch (error) {
            return setErrorMessage(errorText(error));
          }

          const accessDatabase: AccessDatabase | Error = await fetchAccessDatabase(
            user,
            token
          );

          newIdCurrentDatabase = accessDatabase.id;
        }

        dispatch({
          type: FormActions.setDatabaseAuth,
          payload: database
        });
        dispatch({
          type: FormActions.setIdDatabaseAuth,
          payload: newIdCurrentDatabase
        });
      } else {
        setMessageAuthorization('Permissão NEGADA');
      }
    } catch (error) {
      return setErrorMessage(errorText(error));
    }
  };

  const changeDatabase = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const idDatabaseCurrent = state.idDatabaseAuth;

    try {
      await deleteAccessToCurrentDatabase(idDatabaseCurrent, user, token);
    } catch (error) {
      return setErrorMessage(errorText(error));
    }

    setMessageAuthorization('Alterando banco de dados...');

    dispatch({ type: FormActions.setDatabaseAuth, payload: null });
    setShowButtonAccessMyDatabase(false);
  };

  const fetchAllowedDatabase = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();

    try {
      const databases = await checkAuthorizedDatabase(user, token);
      return databases;
    } catch (error) {
      return setErrorMessage(errorText(error));
    }
  };

  return (
    <C.Container showSettings={showSettings}>
      <C.ContainerFilds>
        <C.ButtonCloseSettings onClick={() => handleSetShowSettings()}>
          <IoMdClose />
        </C.ButtonCloseSettings>
        <C.Title>Configurações</C.Title>
        <C.DivInput>
          <C.TitleUser>Banco{allowedDatabases.length > 1 ? 's' : ''} de dados permitido{allowedDatabases.length > 1 ? 's' : ''}</C.TitleUser>

          {allowedDatabases.map((database, index) => (
          <C.ButtonDatabases key={index} onClick={() => accessDataFromAnotherUser(database)} invisible={database === state.databaseAuth }>{database}</C.ButtonDatabases>
          ))

          }

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
            <C.TitleUser>Permitir acesso aos meus dados</C.TitleUser>
            <C.Label>Autorizar usuário a acessar meus dados</C.Label>
            <C.Input
              type={'email'}
              placeholder={'Usuário autorizado'}
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
      <InvitationModal accessDataFromAnotherUser={accessDataFromAnotherUser}
      showInvitation={showInvitation}
      setShowInvitation={setShowInvitation}
      setErrorMessage={setErrorMessage}
      />
    </C.Container>
  );
}

export default Settings;
