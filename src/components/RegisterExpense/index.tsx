import { useState } from 'react';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { insertTransactionModelIntoDatabase } from '../../database/firebase';
import { useInfoContext } from '../../contexts/userInfoContext';
import * as C from './styles';
import { checkAccess } from '../../helpers/authorizations';
import { errorText } from '../../helpers/error';

type Props = {
  handleShowRegisterExpense: () => void;
  showRegisterExpense: boolean;
  expenseListCategory: string[];
  getProducts: () => void;
  showInvitation: Boolean;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

function RegisterExpense (props: Props) {
  const {
    handleShowRegisterExpense,
    showRegisterExpense,
    expenseListCategory,
    getProducts,
    showInvitation,
    setErrorMessage
  } = props;

  const { state } = useInfoContext();

  const [inputCategory, setInputCategory] = useState('');
  const [inputNameExpense, setinputNameExpense] = useState('');
  const [newCategory, setNewCategory] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // forcar a barra no type de e
    const dadosDoFormulario = new FormData(e.target as HTMLFormElement);
    const dados = Object.fromEntries(dadosDoFormulario);
    if (dados.category === '' || dados.name === '') {
      alert('Cadastro não efetuado \nPreecha todos os campos corretamente ');
      return;
    }

    const newExpense = {
      category: inputCategory,
      name: String(dados.name),
      unity: true,
      price: 0,
      expense: true
    };

    handleShowRegisterExpense();
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const authorizedDatabase = state.databaseAuth;

    if (authorizedDatabase) {
      const accessAuthorized = await checkAccess(state);
      if (!accessAuthorized) {
        return;
      }
    }

    try {
      await insertTransactionModelIntoDatabase(
        newExpense,
        user,
        token,
        authorizedDatabase
      );
    } catch (error) {
      return setErrorMessage(errorText(error));
    }
    getProducts();

    setInputCategory('');
    setinputNameExpense('');
  };

  return (
    <C.Container showRegisterExpense={showRegisterExpense} showInvitation={showInvitation}>
      <C.ContainerForm onSubmit={handleSubmit}>
        <C.FormField>
          <C.DivInputTop>
            <C.InputDiv width={100}>
              <C.InputLabel>Categoria:</C.InputLabel>
              <C.Select
                value={inputCategory}
                onChange={(e) => {
                  if (e.target.value === 'Nova categoria') {
                    setInputCategory('');
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
                <C.InputLabel>Nova categoria:</C.InputLabel>
                <C.InputText
                  type={'text'}
                  name={'category'}
                  placeholder={'Categoria'}
                  onChange={(e) => setInputCategory(e.target.value)}
                  value={inputCategory}
                />
              </C.InputDiv>
            )}
          </C.DivInputTop>
          <C.DivInputDown>
            <C.InputDiv width={100}>
              <C.InputLabel>Nome:</C.InputLabel>
              <C.InputText
                type={'text'}
                name={'name'}
                placeholder={'Nome do produto'}
                onChange={(e) => setinputNameExpense(e.target.value)}
                value={inputNameExpense}
              />
            </C.InputDiv>
            <C.DivButtons>
              <C.ButtonExpenseCancel
                type="reset"
                onClick={() => {
                  setInputCategory('');
                  setinputNameExpense('');
                  setNewCategory(false);

                  handleShowRegisterExpense();
                }}
              >
                Cancelar
              </C.ButtonExpenseCancel>
              <C.ButtonSubmit type={'submit'} value={'Cadastrar'} />
            </C.DivButtons>
          </C.DivInputDown>
        </C.FormField>
      </C.ContainerForm>
      <C.CloseExpenseButton
        onClick={handleShowRegisterExpense}
        showRegisterExpense={showRegisterExpense}
      >
        <FaRegMoneyBillAlt /> Despesas
      </C.CloseExpenseButton>
    </C.Container>
  );
}

export default RegisterExpense;
