import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from './database/firebase';

import Home from './components/Home';
import Login from './components/Login';
import { useInfoContext, FormActions } from './contexts/userInfoContext';
import { useEffect } from 'react';
import { AccessDatabase } from './types/users';
import { fetchAccessDatabase } from './database/firebaseAuthAccess';
import { showError } from './helpers/error';

const auth = getAuth(firebaseApp);
function Router () {
  const { state, dispatch } = useInfoContext();

  type Props = {
    children: JSX.Element;
  };

  const Private = ({ children }: Props) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (state.authenticated) {
        return;
      }
      onAuthStateChanged(auth, async (usuarioFirebase) => {
        if (usuarioFirebase !== null) {
          const token = await usuarioFirebase.getIdToken();

          dispatch({ type: FormActions.setAuthenticated, payload: true });
          dispatch({
            type: FormActions.setUser,
            payload: usuarioFirebase.email
          });
          dispatch({ type: FormActions.setToken, payload: token });
          dispatch({ type: FormActions.setInfoUser, payload: usuarioFirebase });

          try {
            const accessDatabase: AccessDatabase = await fetchAccessDatabase(
              usuarioFirebase.email,
              token
            );
            if (accessDatabase.nameDatabase) {
              dispatch({
                type: FormActions.setDatabaseAuth,
                payload: accessDatabase.nameDatabase
              });
              dispatch({
                type: FormActions.setIdDatabaseAuth,
                payload: accessDatabase.id
              });
            } else {
              dispatch({ type: FormActions.setDatabaseAuth, payload: null });
            }
          } catch (error) {
            return showError(error);
          }
        } else {
          navigate('/login');
        }
      });
    }, []);

    return state.authenticated ? children : <></>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Private>
              <Home />
            </Private>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
