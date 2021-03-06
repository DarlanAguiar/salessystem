import { useState, useEffect } from 'react';
import { FormActions, useInfoContext } from '../../contexts/userInfoContext';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';
import { Item, ItemDataBase } from '../../types/Item';
import {
  formatDateTimeZone,
  formatFinalDate,
  getCurrentMonth,
  getDate
} from '../../helpers/dateFilter';
import * as C from './styles';
import TableArea from '../TableArea';
import InfoArea from '../InfoArea';
import SalesArea from '../SalesArea';
import RegisterProduct from '../RegisterProduct';
import RegisterExpense from '../RegisterExpense';
import ExpenseArea from '../ExpenseArea';

import {
  getModelTransactionList,
  getTransactionList,
  insertTransactionIntoDatabase
} from '../../database/firebase';
import TableRemoveModel from '../TableRemoveModel';
import { ProductClientTitle, ProductDatabase } from '../../types/Product';
import { BestSeller } from '../../types/FilterProducts';
import {
  orderedAmountOfMoney,
  orderedByBestSellers
} from '../../helpers/filterByProducts';
import Settings from '../Settings';
import Footer from '../Footer';
import Headerlogo from '../HeaderLogo';
import { errorText } from '../../helpers/error';
import ErrorMessage from '../ErrorMessage';

const auth = getAuth();

function Home () {
  const { state, dispatch } = useInfoContext();
  const navigate = useNavigate();

  const [databaseProducts, setDatabaseProducts] = useState<ProductDatabase[]>(
    []
  );

  const [list, setList] = useState<ItemDataBase[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [showRegisterProduct, setShowRegisterProduct] = useState(false);
  const [showRegisterExpense, setShowRegisterExpense] = useState(false);
  const [showRemoveModel, setShowRemoveModel] = useState(false);
  const [productCategoryList, setProductCategoryList] = useState<string[]>([]);
  const [expenseListCategory, setExpenseListCategory] = useState<string[]>([]);
  const [titleTable, setTitleTable] = useState('');
  const [salesField, setSalesField] = useState<ProductClientTitle[][]>([[]]);
  const [listBestSellers, setListBestSellers] = useState<BestSeller[]>([]);
  const [listAmountOfMoney, setlistAmountOfMoney] = useState<BestSeller[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showInvitation, setShowInvitation] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    const getListAndProducts = async () => {
      if (state.infoUser?.email) {
        const modelProducts = await getProductsDatabase() as ProductDatabase[];
        const listProducts = await getListDatabase() as ItemDataBase[];
        if (modelProducts && listProducts) {
          if (isMounted) {
            setList(listProducts);
            setDatabaseProducts(modelProducts);
            setTitleTable(getDate().split('-').reverse().join('/'));
          }
        };
      }
    };

    getListAndProducts();
    return () => { isMounted = false; };
  }, []);

  const getProductsDatabase = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const authorizedDatabase = state.databaseAuth || user;

    try {
      const listModelDatabaseProducts = await getModelTransactionList(
        user,
        token,
        authorizedDatabase
      );
      return listModelDatabaseProducts;
    } catch (error) {
      return setErrorMessage(errorText(error));
    }
  };

  const getListDatabase = async () => {
    const initialDate = formatDateTimeZone(getDate());
    const finalDate = formatDateTimeZone(formatFinalDate(getDate()));
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const authorizedDatabase = state.databaseAuth || user;

    try {
      const listDataBase = await getTransactionList(
        user,
        token,
        authorizedDatabase,
        initialDate,
        finalDate
      );
      return listDataBase;
    } catch (error) {
      return setErrorMessage(errorText(error));
    };
  };

  useEffect(() => {
    setListBestSellers(orderedByBestSellers(list));
    setlistAmountOfMoney(orderedAmountOfMoney(list));

    let newIncome = 0;
    let newExpense = 0;

    list.forEach((element) => {
      if (element.expense) {
        newExpense += element.price;
      } else {
        newIncome += element.price;
      }

      setIncome(newIncome);
      setExpense(newExpense);
    });
  }, [list]);

  useEffect(() => {
    const listCategory: string[] = [];
    const listCategoryExpense: string[] = [];

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
  }, [databaseProducts]);

  const getList = async () => {
    const initialDate = formatDateTimeZone(getDate());
    const finalDate = formatDateTimeZone(formatFinalDate(getDate()));

    getListByDate(initialDate, finalDate);
  };

  const getProducts = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const authorizedDatabase = state.databaseAuth || user;

    try {
      const listModelDatabaseProducts = await getModelTransactionList(
        user,
        token,
        authorizedDatabase
      );
      setDatabaseProducts(listModelDatabaseProducts);
    } catch (error) {
      return setErrorMessage(errorText(error));
    }
  };

  const getListByDate = async (initialDate: number, finalDate: number) => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const authorizedDatabase = state.databaseAuth || user;

    try {
      const listDataBase = await getTransactionList(
        user,
        token,
        authorizedDatabase,
        initialDate,
        finalDate
      );
      setList(listDataBase);
    } catch (error) {
      return setErrorMessage(errorText(error));
    }
  };

  const updateTableTitle = (title: string) => {
    setTitleTable(title);
  };

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  const handleAddItem = (items: Item[]) => {
    items.forEach(async (item) => {
      const user = state.infoUser?.email;
      const token = await state.infoUser?.getIdToken();
      const authorizedDatabase = state.databaseAuth || user;

      try {
        await insertTransactionIntoDatabase(
          item,
          user,
          token,
          authorizedDatabase
        );
      } catch (error) {
        return setErrorMessage(errorText(error));
      }
    });

    setTitleTable(getDate().split('-').reverse().join('/'));

    getList();
  };

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: FormActions.setUser, payload: '' });
    dispatch({ type: FormActions.setToken, payload: '' });
    dispatch({ type: FormActions.setAuthenticated, payload: false });
    dispatch({ type: FormActions.setInfoUser, payload: null });
    dispatch({ type: FormActions.setDatabaseAuth, payload: '' });
    dispatch({ type: FormActions.setIdConfiguration, payload: '' });
    navigate('/login');
  };

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

  const insertNewListToTotal = (itemId: number, list: ProductClientTitle[]) => {
    const totalList = [...salesField];

    totalList[itemId] = list;

    setSalesField(totalList);
  };

  const deletLastClientProducts = () => {
    setSalesField([[]]);
  };

  const handleSetShowSettings = () => {
    setShowSettings(!showSettings);
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

  return (
    <C.Container>
      <C.Header>
        <C.ButtonLogout onClick={logout}>
          {' '}
          <RiLogoutBoxRLine />{' '}
        </C.ButtonLogout>
        <C.ButtonSettings onClick={() => handleSetShowSettings()}>
          <IoMdSettings />
        </C.ButtonSettings>
        <C.Database>
          {state.databaseAuth ? state.databaseAuth : state.user}
        </C.Database>
        <Headerlogo
          setErrorMessage={setErrorMessage}
        />
      </C.Header>
      <C.Body>
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
          listBestSellers={listBestSellers}
          listAmountOfMoney={listAmountOfMoney}
          getListByDate={getListByDate}
          updateTableTitle={updateTableTitle}
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
          filteredList={list}
          titleTable={titleTable}
          getList={getList}
          setErrorMessage={setErrorMessage}
        />
      </C.Body>

      <RegisterExpense
        handleShowRegisterExpense={handleShowRegisterExpense}
        showRegisterExpense={showRegisterExpense}
        expenseListCategory={expenseListCategory}
        getProducts={getProducts}
        showInvitation={showInvitation}
        setErrorMessage={setErrorMessage}
      />
      <RegisterProduct
        handleShowRegisterProduct={handleShowRegisterProduct}
        showRegisterProduct={showRegisterProduct}
        productCategoryList={productCategoryList}
        getProducts={getProducts}
        showInvitation={showInvitation}
        setErrorMessage={setErrorMessage}
      />
      <ExpenseArea
        onAdd={handleAddItem}
        databaseProducts={databaseProducts}
        categoryList={expenseListCategory}
        showInvitation={showInvitation}
      />

      <TableRemoveModel
        databaseProduct={databaseProducts}
        getProducts={getProducts}
        handleSetShowRemoveModel={handleSetShowRemoveModel}
        showRemoveModel={showRemoveModel}
        showInvitation={showInvitation}
      />

      <Settings
        handleSetShowSettings={handleSetShowSettings}
        showSettings={showSettings}
        showInvitation={showInvitation}
        setShowInvitation={setShowInvitation}
        setErrorMessage={setErrorMessage}
      />

      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      <Footer />
    </C.Container>
  );
}

export default Home;
