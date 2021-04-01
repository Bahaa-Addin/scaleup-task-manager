import React, { createContext } from "react";
import {useProvideUser} from "../hooks/useUserContext";

export const UserContext = createContext();

export const UserProvider = props => {
  const userContext = useProvideUser(null);
  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};