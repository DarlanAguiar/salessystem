import { Item } from "../types/Item";

export const getCurrentMonth = () => {
  let now = new Date();

  return `${now.getFullYear()}-${now.getMonth() + 1}`;
};

export const filterListByMonth = (list: Item[], date: string): Item[] => {
  let newList: Item[] = [];
  let [year, month] = date.split("-");

  for (let i in list) {
    if (
      list[i].date.getFullYear() === Number(year) &&
      list[i].date.getMonth() + 1 === Number(month)
    ) {
      newList.push(list[i]);
    }
  }

  return newList;
};

export const filterListByDay = (list: Item[], date: string): Item[] => {
  let newList: Item[] = [];

  const [year, month, day] = date.split("-");

  list.forEach((item) => {
    if (
      item.date.getFullYear() === Number(year) &&
      item.date.getMonth() + 1 === Number(month) &&
      item.date.getDate() === Number(day)
    ) {
      newList.push(item);
    }
  });

  return newList;
};

export const fromatDate = (date: Date): string => {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");
  // ou padStart ou a função addZeroToDate

  return `${day}/${month}/${year}`;
  // return `${addZeroToString(day)}/${addZeroToDate(month)}/${year}`
};
//const addZeroToDate = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

export const formatCurrentMonth = (currentMonth: string): string => {
  const [year, month] = currentMonth.split("-");
  let months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return `${months[Number(month) - 1]} de ${year}`;
};

//não usada
export const getCurrentDay = () => {
  let now = new Date();

  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};

export const getDate = () => {
  let date = new Date()
    
   let year = date.getFullYear();
   let month = String(date.getMonth() + 1).padStart(2, "0");
   let day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`
}
