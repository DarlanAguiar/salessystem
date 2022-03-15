import React from "react";
import Router from "./router";
import { FormProvider } from "./contexts/userInfoContext";

function App() {
  return(

    <FormProvider>
      <Router />
    </FormProvider>

  ) 
}

export default App;
