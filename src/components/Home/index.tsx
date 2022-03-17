import React, { useState, useEffect } from "react";

import { FormActions, useInfoContext } from "../../contexts/userInfoContext";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoIosTrain } from "react-icons/io";

import { Item, ItemDataBase } from "../../types/Item";

import {
  getCurrentMonth,
  filterListByMonth,
  filterListByDay,
  getCurrentDay,
  formatCurrentMonth,
} from "../../helpers/dateFilter";

import * as C from "./styles";
import TableArea from "../TableArea";
import InfoArea from "../InfoArea";
import SalesArea from "../SalesArea";
import RegisterProduct from "../RegisterProduct";

import RegisterExpense from "../RegisterExpense";
import ExpenseArea from "../ExpenseArea";
import {
  getModelTransactionList,
  getTransactionList,
  insertTransactionIntoDatabase,
} from "../../database/firebase";
import TableRemoveModel from "../TableRemoveModel";
import { ProductDatabase } from "../../types/Product";

const auth = getAuth();

function Home() {
  const { state, dispatch } = useInfoContext();
  const navigate = useNavigate();

  const [databaseProducts, setDatabaseProducts] = useState<ProductDatabase[]>(
    []
  );

  const [list, setList] = useState<ItemDataBase[]>([]);
  const [filteredList, setFilteredList] = useState<ItemDataBase[]>([]);
  //pegando o mês atual
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [currentDay, setCurrentDay] = useState(getCurrentDay());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [showRegisterProduct, setShowRegisterProduct] = useState(false);
  const [showRegisterExpense, setShowRegisterExpense] = useState(false);
  const [showRemoveModel, setShowRemoveModel] = useState(false);
  const [productCategoryList, setProductCategoryList] = useState<string[]>([]);
  const [expenseListCategory, setExpenseListCategory] = useState<string[]>([]);
  const [titleTable, setTitleTable] = useState("");

  const getList = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    if (token !== undefined) {
      const listDataBase = await getTransactionList(user, token);

      setList(listDataBase);
    }
  };

  const getProducts = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    if (token !== undefined) {
      const listDataBaseProducts = await getModelTransactionList(user, token);

      setDatabaseProducts(listDataBaseProducts);
    }
  };

  useEffect(() => {
    getProducts();
    getList();
  }, []);

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
    setTitleTable(formatCurrentMonth(currentMonth));
  }, [currentMonth]);

  useEffect(() => {
    setFilteredList(filterListByDay(list, currentDay));
    const titleTableFormated = currentDay.split("-").reverse().join("/");
    setTitleTable(titleTableFormated);
  }, [list, currentDay]);

  useEffect(() => {
    let newIncome = 0;
    let newExpense = 0;

    filteredList.forEach((element) => {
      if (element.expense) {
        newExpense += element.price;
      } else {
        newIncome += element.price;
      }

      setIncome(newIncome);
      setExpense(newExpense);
    });
  }, [filteredList]);

  useEffect(() => {
    const assemblesCategoryOptions = () => {
      let listCategory: string[] = [];
      let listCategoryExpense: string[] = [];

      databaseProducts.forEach((product) => {
        if (!listCategory.includes(product.category) && !product.expense) {
          listCategory.push(product.category);
        }
        if (
          !listCategoryExpense.includes(product.category) &&
          product.expense
        ) {
          listCategoryExpense.push(product.category);
        }
      });

      setProductCategoryList(listCategory.sort());
      setExpenseListCategory(listCategoryExpense.sort());
    };
    assemblesCategoryOptions();
  }, [databaseProducts]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  const handleDayChange = (newDay: string) => {
    setCurrentDay(newDay);
  };

  const handleAddItem = (items: Item[]) => {
    items.forEach(async (item) => {
      const user = state.infoUser?.email;

      const token = await state.infoUser?.getIdToken();

      await insertTransactionIntoDatabase(item, user, token);
    });

    getList();
  };

  const handleShowRegisterProduct = () => {
    setShowRegisterProduct(!showRegisterProduct);
  };

  const handleShowRegisterExpense = () => {
    setShowRegisterExpense(!showRegisterExpense);
  };

  const handleSetShowRemoveModel = () => {
    setShowRemoveModel(!showRemoveModel);
  };
  const logout = async () => {
    await signOut(auth);
    dispatch({ type: FormActions.setUser, payload: "" });
    dispatch({ type: FormActions.setToken, payload: "" });
    dispatch({ type: FormActions.setAuthenticated, payload: false });
    dispatch({ type: FormActions.setInfoUser, payload: null });
    navigate("/login");
  };

  const [salesField, setSalesField] = useState([[]]);

  const addNewClient = () => {
    const listClient = [...salesField];

    listClient.push([]);

    setSalesField(listClient);
  };

  const removeClient = (clientId: number) => {
    const listClient = [...salesField];

    listClient.splice(clientId, 1);

    setSalesField(listClient);
  };

  const insertNewListToTotal = (itemId: number, list: any) => {
    console.log(list);
    const totalList = [...salesField];

    totalList[itemId] = list;

    setSalesField(totalList);
  };

  const deletLastClientProducts = () => {
    setSalesField([[]]);
  };

  return (
    <C.Container>
      <C.Header>
        <C.ButtonLogout onClick={logout}>
          {" "}
          sair
          <RiLogoutBoxRLine />{" "}
        </C.ButtonLogout>
        <C.HeaderText>
          Trem
          <IoIosTrain />
          Bão
        </C.HeaderText>
      </C.Header>
      <C.Body>
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
          handleDayChange={handleDayChange}
        />

        {salesField.map((field, index) => (
          <SalesArea
            key={index}
            itemIdAllList={index}
            onAdd={handleAddItem}
            databaseProducts={databaseProducts}
            categoryList={productCategoryList}
            addNewClient={addNewClient}
            removeClient={removeClient}
            productAllClient={salesField}
            clientProducts={field}
            insertNewListToTotal={insertNewListToTotal}
            deleteLastClientProducts={deletLastClientProducts}
          />
        ))}

        <TableArea
          filteredList={filteredList}
          titleTable={titleTable}
          getList={getList}
        />
      </C.Body>

      <RegisterExpense
        handleShowRegisterExpense={handleShowRegisterExpense}
        showRegisterExpense={showRegisterExpense}
        expenseListCategory={expenseListCategory}
        getProducts={getProducts}
      />
      <RegisterProduct
        handleShowRegisterProduct={handleShowRegisterProduct}
        showRegisterProduct={showRegisterProduct}
        productCategoryList={productCategoryList}
        getProducts={getProducts}
      />
      <ExpenseArea
        onAdd={handleAddItem}
        databaseProducts={databaseProducts}
        categoryList={expenseListCategory}
      />

      <TableRemoveModel
        databaseProduct={databaseProducts}
        getProducts={getProducts}
        handleSetShowRemoveModel={handleSetShowRemoveModel}
        showRemoveModel={showRemoveModel}
      />
    </C.Container>
  );
}

export default Home;
