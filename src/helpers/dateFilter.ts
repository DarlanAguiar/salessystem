import { ItemDataBase } from "../types/Item";

export const getCurrentMonth = () => {
  let now = new Date();

  return `${now.getFullYear()}-${now.getMonth() + 1}`;
};
/* 
export const filterListByMonth = (
  list: ItemDataBase[],
  date: string
): ItemDataBase[] => {
  let newList: ItemDataBase[] = [];
  let [year, month] = date.split("-");

  for (let i in list) {
    list[i].date = new Date(list[i].date);
    if (
      list[i].date.getFullYear() === Number(year) &&
      list[i].date.getMonth() + 1 === Number(month)
    ) {
      newList.push(list[i]);
    }
  }

  return newList.sort(function (a, b) {
    return a.date.getTime() - b.date.getTime();
  });
};

export const filterListByDay = (
  list: ItemDataBase[],
  date: string
): ItemDataBase[] => {
  let newList: ItemDataBase[] = [];

  const [year, month, day] = date.split("-");

  list.forEach((item) => {
    item.date = new Date(item.date);
    if (
      item.date.getFullYear() === Number(year) &&
      item.date.getMonth() + 1 === Number(month) &&
      item.date.getDate() === Number(day)
    ) {
      newList.push(item);
    }
  });

  const x = (a: ItemDataBase, b: ItemDataBase) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    a.date.getTime() - b.date.getTime();
  };

  return newList.sort(function (a, b) {
    return a.date.getTime() - b.date.getTime();
  });
};
 */

/* export const getCurrentDay = () => {
  let now = new Date();

  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};
 */



export const fromatDate = (date: Date): string => {

  const newDate = new Date(date)

  let year = newDate.getFullYear();
  let month = String(newDate.getMonth() + 1).padStart(2, "0");
  let day = String(newDate.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
};

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

export const getDate = () => {
  let date = new Date();

  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
