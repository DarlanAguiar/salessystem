import { useEffect, useState } from 'react';
import { Item } from '../../types/Item';
import * as C from './styles';
import { Product, ProductClientTitle } from '../../types/Product';
import OrderList from '../OrderList';
import { getDate } from '../../helpers/dateFilter';
import { IoMdClose } from 'react-icons/io';
import { FaUserPlus } from 'react-icons/fa';

type Props = {
  onAdd: (item: Item[]) => void;
  databaseProducts: Product[];
  categoryList: string[];
  itemIdAllList: number;
  addNewClient: () => void;
  removeClient: (itemId: number) => void;
  productAllClient: ProductClientTitle[] | any;
  clientProducts: ProductClientTitle[];
  insertNewListToTotal: (itemid: number, list: ProductClientTitle[]) => void;
  deleteLastClientProducts: () => void;
};

function SalesArea (props: Props) {
  const {
    onAdd,
    databaseProducts,
    categoryList,
    itemIdAllList,
    addNewClient,
    removeClient,
    productAllClient,
    clientProducts,
    insertNewListToTotal,
    deleteLastClientProducts
  } = props;

  const [dateField, setDateField] = useState(getDate());
  const [categoryField, setCategoryField] = useState('');
  const [productField, setProductField] = useState('');
  const [valueField, setValueField] = useState(0);
  const [unityFied, setUnityFild] = useState(true);
  const [amountField, setAmountField] = useState(1);
  const [expenseField, setExpenseField] = useState(false);
  const [productList, setProductList] = useState<string[]>([]);
  const [valueOfOneUnit, setValueOfOneUnit] = useState(0);
  const [orderList, setOrderList] =
    useState<ProductClientTitle[]>(clientProducts);
  const [title, setTitle] = useState<string | null>('Área de vendas');

  useEffect(() => {
    setOrderList(clientProducts);
  }, [productAllClient]);

  useEffect(() => {
    const newProductsList: string[] = [];

    databaseProducts.forEach((product) => {
      if (product.category === categoryField) {
        newProductsList.push(product.name);
      }
    });

    setProductList(newProductsList.sort());
  }, [categoryField]);

  useEffect(() => {
    const price: Product[] = databaseProducts.filter(
      (product) => product.name === productField
    );

    if (price[0] !== undefined) {
      setValueField(price[0].price);
      setValueOfOneUnit(price[0].price);
    }
  }, [productField]);

  const handleAddEvent = () => {
    const errors: string[] = [];

    if (categoryField === '') {
      errors.push('Adicione uma categoria!');
    }
    if (productField === '') {
      errors.push('Escolha um produto!');
    }
    if (amountField < 1 || isNaN(amountField)) {
      errors.push('Quantidade inválida!');
    }
    if (valueField <= 0) {
      errors.push('Valor inválido!');
    }

    if (errors.length > 0) {
      alert(errors[0]);
      // alert(errors.join("\n"));
    } else {
      const tempDate = dateField ? new Date(dateField) : new Date();

      tempDate.setMinutes(tempDate.getMinutes() + tempDate.getTimezoneOffset());

      if (
        tempDate.getHours() === 0 &&
        tempDate.getMinutes() === 0 &&
        tempDate.getSeconds() === 0
      ) {
        const now = new Date();
        tempDate.setHours(now.getHours());
        tempDate.setMinutes(now.getMinutes());
        tempDate.setSeconds(now.getSeconds());
      }

      const list: ProductClientTitle = {
        title: title,
        date: tempDate,
        category: categoryField,
        product: productField,
        amount: amountField,
        unity: unityFied,
        price: valueField,
        expense: expenseField
      };

      const newOrderList = [...orderList];
      newOrderList.push(list);

      insertNewListToTotal(itemIdAllList, newOrderList);

      clearFields();
    }
  };

  const clearFields = () => {
    setDateField(getDate());
    setCategoryField('');
    setProductField('');
    setValueField(0);
    setAmountField(1);
  };

  const addSaleToDatabase = () => {
    const productsSold = orderList.map((item) => {
      delete item.title;
      return item;
    });

    onAdd(productsSold);

    if (productAllClient.length > 1) {
      removeClient(itemIdAllList);
    } else {
      deleteLastClientProducts();
    }
  };

  const handleCancelSale = () => {
    const newList = [...orderList];

    newList.splice(0);

    const totalList = productAllClient;
    totalList[itemIdAllList] = newList;

    insertNewListToTotal(itemIdAllList, newList);
  };

  const formOfSale = (product: string) => {
    databaseProducts.forEach((item) => {
      if (item.name === product) {
        setUnityFild(item.unity);
        setExpenseField(item.expense);
      }
    });
  };

  const removeItem = (itemId: number) => {
    const newList = [...orderList];

    newList.splice(itemId, 1);

    const totalList = productAllClient;
    totalList[itemIdAllList] = newList;

    insertNewListToTotal(itemIdAllList, newList);
  };

  const handleSetTitle = () => {
    if (productAllClient.length === 1) {
      setTitle('Área de vendas');
    }
  };

  const insertTitle = async (title: string | null) => {
    setTitle(title);

    const newList = [...orderList];
    newList.forEach((item) => {
      item.title = title;
    });
    setOrderList(newList);
  };

  return (
    <C.Container>
      <C.Title
        onBlur={(e) => insertTitle(e.target.textContent)}
        contentEditable
        suppressContentEditableWarning={true}
      >
        {clientProducts[0] ? clientProducts[0].title : 'Área de vendas'}
      </C.Title>
      <C.AddMoreOne onClick={addNewClient}>
        <FaUserPlus />
      </C.AddMoreOne>
      {productAllClient.length > 1 && (
        <C.Closed
          onClick={() => {
            removeClient(itemIdAllList);
            setTitle('Área de vendas');
          }}
        >
          <IoMdClose />
        </C.Closed>
      )}
      <C.ContainerInput>
        <C.AreaUp>
          <C.InputLabel className="date">
            <C.InputTitle>Data</C.InputTitle>
            <C.Input
              type="date"
              value={dateField}
              onChange={(e) => setDateField(e.target.value)}
            />
          </C.InputLabel>
          <C.InputLabel className="category">
            <C.InputTitle>Categoria</C.InputTitle>
            <C.Select
              value={categoryField}
              onChange={(e) => {
                setValueOfOneUnit(0);
                setCategoryField(e.target.value);
                setAmountField(1);
                setProductField('');
              }}
            >
              <>
                <option></option>
                {categoryList.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </>
            </C.Select>
          </C.InputLabel>
          <C.InputLabel className="product">
            <C.InputTitle>Produto</C.InputTitle>
            <C.Select
              value={productField}
              onChange={(e) => {
                setProductField(e.target.value);
                formOfSale(e.target.value);
              }}
            >
              <>
                <option></option>
                {productList.map((product, index) => (
                  <option key={index} value={product}>
                    {product}
                  </option>
                ))}
              </>
            </C.Select>
          </C.InputLabel>
        </C.AreaUp>
        <C.AreaDown>
          <C.InputLabel className="qtd">
            <C.InputTitle>Qtd</C.InputTitle>
            <C.Input
              type="number"
              min={1}
              value={amountField}
              onChange={(e) => {
                setValueField(parseFloat(e.target.value) * valueOfOneUnit);
                setAmountField(parseFloat(e.target.value));
              }}
            />
          </C.InputLabel>
          <C.InputLabel className="value">
            <C.InputTitle>Valor</C.InputTitle>
            <C.Input
              type="number"
              value={valueField.toFixed(2)}
              onChange={(e) => setValueField(Number(e.target.value))}
            />
          </C.InputLabel>
          <C.InputLabel className="button">
            <C.InputTitle>&nbsp;</C.InputTitle>
            <C.Button onClick={handleAddEvent}>Adicionar</C.Button>
          </C.InputLabel>
        </C.AreaDown>
      </C.ContainerInput>
      {orderList.length > 0 && (
        <OrderList
          orderList={orderList}
          addSaleToDatabase={addSaleToDatabase}
          handleCancelSale={handleCancelSale}
          removeItem={removeItem}
          handleSetTitle={handleSetTitle}
        />
      )}
    </C.Container>
  );
}

export default SalesArea;
