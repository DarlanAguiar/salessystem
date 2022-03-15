import React, { useState } from "react";
import {FaRegMoneyBillAlt} from  "react-icons/fa"

import * as C from "./styles";

import { Product } from "../../types/Product";

type Props = {
  databaseProducts: Product[];
  setDatabaseProducts: (data: Product[]) => void;
  handleShowRegisterExpense: () => void;
  showRegisterExpense: boolean;
  expenseListCategory: string[];
};

function RegisterExpense(props: Props) {
  const {
    setDatabaseProducts,
    databaseProducts,
    handleShowRegisterExpense,
    showRegisterExpense,
    expenseListCategory,
  } = props;

  const [inputCategory, setInputCategory] = useState("");
  const [inputNameExpense, setinputNameExpense] = useState("");
  const [newCategory, setNewCategory] = useState(false);

  const insertItemIntoDatabase = (newProduct: Product) => {
    let databaseProductList = [...databaseProducts];

    databaseProductList.push(newProduct);

    setDatabaseProducts(databaseProductList);
  };
  // concertar any
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    //forcar a barra no type de e
    const dadosDoFormulario = new FormData(e.target as HTMLFormElement);
    const dados = Object.fromEntries(dadosDoFormulario);
    console.log(dados);
    if (dados.category === "" || dados.name === "") {
      alert("Cadastro não efetuado \nPreecha todos os campos corretamente ");
      return;
    }

    const newExpense = {
      category: inputCategory, //String(dados.category),
      name: String(dados.name),
      unity: true,
      price: 0,
      expense: true,
    };

    insertItemIntoDatabase(newExpense);

    handleShowRegisterExpense();

    setInputCategory("");
    setinputNameExpense("");
  };

  return (
    <C.Container showRegisterExpense={showRegisterExpense}>
      <C.ContainerForm onSubmit={handleSubmit}>
        <C.FormField>
          <C.InputDiv width={100}>
            <C.InputLabel>selecione uma categoria:</C.InputLabel>
            <C.Select
              value={inputCategory}
              onChange={(e) => {
                if (e.target.value === "Nova categoria") {
                  setInputCategory("")
                  setNewCategory(true);
                } else {
                  setInputCategory(e.target.value);
                }
              }}
            >
              <>
                <option></option>
                {expenseListCategory.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
                <option>Nova categoria</option>
              </>
            </C.Select>
          </C.InputDiv>
          {newCategory && (
            <C.InputDiv width={100}>
              <C.InputLabel>Nome da categoria:</C.InputLabel>
              <C.InputText
                type={"text"}
                name={"category"}
                placeholder={"Categoria"}
                onChange={(e) => setInputCategory(e.target.value)}
                value={inputCategory}
              />
            </C.InputDiv>
          )}

          <C.InputDiv width={100}>
            <C.InputLabel>Nome da despesa:</C.InputLabel>
            <C.InputText
              type={"text"}
              name={"name"}
              placeholder={"Nome do produto"}
              onChange={(e) => setinputNameExpense(e.target.value)}
              value={inputNameExpense}
            />
          </C.InputDiv>
          <C.DivButtons>
            <C.ButtonSubmit type={"submit"} value={"Cadastrar"} />
            <C.ButtonExpenseCancel
              type="reset"
              onClick={() => {
                setInputCategory("");
                setinputNameExpense("");
                setNewCategory(false);

                handleShowRegisterExpense();
              }}
            >
              Cancelar
            </C.ButtonExpenseCancel>
          </C.DivButtons>
        </C.FormField>
      </C.ContainerForm>
      <C.CloseExpenseButton onClick={handleShowRegisterExpense} showRegisterExpense={showRegisterExpense} ><FaRegMoneyBillAlt /> Despesas</C.CloseExpenseButton>
    </C.Container>
  );
}

export default RegisterExpense;
