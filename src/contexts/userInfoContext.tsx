// Context , Reducer, Provider , Hook

import { UserCredential } from "firebase/auth";
import { createContext, ReactNode, useContext, useReducer} from "react";

//criando types
type State = {
  user: string |null;
  token: string;
  authenticated: boolean;
  databaseAuth: string | null;
  idConfiguration: string;
  infoUser: UserCredential["user"] | null;
};

type Action = {
  type: FormActions;
  payload: any;
};

type ContextType = {
  state: State;
  dispatch: (action: Action) => void;
};

//type para children
type ProviderChildrem = {
  children: ReactNode;
};

// informções que inicia o reducer
const initialData: State = {
  user: null,
  token: "",
  authenticated: false,
  databaseAuth: null,
  idConfiguration: "",
  infoUser: null,
};

//criando um Reducer

export enum FormActions {
  setUser,
  setToken,
  setAuthenticated,
  setDatabaseAuth,
  setIdConfiguration,
  setInfoUser,
}

const formReducer = (state: State, action: Action) => {
  switch (action.type) {
    case FormActions.setUser:
      return { ...state, user: action.payload };
    case FormActions.setToken:
      return { ...state, token: action.payload };
    case FormActions.setAuthenticated:
      return { ...state, authenticated: action.payload };
    case FormActions.setDatabaseAuth:
      return { ...state, databaseAuth: action.payload };
    case FormActions.setIdConfiguration:
      return { ...state, idConfiguration: action.payload };
    case FormActions.setInfoUser:
      return { ...state, infoUser: action.payload };
    default:
      return state;
  }
};

//criando o context
const FormContext = createContext<ContextType | undefined>(undefined);

//provider

export const FormProvider = ({ children }: ProviderChildrem) => {
  //iniciando o reducer(primeiro informo o reducer, segundo como ele deve ser inicializado)
  const [state, dispatch] = useReducer(formReducer, initialData);
  const value = { state, dispatch };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

// hook
export const useInfoContext = () => {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error("Precisa ser usado dentro de um FormProvider");
  }

  return context;
};

