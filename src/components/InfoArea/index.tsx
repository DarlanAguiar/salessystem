import React, { useState } from "react";
import * as C from "./styles";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { formatCurrentMonth, getDate } from "../../helpers/dateFilter";
import ResumeItem from "../ResumeItem";

type Props = {
  currentMonth: string;
  onMonthChange: (newMonth: string) => void;
  income: number;
  expense: number;
  handleDayChange: (newDay: string) => void;
};

function InfoArea(props: Props) {
  const { currentMonth, onMonthChange, income, expense, handleDayChange } =
    props;

  const [dateList, setDateList] = useState(getDate());

  const handlePrevMonth = () => {
    const [year, month] = currentMonth.split("-");
    let currentDate = new Date(Number(year), Number(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() - 1);

    onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
  };

  const handleNextMonth = () => {
    const [year, month] = currentMonth.split("-");
    let currentDate = new Date(Number(year), Number(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() + 1);

    onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
  };

  const handleFilterDataByDay = (e: string) => {
    handleDayChange(e);
  };

  return (
    <C.Container>
      <C.Title>Resumo do Dia/Mês </C.Title>
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
    </C.Container>
  );
}

export default InfoArea;
