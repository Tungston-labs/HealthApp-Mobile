// hooks/useStartSession.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useStartTrainerSessionMutation } from '../redux/api/trainer/scheduleApi';

export const useStartSession = () => {
  const [startSession, { isLoading }] =
    useStartTrainerSessionMutation();

  const handleStartSession = async ( {id, duration} ) => {
    try {
      await startSession(id).unwrap();

      await AsyncStorage.setItem(
        'active_session',
        JSON.stringify({
          session_id: id,
          started_at: Date.now(),
          duration,
        })
      );

      Toast.show({
        type: 'success',
        text1: 'Session Started',
      });

      return true;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to start session',
      });
      return false;
    }
  };

  return { handleStartSession, isLoading };
};
