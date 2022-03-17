import React, { useState } from "react";
import { FaWineBottle } from "react-icons/fa";

import * as C from "./styles";
import { IoMdClose } from "react-icons/io";

import { useInfoContext } from "../../contexts/userInfoContext";

import { insertTransactionModelIntoDatabase } from "../../database/firebase";

type Props = {
  handleShowRegisterProduct: () => void;
  showRegisterProduct: boolean;
  productCategoryList: string[];
  getProducts: () => void;
};

type FormType = {
  category: string;
  name: string;
  unity: string;
  price: number;
  expense: boolean;
};
const initialState = {
  category: "",
  name: "",
  unity: "no",
  price: 0,
  expense: false,
};

function RegisterProduct(props: Props) {
  const {
    handleShowRegisterProduct,
    showRegisterProduct,
    productCategoryList,
    getProducts,
  } = props;

  const { state } = useInfoContext();

  const [formValues, setFormValues] = useState<FormType>(initialState);
  const [newCategory, setNewCategory] = useState(false);

  const handleInputChange = (e: any) => {
    const campo = e.target.name;
    const value = e.target.value;

    setFormValues({ ...formValues, [campo]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      formValues.category === "" ||
      formValues.name === "" ||
      Number(formValues.price) === 0
    ) {
      alert("Cadastro não efetuado \nPreecha todos os campos corretamente");
      return;
    }

    let product = { ...formValues };

    const newProduct = {
      category: product.category,
      name: product.name,
      unity: product.unity === "no",
      price: Number(product.price),
      expense: false,
    };

    handleShowRegisterProduct();

    const token = await state.infoUser?.getIdToken();
    const user = state.infoUser?.email;
    await insertTransactionModelIntoDatabase(newProduct, user, token);

    getProducts();

    setFormValues(initialState);
  };

  return (
    <C.Container showRegisterProduct={showRegisterProduct}>
      <C.ContainerForm onSubmit={handleSubmit}>
        <C.FormField>
          <C.InputDiv width={100}>
            <C.InputLabel>Categoria:</C.InputLabel>
            <C.Select
              name={"category"}
              placeholder={"Categoria"}
              value={formValues.category || ""}
              onChange={(e) => {
                if (e.target.value === "Nova categoria") {
                  formValues.category = "";
                  setNewCategory(true);
                } else {
                  handleInputChange(e);
                }
              }}
            >
              <>
                <option></option>
                {productCategoryList.map((category, index) => (
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
              <C.InputLabel>Nova Categoria:</C.InputLabel>
              <C.InputText
                type={"text"}
                name={"category"}
                placeholder={"Categoria"}
                value={formValues.category || ""}
                onChange={handleInputChange}
              />
            </C.InputDiv>
          )}

          <C.InputDiv width={100}>
            <C.InputLabel>Nome:</C.InputLabel>
            <C.InputText
              type={"text"}
              name={"name"}
              placeholder={"Nome do produto"}
              onChange={handleInputChange}
              value={formValues.name || ""}
            />
          </C.InputDiv>

          <C.InputDiv width={60}>
            <C.InputLabel>Preço:</C.InputLabel>
            <C.InputText
              type={"number"}
              name={"price"}
              placeholder={"Preço"}
              onChange={handleInputChange}
              value={formValues.price}
            />
          </C.InputDiv>

          <C.InputDiv width={100}>
            <C.InputLabel>Vendido por Kg?</C.InputLabel>
            <div className="radioButtons">
              <label>
                <input
                  type="radio"
                  value={"yes"}
                  name={"unity"}
                  id={"yes"}
                  onChange={handleInputChange}
                  checked={formValues.unity === "yes"}
                />
                Sim
              </label>

              <label>
                <input
                  type="radio"
                  value={"no"}
                  name={"unity"}
                  id={"no"}
                  onChange={handleInputChange}
                  checked={formValues.unity === "no"}
                />
                Não
              </label>
            </div>
          </C.InputDiv>

          <C.DivButtons>
            <C.ButtonSubmit type={"submit"} value={"Cadastrar"} />
            <C.ButtonRegisterCancel
              type="reset"
              onClick={() => {
                setFormValues(initialState);
                handleShowRegisterProduct();
                setNewCategory(true);
              }}
            >
              Cancelar
            </C.ButtonRegisterCancel>
          </C.DivButtons>
        </C.FormField>
      </C.ContainerForm>

      <C.CloseRegisterProductButton
        onClick={() => {
          handleShowRegisterProduct();
          setFormValues(initialState);
          setNewCategory(false);
        }}
        showRegisterProduct={showRegisterProduct}
      >
        <FaWineBottle /> Produto
      </C.CloseRegisterProductButton>
    </C.Container>
  );
}

export default RegisterProduct;
