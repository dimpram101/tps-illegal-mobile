import { createContext, useContext, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    userId: null,
    token: null,
    authenticated: false,
  });

  console.log(authState)

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      console.log(res.data);

      setAuthState({
        userId: res.data.data.user.id,
        token: res.data.data.token,
        authenticated: true,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const register = (data) => {
    login(data.email, data.password);
  };

  const logout = () => {
    setAuthState({
      userId: null,
      token: null,
      authenticated: false,
    });
  };

  const value = {
    authState,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
