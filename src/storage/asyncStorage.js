import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const ACTIVE_SESSION = 'active_session';
const USER = 'user';

export const setRefreshToken = async token => {
  if (!token) return;
  try {
    await AsyncStorage.setItem(REFRESH_TOKEN, token);
  } catch (e) {
    console.log('SET REFRESH TOKEN ERROR', e);
  }
};

export const setToken = async (access, refresh) => {
  try {
    if (access) {
      await AsyncStorage.setItem('access_token', access);
    }

    if (refresh) {
      await AsyncStorage.setItem('refresh_token', refresh);
    }
  } catch (e) {
    console.log('SET TOKEN ERROR', e);
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(REFRESH_TOKEN);
  } catch (e) {
    console.log('GET REFRESH TOKEN ERROR', e);
    return null;
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.multiRemove([REFRESH_TOKEN, ACTIVE_SESSION,USER]);
  } catch (e) {
    console.log('CLEAR TOKEN ERROR', e);
  }
};
