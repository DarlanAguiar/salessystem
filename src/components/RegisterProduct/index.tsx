import { BaseSyntheticEvent, useState } from 'react';
import { FaWineBottle } from 'react-icons/fa';
import * as C from './styles';
import { useInfoContext } from '../../contexts/userInfoContext';
import { insertTransactionModelIntoDatabase } from '../../database/firebase';
import { checkAccess } from '../../helpers/authorizations';
import { showError } from '../../helpers/error';

type Props = {
  handleShowRegisterProduct: () => void;
  showRegisterProduct: boolean;
  productCategoryList: string[];
  getProducts: () => void;
  showInvitation: Boolean;
};

type FormType = {
  category: string;
  name: string;
  unity: string;
  price: number;
  expense: boolean;
};
const initialState = {
  category: '',
  name: '',
  unity: 'no',
  price: 0,
  expense: false
};

function RegisterProduct (props: Props) {
  const {
    handleShowRegisterProduct,
    showRegisterProduct,
    productCategoryList,
    getProducts,
    showInvitation
  } = props;

  const { state } = useInfoContext();

  const [formValues, setFormValues] = useState<FormType>(initialState);
  const [newCategory, setNewCategory] = useState(false);

  const handleInputChange = (e: BaseSyntheticEvent) => {
    const campo = e.target.name;
    const value = e.target.value;

    setFormValues({ ...formValues, [campo]: value });
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (
      formValues.category === '' ||
      formValues.name === '' ||
      Number(formValues.price) === 0
    ) {
      alert('Cadastro não efetuado \nPreecha todos os campos corretamente');
      return;
    }

    const product = { ...formValues };

    const newProduct = {
      category: product.category,
      name: product.name,
      unity: product.unity === 'no',
      price: Number(product.price),
      expense: false
    };

    handleShowRegisterProduct();

    const token = await state.infoUser?.getIdToken();
    const user = state.infoUser?.email;
    const authorizedDatabase = state.databaseAuth;

    if (authorizedDatabase) {
      const accessAuthorized = await checkAccess(state);
      if (!accessAuthorized) {
        return;
      }
    }

    try {
      await insertTransactionModelIntoDatabase(
        newProduct,
        user,
        token,
        authorizedDatabase
      );
    } catch (error) {
      return showError(error);
    }

    getProducts();

    setFormValues(initialState);
  };

  return (
    <C.Container showRegisterProduct={showRegisterProduct} showInvitation={showInvitation}>
      <C.ContainerForm onSubmit={handleSubmit}>
        <C.FormField>
          <C.DivInputTop>
            <C.InputDiv>
              <C.InputLabel>Categoria:</C.InputLabel>
              <C.Select
                name={'category'}
                placeholder={'Categoria'}
                value={formValues.category || ''}
                onChange={(e) => {
                  if (e.target.value === 'Nova categoria') {
                    formValues.category = '';
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
              <C.InputDiv>
                <C.InputLabel>Nova Cat:</C.InputLabel>
                <C.InputText
                  type={'text'}
                  name={'category'}
                  placeholder={'Categoria'}
                  value={formValues.category || ''}
                  onChange={handleInputChange}
                />
              </C.InputDiv>
            )}

            <C.InputDiv>
              <C.InputLabel>Nome:</C.InputLabel>
              <C.InputText
                type={'text'}
                name={'name'}
                placeholder={'Nome do produto'}
                onChange={handleInputChange}
                value={formValues.name || ''}
              />
            </C.InputDiv>
          </C.DivInputTop>

          <C.DivInputDown>
            <C.InputDiv>
              <C.InputLabel>Preço:</C.InputLabel>
              <C.InputText
                type={'number'}
                name={'price'}
                placeholder={'Preço'}
                onChange={handleInputChange}
                value={formValues.price}
              />
            </C.InputDiv>
            <C.InputDiv>
              <C.InputLabel>Vendido por Kg?</C.InputLabel>
              <div className="radioButtons">
                <label>
                  <input
                    type="radio"
                    value={'yes'}
                    name={'unity'}
                    id={'yes'}
                    onChange={handleInputChange}
                    checked={formValues.unity === 'yes'}
                  />
                  Sim
                </label>

                <label>
                  <input
                    type="radio"
                    value={'no'}
                    name={'unity'}
                    id={'no'}
                    onChange={handleInputChange}
                    checked={formValues.unity === 'no'}
                  />
                  Não
                </label>
              </div>
            </C.InputDiv>

            <C.DivButtons>
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
              <C.ButtonSubmit type={'submit'} value={'Cadastrar'} />
            </C.DivButtons>
          </C.DivInputDown>
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
