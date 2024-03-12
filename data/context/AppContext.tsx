"use client";
import { createContext } from "react";

interface AppContextInterface {
  nome: string;
}

const AppContext = createContext({} as AppContextInterface);

export function AppProvider(props: any) {
  return (
    <AppContext.Provider
      value={{
        nome: "Teste Context API",
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
