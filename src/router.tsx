import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "./database/firebase";
import { useNavigate } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import { useInfoContext, FormActions } from "./contexts/userInfoContext";

const auth = getAuth(firebaseApp);

function Router() {
  const { state, dispatch } = useInfoContext();

  // concertar type any
  const Private = ({ children }: any) => {
    const navigate = useNavigate();

    if (state.authenticated) {
      return children;
    }

    onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase !== null) {
        //console.log(usuarioFirebase);
        const token = await usuarioFirebase.getIdToken();

        dispatch({ type: FormActions.setAuthenticated, payload: true });
        dispatch({
          type: FormActions.setUser,
          payload: usuarioFirebase.email,
        });
        dispatch({ type: FormActions.setToken, payload: token });
        dispatch({ type: FormActions.setInfoUser, payload: usuarioFirebase });
      } else {
        navigate("/login");
      }
    });
    return <></>;
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
