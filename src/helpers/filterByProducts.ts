import { BestSeller } from "../types/FilterProducts";
import { ItemDataBase } from "../types/Item";

export const orderedByBestSellers = (list: ItemDataBase[]) => {
  const newList: any = {};

  list.forEach((item) => {
    if (!item.expense) {
      if (newList[item.product] === undefined) {
        newList[item.product] = 0;
      }
      newList[item.product] += item.amount;
    }
  });

  const listBestSellers: BestSeller[] = [];

  for (const [key, value] of Object.entries(newList)) {
    const product: any = { product: key, value: value };

    listBestSellers.push(product);
  }

  listBestSellers.sort(function (a, b) {
    if (a.value > b.value) {
      return -1;
    } else {
      return 1;
    }
  });

  return listBestSellers;
};

export const orderedAmountOfMoney = (list: ItemDataBase[]) => {
  const newList: any = {};

  list.forEach((item) => {
    if (!item.expense) {
      if (newList[item.product] === undefined) {
        newList[item.product] = 0;
      }
      newList[item.product] += item.price;
    }
  });

  const listByAmountOfMoney: BestSeller[] = [];

  for (const [key, value] of Object.entries(newList)) {
    const product: any = { product: key, value: value };

    listByAmountOfMoney.push(product);
  }

  listByAmountOfMoney.sort(function (a, b) {
    if (a.value > b.value) {
      return -1;
    } else {
      return 1;
    }
  });

  return listByAmountOfMoney;
};

// const objeto = [{morango: 55}, {abacaxi: 60}, {tetete: 10}, {tchau: 111}]

// const objectKeys = objeto.map(elem => ({ product: Object.keys(elem)[0], value: Object.values(elem)[0] }))

// objectKeys.sort((a,b) => a.value - b.value)
