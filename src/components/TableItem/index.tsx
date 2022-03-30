import React, { useState } from "react";
import { fromatDate } from "../../helpers/dateFilter";
import { ItemDataBase } from "../../types/Item";
import * as C from "./styles";
import { useInfoContext } from "../../contexts/userInfoContext";
import { IoMdClose } from "react-icons/io";
import { deleteTransactionDatabase } from "../../database/firebase";
import { checkAccess } from "../../helpers/authorizations";

type Props = {
  item: ItemDataBase;
  getList: () => void;
};

function TableItem(props: Props) {
  const { item, getList } = props;

  const { state } = useInfoContext();

  const [showButtonRemove, setShowButtonRemove] = useState(false);

  const removeItemDatabase = async () => {
    const itemId = item.id;

    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const authorizedDatabase = state.databaseAuth;
    
    if(authorizedDatabase){
      const accessAuthorized = await checkAccess(state);
      if (!accessAuthorized) {
        return;
      }
    }

    await deleteTransactionDatabase(itemId, user, token, authorizedDatabase);

    getList();
  };

  return (
    <C.TableLine
      onMouseEnter={() => setShowButtonRemove(true)}
      onMouseLeave={() => setShowButtonRemove(false)}
    >
      <C.TableColumn>{fromatDate(item.date)}</C.TableColumn>

      <C.TableColumn>
        <C.Category color={item.expense ? "red" : "darkblue"}>
          {item.category}
        </C.Category>
      </C.TableColumn>

      <C.TableColumn>{item.product}</C.TableColumn>

      <C.TableColumn>
        {!item.expense && item.amont}
        {!item.unity ? "g" : ""}
      </C.TableColumn>

      <C.TableColumn>
        <C.Value color={item.expense ? "red" : "black"}>
          {item.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          {showButtonRemove && (
            <C.ButtonDeleteItem onClick={removeItemDatabase}>
              <IoMdClose />
            </C.ButtonDeleteItem>
          )}
        </C.Value>
      </C.TableColumn>
    </C.TableLine>
  );
}

export default TableItem;
