import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: false
  });

  const login = (email, password) => {
    setAuthState({
      token: 'token',
      authenticated: true
    })
  }

  const register = (data) => {
    login(data.email, data.password);
  }

  const logout = () => {
    setAuthState({
      token: null,
      authenticated: false
    })
  }

  const value = {
    authState,
    onLogin: login,
    onRegister: register,
    onLogout: logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}