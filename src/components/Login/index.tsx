import * as C from "./styles";
import { FcGoogle } from "react-icons/fc";
import { FaUserPlus } from "react-icons/fa";
import { FormActions, useInfoContext } from "../../contexts/userInfoContext";

import { firebaseApp } from "../../database/firebase";

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import React, { MouseEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

interface Props {}

function Login(props: Props) {
  const {} = props;

  const { state, dispatch } = useInfoContext();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //concertar o type de any
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    console.log(email, password);

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      const token = await user.user.getIdToken();
      const userEmail = user.user.email;

      dispatch({ type: FormActions.setUser, payload: userEmail });
      dispatch({ type: FormActions.setToken, payload: token });
      dispatch({ type: FormActions.setAuthenticated, payload: true });

      navigate("/");
    } catch (error) {
      console.log("Erro do catch:", JSON.stringify(error));
      //setErrorMessage(error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then(async (result) => {
        GoogleAuthProvider.credentialFromResult(result);

        // console.log((result.user as any).accessToken);

        // informaçoes do usuario.
        const token = await result.user.getIdToken();
        const userEmail = result.user.email;
        dispatch({ type: FormActions.setUser, payload: userEmail });
        dispatch({ type: FormActions.setToken, payload: token });
        dispatch({ type: FormActions.setAuthenticated, payload: true });

        navigate("/");
      });
    } catch (error) {
      console.log(error);
      //setErrorMessage(error);
    }
  };

  const createUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);

      const token = await user.user.getIdToken();
      const userEmail = user.user.email;

      dispatch({ type: FormActions.setUser, payload: userEmail });
      dispatch({ type: FormActions.setToken, payload: token });
      dispatch({ type: FormActions.setAuthenticated, payload: true });

      navigate("/");

      console.log(state.user, state.authenticated, state.token);
    } catch (error) {
      console.log(error);
    }
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
