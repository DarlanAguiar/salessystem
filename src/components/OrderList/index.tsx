import React, { useState, useEffect } from "react";
import * as C from "./styles";
import { Item } from "../../types/Item";
import TableItemSale from "../TableItemSale";

type Props = {
  orderList: Item[];
  addSaleToDatabase: () => void;
  handleCancelSale: () => void;
  removeItem: (itenId: number) => void;
  handleSetTitle: () => void;
};

function OrderList(props: Props) {
  const {
    orderList,
    addSaleToDatabase,
    handleCancelSale,
    removeItem,
    handleSetTitle,
  } = props;

  const [amount, setAmount] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  useEffect(() => {
    let sumOfValues: number = 0;

    orderList.forEach((item) => {
      sumOfValues += item.price;
    });

    setAmount(sumOfValues);
  }, [orderList]);

  return (
    <C.Container>
      <C.ContainerTable>
        <thead>
          <tr>
            <C.TableHeadColumn>Data</C.TableHeadColumn>
            <C.TableHeadColumn>Categoria</C.TableHeadColumn>
            <C.TableHeadColumn>Produto</C.TableHeadColumn>
            <C.TableHeadColumn>Qtd</C.TableHeadColumn>
            <C.TableHeadColumn>Preço</C.TableHeadColumn>
          </tr>
        </thead>
        <tbody>
          {orderList.map((item, index) => (
            <TableItemSale
              key={index}
              item={item}
              itemId={index}
              removeItem={removeItem}
            />
          ))}
        </tbody>
      </C.ContainerTable>
      <C.TableSummary>
        <C.MoneyChange>
          <label htmlFor="money">Dinheiro: </label>
          <input
            type={"number"}
            min={0}
            onChange={(e) => setAmountPaid(Number(e.target.value))}
          />

          {amountPaid !== 0 &&
            (amountPaid - amount > 0 ? (
              <p>
                {" "}
                Troco:{" "}
                <span className="leftover">
                  {(amountPaid - amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </p>
            ) : (
              <p>
                {" "}
                Falta:{" "}
                <span className="lack">
                  {(amountPaid - amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </p>
            ))}
        </C.MoneyChange>

        <C.CloseSale>
          <p>
            Total
            <span>
              {amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </p>
          <button className="cancelSale" onClick={handleCancelSale}>
            Cancelar
          </button>
          <button
            className="completeSaleButton"
            onClick={() => {
              addSaleToDatabase();
              handleSetTitle();
            }}
          >
            Fechar venda
          </button>
        </C.CloseSale>
      </C.TableSummary>
    </C.Container>
  );
}

export default OrderList;
