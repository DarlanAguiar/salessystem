import React from "react";
import { fromatDate } from "../../helpers/dateFilter";
import { Item } from "../../types/Item";
import * as C from "./styles";
import { IoMdClose } from "react-icons/io";

type Props = {
  item: Item;
  itemId: number;
  removeItem: (itemId: number) => void;
};

function TableItemSale(props: Props) {
  const { item, itemId, removeItem } = props;

  return (
    <C.TableLine>
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
        </C.Value>
      </C.TableColumn>
      <C.TableColumn>
        <C.ButtonDeleteItem onClick={() => removeItem(itemId)}>
          <IoMdClose />
        </C.ButtonDeleteItem>
      </C.TableColumn>
    </C.TableLine>
  );
}

export default TableItemSale;
