import React, { useState } from "react";
import * as C from "./styles";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {
  formatCurrentMonth,
  formatDateTimeZone,
  formatFinalMonth,
  formatInitialMonth,
  getDate,
} from "../../helpers/dateFilter";
import ResumeItem from "../ResumeItem";
import SalesSortedList from "../SalesSortedList";
import { BestSeller } from "../../types/FilterProducts";
import { FcViewDetails } from "react-icons/fc";

type Props = {
  currentMonth: string;
  onMonthChange: (newMonth: string) => void;
  income: number;
  expense: number;
  listBestSellers: BestSeller[];
  listAmountOfMoney: BestSeller[];
  getListByDate: (initialDate: number, finalDate: number) => void;
  updateTableTitle: (title: string) => void;
};

function InfoArea(props: Props) {
  const {
    currentMonth,
    onMonthChange,
    income,
    expense,
    listBestSellers,
    listAmountOfMoney,
    getListByDate,
    updateTableTitle,
  } = props;

  const [dateList, setDateList] = useState(getDate());
  const [showDetails, setShowDetails] = useState(false);

  const handlePrevMonth = () => {
    const [year, month] = currentMonth.split("-");
    let currentDate = new Date(Number(year), Number(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() - 1);

    const formatMonth = currentDate.getMonth() + 1;

    const firstDayOfTheMonth = formatInitialMonth(
      currentDate.getFullYear(),
      formatMonth
    );

    const lastDayOfTheMonth = formatFinalMonth(
      currentDate.getFullYear(),
      formatMonth
    );

    getListByDate(firstDayOfTheMonth, lastDayOfTheMonth);

    onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);

    updateTableTitle(
      formatCurrentMonth(
        `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`
      )
    );
  };

  const handleNextMonth = () => {
    const [year, month] = currentMonth.split("-");
    let currentDate = new Date(Number(year), Number(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() + 1);

    const formatMonth = currentDate.getMonth() + 1;

    const firstDayOfTheMonth = formatInitialMonth(
      currentDate.getFullYear(),
      formatMonth
    );

    const lastDayOfTheMonth = formatFinalMonth(
      currentDate.getFullYear(),
      formatMonth
    );

    getListByDate(firstDayOfTheMonth, lastDayOfTheMonth);

    onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);

    updateTableTitle(
      formatCurrentMonth(
        `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`
      )
    );
  };

  const handleFilterDataByDay = (e: string) => {
    let date = e.split("-");
    date[2] = String(Number(date[2]) + 1).padStart(2, "0");
    const formatDate = date.join("-");

    const initialDate = formatDateTimeZone(e);
    const finalDate = formatDateTimeZone(formatDate);

    getListByDate(initialDate, finalDate);
    updateTableTitle(e.split("-").reverse().join("/"));
  };

  return (
    <C.Container>
      <C.DivContents>
        <C.Title>Resumo do Dia/Mês </C.Title>
        <C.DetailsButton onClick={() => setShowDetails(!showDetails)}>
          <FcViewDetails />
          <span>Detalhes</span>
        </C.DetailsButton>
        <C.DayArea>
          <input
            type={"date"}
            value={dateList}
            onChange={(e) => {
              setDateList(e.target.value);
              handleFilterDataByDay(e.target.value);
            }}
          />
        </C.DayArea>
        <C.MonthArea>
          <C.MonthArrow onClick={handlePrevMonth}>
            <AiOutlineArrowLeft />
          </C.MonthArrow>
          <C.MonthTitle>{formatCurrentMonth(currentMonth)}</C.MonthTitle>
          <C.MonthArrow onClick={handleNextMonth}>
            <AiOutlineArrowRight />
          </C.MonthArrow>
        </C.MonthArea>
        <C.ResumeArea>
          <ResumeItem title={"Receitas"} value={income} />
          <ResumeItem title={"Despesas"} value={expense} />
          <ResumeItem
            title={"Balanço"}
            color={income - expense < 0 ? "red" : "blue"}
            value={income - expense}
          />
        </C.ResumeArea>
      </C.DivContents>
      {showDetails && (
        <SalesSortedList
          listBestSellers={listBestSellers}
          listAmountOfMoney={listAmountOfMoney}
          getListByDate={getListByDate}
          updateTableTitle={updateTableTitle}
        />
      )}
    </C.Container>
  );
}

export default InfoArea;
