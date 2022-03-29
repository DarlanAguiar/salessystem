import { State } from "../contexts/userInfoContext";
import { confirmAuthorization } from "../database/firebaseAuth";

export const checkAuthorizations = async (infoUser: State) => {
  const user = infoUser.infoUser?.email;
  const token = await infoUser.infoUser?.getIdToken();
  const userIWantToAccess = infoUser.databaseAuth;

  const approved = await confirmAuthorization(user, token, userIWantToAccess);

  if (approved.authorized) return true;

  return false;
};

export const accessDenied = (infoUser: State) => {
  return `Não autorizado a acessar ${infoUser.databaseAuth} \nVá para configurações e altere o banco de dados.`;
};
