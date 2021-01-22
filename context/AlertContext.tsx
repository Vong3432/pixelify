import { createContext, useReducer } from "react";
import { AlertReducer } from "../reducers/AlertReducer";


export const AlertContext = createContext(null);

export const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [state, dispatchAlert] = useReducer(AlertReducer, []);

  return (
    <AlertContext.Provider value={{ state, dispatchAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContextProvider;