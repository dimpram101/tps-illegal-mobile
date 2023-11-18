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

export const getTPSHistory = async () => {
  const authData = await AsyncStorage.getItem("authData");
  const parsedAuthData = JSON.parse(authData);
  try {
    const res = await api.get(`/user/${parsedAuthData.userId}/tps`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const res = await api.get("/event");

    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const getEventById = async (
  id,
  withImage = false,
  withUser = false,
  withTPS = false
) => {
  try {
    const res = await api.get(`/event/${id}`, {
      params: {
        withImage,
        withUser,
        withTPS,
      },
    });
    // console.log(res);
    return res.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw new error();
  }
};

export const enrollEvent = async ({ eventId, userId }) => {
  try {
    const res = await api.post(`/event/${eventId}/enroll`, {
      user_id: userId,
    });

    return;
  } catch (error) {
    throw error;
  }
};

export const checkUserEnrollment = async ({ eventId, userId }) => {
  try {
    console.log(eventId, userId);
    const res = await api.get(`/event/${eventId}/enroll`, {
      params: {
        user_id: userId,
      },
    });

    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const getUserVolunteerHistory = async (userId) => {
  try {
    const res = await api.get(`/user/${userId}/event`);

    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async (userId, data) => {
  try {
    const res = await api.put(`/user/${userId}`, data);

    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserPassword = async (userId, data) => {
  try {
    const res = await api.put(`/user/${userId}/password`, {
      password: data.password,
      confirm_password: data.confirmPassword,
    });

    return res.data.data;
  } catch (error) {
    throw error;
  }
};
