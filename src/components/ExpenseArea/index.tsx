import { useEffect, useState } from 'react';
import { Item } from '../../types/Item';
import * as C from './styles';

import { getDate } from '../../helpers/dateFilter';

import { Product } from '../../types/Product';

type Props = {
  onAdd: (item: Item[]) => void;
  databaseProducts: Product[];
  categoryList: string[];
  showInvitation: Boolean;
};

function ExpenseArea (props: Props) {
  const { onAdd, databaseProducts, categoryList, showInvitation } = props;

  const [dateField, setDateField] = useState(getDate());
  const [categoryExpenseField, setCategoryExpenseField] = useState('');
  const [ExpenseField, setExpenseField] = useState('');
  const [valueField, setValueField] = useState<number | null>(null);
  const [productList, setProductList] = useState<string[]>([]);
  const [showExpenseField, setShowExpenseField] = useState(false);

  useEffect(() => {
    const newProductsList: string[] = [];

    databaseProducts.forEach((product) => {
      if (product.category === categoryExpenseField) {
        newProductsList.push(product.name);
      }
    });

    setProductList(newProductsList.sort());
  }, [categoryExpenseField]);

  const handleAddExpenseToDatabase = async () => {
    const errors: string[] = [];

    if (categoryExpenseField === '') {
      errors.push('Adicione uma categoria!');
    }
    if (ExpenseField === '') {
      errors.push('Escolha um produto!');
    }
    if (Number(valueField) <= 0 || isNaN(Number(valueField)) === true) {
      errors.push('Valor inválido!');
    }

    if (errors.length > 0) {
      alert(errors[0]);
    } else {
      const tempDate = new Date(dateField);
      tempDate.setMinutes(tempDate.getMinutes() + tempDate.getTimezoneOffset());

      if (
        tempDate.getHours() === 0 &&
        tempDate.getMinutes() === 0 &&
        tempDate.getSeconds() === 0
      ) {
        const now = new Date();
        tempDate.setHours(now.getHours()); // +4
        tempDate.setMinutes(now.getMinutes());
        tempDate.setSeconds(now.getSeconds());
      }

      const itemExpense: Item = {
        date: tempDate,
        category: categoryExpenseField,
        product: ExpenseField,
        amount: 1,
        unity: true,
        price: Number(valueField),
        expense: true
      };

      setShowExpenseField(false);

      onAdd([itemExpense]);

      clearFields();
    }
  };

  const clearFields = () => {
    setDateField(getDate());
    setCategoryExpenseField('');
    setExpenseField('');
    setValueField(0);
  };

  const handleShowExpenseField = () => {
    setShowExpenseField(!showExpenseField);
  };

  return (
    <C.Container showExpenseField={showExpenseField} showInvitation={showInvitation}>
      <div>
        <C.ContainerInput>
          <C.DivInputTop>
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
                value={categoryExpenseField}
                onChange={(e) => {
                  setCategoryExpenseField(e.target.value);
                  setExpenseField('');
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
              <C.InputTitle>Despesa</C.InputTitle>
              <C.Select
                value={ExpenseField}
                onChange={(e) => {
                  setExpenseField(e.target.value);
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
          </C.DivInputTop>
          <C.DivInputDown>
            <C.InputLabel className="value">
              <C.InputTitle>Valor</C.InputTitle>
              <C.Input
                type="number"
                value={valueField || ''}
                onChange={(e) => setValueField(Number(e.target.value))}
              />
            </C.InputLabel>
            <C.InputLabel className="button">
              <C.Button
                className="buttonCancel"
                onClick={() => {
                  clearFields();
                  handleShowExpenseField();
                }}
              >
                Cancelar
              </C.Button>
              <C.Button
                className="buttonRegister"
                onClick={handleAddExpenseToDatabase}
              >
                Registrar
              </C.Button>
            </C.InputLabel>
          </C.DivInputDown>
        </C.ContainerInput>
        <button onClick={handleShowExpenseField} className="addExpenseButton">
          Registrar Despesa
        </button>
      </div>
    </C.Container>
  );
}

export default ExpenseArea;
