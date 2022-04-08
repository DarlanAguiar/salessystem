import * as C from './styles';
import { FcGoogle } from 'react-icons/fc';
import { FaUserPlus } from 'react-icons/fa';
import { FormActions, useInfoContext } from '../../contexts/userInfoContext';
import { firebaseApp } from '../../database/firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccessDatabase } from '../../types/users';
import { fetchAccessDatabase } from '../../database/firebaseAuthAccess';
import { showError } from '../../helpers/error';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

interface ErrorWithMessage {
  message?: string;
}

function Login () {
  const { dispatch } = useInfoContext();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  const navigate = useNavigate();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      const token = await user.user.getIdToken();
      const userEmail = user.user.email;

      dispatch({ type: FormActions.setUser, payload: userEmail });
      dispatch({ type: FormActions.setToken, payload: token });
      dispatch({ type: FormActions.setAuthenticated, payload: true });
      dispatch({ type: FormActions.setInfoUser, payload: user.user });

      const accessDatabase: AccessDatabase | Error = await fetchAccessDatabase(
        userEmail,
        token
      );

      if (accessDatabase instanceof Error) {
        return showError(accessDatabase);
      }

      if (accessDatabase.nameDatabase) {
        console.log('tem' + accessDatabase.nameDatabase);

        dispatch({
          type: FormActions.setDatabaseAuth,
          payload: accessDatabase.nameDatabase
        });
        dispatch({
          type: FormActions.setIdDatabaseAuth,
          payload: accessDatabase.id
        });
      }

      navigate('/');
    } catch (error) {
      showErrorLogin(error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then(async (result) => {
        GoogleAuthProvider.credentialFromResult(result);

        const token = await result.user.getIdToken();
        const userEmail = result.user.email;

        dispatch({ type: FormActions.setUser, payload: userEmail });
        dispatch({ type: FormActions.setToken, payload: token });
        dispatch({ type: FormActions.setAuthenticated, payload: true });
        dispatch({ type: FormActions.setInfoUser, payload: result.user });

        const accessDatabase: AccessDatabase | Error = await fetchAccessDatabase(
          userEmail,
          token
        );

        if (accessDatabase instanceof Error) {
          return showError(accessDatabase);
        }

        if (accessDatabase.nameDatabase) {
          console.log('tem' + accessDatabase.nameDatabase);

          dispatch({
            type: FormActions.setDatabaseAuth,
            payload: accessDatabase.nameDatabase
          });
          dispatch({
            type: FormActions.setIdDatabaseAuth,
            payload: accessDatabase.id
          });
        }

        navigate('/');
      });
    } catch (error) {
      showErrorLogin(error);
    }
  };

  const createUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      const token = await user.user.getIdToken();
      const userEmail = user.user.email;

      dispatch({ type: FormActions.setUser, payload: userEmail });
      dispatch({ type: FormActions.setToken, payload: token });
      dispatch({ type: FormActions.setAuthenticated, payload: true });
      dispatch({ type: FormActions.setInfoUser, payload: user.user });

      navigate('/');
    } catch (error) {
      showErrorLogin(error);
    }
  };

  const showErrorLogin = (error: unknown) => {
    const typedError = error as ErrorWithMessage;
    let errorMessage = null;
    switch (typedError?.message) {
      case null:
      case undefined:
        break;
      case 'Firebase: Error (auth/internal-error).':
        errorMessage = 'Dados incompleto';
        break;
      case 'Firebase: Error (auth/missing-email).':
        errorMessage = 'Adicione o Email';
        break;
      case 'Firebase: Error (auth/invalid-email).':
        errorMessage = 'Email inválido';
        break;
      case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
        errorMessage = 'A senha deve conter no mínimo 6 caracteres';
        break;
      case 'Firebase: Error (auth/email-already-in-use).':
        errorMessage = 'Email utilizado por outro usuáro';
        break;
      case 'Firebase: Error (auth/wrong-password).':
        errorMessage = 'Senha inválida';
        break;
      case 'Firebase: Error (auth/user-not-found).':
        errorMessage = 'Usuário não existe';
        break;
      case 'Senhas não conferem':
        errorMessage = 'Senhas não conferem';
        break;
      default:
        errorMessage =
          'Procedimento não efetivado, confira os dados e tente novamente';
    }

    return setErrorMessage(errorMessage);
  };

  return (
    <C.Container>
      <C.HeaderText>
        <h1>Sistema de Vendas</h1>
        <p>Digite seus dados para entrar ou Criar uma nova conta</p>
      </C.HeaderText>
      <C.Form>
        <C.FormInput>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />

          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <p>{errorMessage}</p>

          <button onClick={handleSubmit}>Entrar</button>
        </C.FormInput>
        <button className="buttonGoogle" onClick={handleLoginGoogle}>
          Entrar com Google <FcGoogle />
        </button>

        <hr />

        <p>ou</p>

        <button className="createNewAccount" onClick={createUser}>
          Criar uma nova conta <FaUserPlus />
        </button>
      </C.Form>
    </C.Container>
  );
}

export default Login;
