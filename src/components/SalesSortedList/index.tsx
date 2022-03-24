import * as C from "./styles";

import React, { useState } from "react";
import { BestSeller } from "../../types/FilterProducts";
import BodySalesSortedlist from "../BodySalesSortedList";

type Props = {
  listBestSellers: BestSeller[];
  listAmountOfMoney: BestSeller[];
  getListByDate: (initialDate: string, finalDate: string) => void;
  updateTableTitle: (title: string) => void;
};

function SalesSortedList(props: Props) {
  const { listBestSellers, listAmountOfMoney, getListByDate, updateTableTitle } = props;

  const [startDateField, setStartDateField] = useState("");
  const [endDateField, setEndDateField] = useState("");

  const formatFinalDate = () => {
    let date = new Date(endDateField);
    date.setDate(date.getDate() + 2);

    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const filterByCustomDate = () => {
    const init = new Date(startDateField).getTime();
    const end = new Date(endDateField).getTime();
    if (init > end) {
      alert("Adicione uma data Final MAIOR que a data inicial");
      return;
    }
    if(startDateField === "" || endDateField === ""){
      alert("Adicione as duas datas para poder filtrar.");
      return;
    }

    const initialDate = `${startDateField}T04:00:00.000Z`;
    const finalDate = `${formatFinalDate()}T04:00:00.000Z`;
    console.log(formatFinalDate());
    

    getListByDate(initialDate, finalDate);

    updateTableTitle(`${startDateField.split("-").reverse().join("/")} à ${ endDateField.split("-").reverse().join("/")}`)
  };

  return (
    <C.Container>
      <C.DivFilterByDate>
        <C.LabelInitialDate>
          Filtrar de:
          <input
            type={"date"}
            value={startDateField}
            onChange={(e) => setStartDateField(e.target.value)}
          />
        </C.LabelInitialDate>
        <C.LabelFinalDate>
          até:
          <input
            type={"date"}
            value={endDateField}
            onChange={(e) => setEndDateField(e.target.value)}
          />
        </C.LabelFinalDate>
        <C.ButtonFilter onClick={filterByCustomDate}>Filtrar</C.ButtonFilter>
      </C.DivFilterByDate>

      <C.ContainerTables>
        <C.DivTable>
          <C.TitleTable>Mais Vendidos</C.TitleTable>
          <C.Table>
            <thead>
              <C.TableRow>
                <C.TableHeadColumn>Produto</C.TableHeadColumn>
                <C.TableHeadColumn>Qtd</C.TableHeadColumn>
              </C.TableRow>
            </thead>
            <C.Tbody>
              {listBestSellers.map((item, index) => (
                <BodySalesSortedlist key={index} product={item} money={false} />
              ))}
            </C.Tbody>
          </C.Table>
        </C.DivTable>
        <C.DivTable>
          <C.TitleTable>Maior Receita</C.TitleTable>
          <C.Table>
            <thead>
              <C.TableRow>
                <C.TableHeadColumn>Produto</C.TableHeadColumn>
                <C.TableHeadColumn>Receita</C.TableHeadColumn>
              </C.TableRow>
            </thead>
            <C.Tbody>
              {listAmountOfMoney.map((item, index) => (
                <BodySalesSortedlist key={index} product={item} money={true} />
              ))}
            </C.Tbody>
          </C.Table>
        </C.DivTable>
      </C.ContainerTables>
    </C.Container>
  );
}

export default SalesSortedList;
