import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserData = async () => {
  const authData = await AsyncStorage.getItem("authData");
  const parsedAuthData = JSON.parse(authData);
  try {
    const res = await api.get(`/user/${parsedAuthData.userId}`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTPS = async () => {
  try {
    const res = await api.get("/tps");
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
