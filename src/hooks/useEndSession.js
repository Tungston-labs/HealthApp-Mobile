import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEndTrainerSessionMutation } from '../redux/api/trainer/scheduleApi';

export const useEndSession = () => {
  const [endSession, { isLoading }] = useEndTrainerSessionMutation();

  const handleEndSession = async sessionId => {
    try {
      await endSession(sessionId).unwrap();
      await AsyncStorage.removeItem('active_session');
      return true;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to end session',
      });
      return false;
    }
  };

  return { handleEndSession, isLoading };
};
