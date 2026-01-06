import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";


export const setAccessToken = async (token) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, token);
  } catch (e) {
    console.log("SET ACCESS TOKEN ERROR", e);
  }
};

export const setRefreshToken = async (token) => {
  try {
    await AsyncStorage.setItem(REFRESH_TOKEN, token);
  } catch (e) {
    console.log("SET REFRESH TOKEN ERROR", e);
  }
};
export const setToken = async (access, refresh) => {
  try {
    if (access) {
      await AsyncStorage.setItem("access_token", access);
    }

    if (refresh) {
      await AsyncStorage.setItem("refresh_token", refresh);
    }
  } catch (e) {
    console.log("SET TOKEN ERROR", e);
  }
};


export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN);
  } catch (e) {
    console.log("GET ACCESS TOKEN ERROR", e);
    return null;
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(REFRESH_TOKEN);
  } catch (e) {
    console.log("GET REFRESH TOKEN ERROR", e);
    return null;
  }
};


export const clearTokens = async () => {
  try {
    await AsyncStorage.multiRemove([ACCESS_TOKEN, REFRESH_TOKEN]);
  } catch (e) {
    console.log("CLEAR TOKEN ERROR", e);
  }
};
