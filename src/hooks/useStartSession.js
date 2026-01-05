import Toast from 'react-native-toast-message';
import { useStartTrainerSessionMutation } from '../redux/api/trainer/scheduleApi';

export const useStartSession = () => {
  const [startSession, { isLoading }] =
    useStartTrainerSessionMutation();

  const handleStartSession = async ({ id }) => {
    try {
      const response =await startSession(id).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Session started',
      });

       return {
        session_id: response?.booking_id,
        started_at: new Date(response?.session_start_apihit_time)?.getTime(),
        duration: 0,
      };
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
