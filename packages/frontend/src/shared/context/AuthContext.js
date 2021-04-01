import { createContext } from 'react';
import { useProvideAuth } from "../hooks/useAuthContext";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}
