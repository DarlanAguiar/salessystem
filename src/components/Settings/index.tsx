import React, { useState, useEffect } from "react";
import * as C from "./styles";

import { useInfoContext } from "../../contexts/userInfoContext";
import {
  insertAuthorizedUser,
  getAllAllowedUsers,
  deleteUserAuthorized,
} from "../../database/firebaseAuth";
import { UserAuth } from "../../types/users";
import { IoMdClose } from "react-icons/io";

type Props = {
  handleSetShowSettings: ()=> void;
  showSettings: boolean;
};

function Settings(props: Props) {
  const {handleSetShowSettings, showSettings} = props;

  const { state } = useInfoContext();

  const [userWhoHasAccess, setUserWhoHasAccess] = useState("");
  const [usersAuthorized, setUsersAuthorized] = useState<UserAuth[]>([]);
  

  useEffect(() => {
    if (state.infoUser?.email) {
      getAllowedUsers();
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

    const insert = await insertAuthorizedUser(userWhoHasAccess, user, token);

    console.log(insert);

    getAllowedUsers();
  };

  const deleteUser = async (id: string) => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();

    await deleteUserAuthorized(id, user, token);

    getAllowedUsers();
  };

  return (
    <C.Container showSettings={showSettings}>
      <C.ContainerFilds>
        <C.ButtonCloseSettings onClick={()=> handleSetShowSettings()}>
          <IoMdClose />
        </C.ButtonCloseSettings>
        <C.Title>Configurações</C.Title>
        <C.DivInput>
          <C.TitleUser>Acessar dados de outro usuário</C.TitleUser>
          <C.Label>E-mail do usuário:</C.Label>
          <C.Input type={"email"} placeholder={"E-mail do usuário"}></C.Input>

          <C.ButtonConfirm>Verificar Permissão</C.ButtonConfirm>
        </C.DivInput>

        <hr />

        <C.DivInput>
          <C.DivInputAuth>
            <C.TitleUser>Permitir acesso ao meus dados</C.TitleUser>
            <C.Label>Autorizar usuário a acessar meus dados</C.Label>
            <C.Input
              type={"email"}
              placeholder={"E-mail alturizado"}
              value={userWhoHasAccess}
              onChange={(e) => setUserWhoHasAccess(e.target.value)}
            ></C.Input>
            <C.ButtonConfirm onClick={sendNewPermission}>
              Confirmar
            </C.ButtonConfirm>
          </C.DivInputAuth>

          <C.DivUsersAuth>
            <C.AllowedUsers>Usuários Permitidos</C.AllowedUsers>
            {usersAuthorized.map((user, index) => (
              <C.DivUser key={index}>
                <C.User>{user.user}</C.User>
                <C.ButtonRemoveUser onClick={() => deleteUser(user.id)}>
                  <IoMdClose />
                </C.ButtonRemoveUser>
              </C.DivUser>
            ))}
          </C.DivUsersAuth>
          <hr />
        </C.DivInput>
      </C.ContainerFilds>
    </C.Container>
  );
}

export default Settings;
