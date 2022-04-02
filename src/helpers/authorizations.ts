import { State } from '../contexts/userInfoContext';
import { confirmAuthorization } from '../database/firebaseAuth';

export const checkAuthorizations = async (infoUser: State): Promise<Boolean> => {
  const user = infoUser.infoUser?.email;
  const token = await infoUser.infoUser?.getIdToken();
  const userIWantToAccess = infoUser.databaseAuth;

  const approved = await confirmAuthorization(user, token, userIWantToAccess);

  return approved.authorized;
};

export const accessDenied = (infoUser: State) => {
  return `Não autorizado a acessar ${infoUser.databaseAuth} \nVá para configurações e altere o banco de dados.`;
};

export const checkAccess = async (infoUser: State): Promise<boolean> => {
  const authorized = await checkAuthorizations(infoUser);

  if (!authorized && infoUser.databaseAuth !== null) {
    alert(accessDenied(infoUser));
    return false;
  }
  return true;
};
