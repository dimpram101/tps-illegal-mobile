import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    userId: null,
    token: null,
    authenticated: false,
  });

  useEffect(() => {
    const getAuthData = async () => {
      try {
        const authData = await AsyncStorage.getItem("authData");
        if (authData) {
          const parsedAuthData = JSON.parse(authData);
          setAuthState({
            ...parsedAuthData,
            authenticated: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAuthData();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const authData = {
        userId: res.data.data.user.id,
        token: res.data.data.token,
      };
      setAuthState({
        ...authData,
        authenticated: true,
      });

      AsyncStorage.setItem("authData", JSON.stringify(authData));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const register = (data) => {
    login(data.email, data.password);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authData");
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
