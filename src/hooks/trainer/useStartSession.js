import Toast from 'react-native-toast-message';
import { useStartTrainerSessionMutation } from '../../redux/api/trainer/scheduleApi';

export const useStartSession = () => {
  const [startSession, { isLoading }] = useStartTrainerSessionMutation();

  const handleStartSession = async ({ id }) => {
    try {
      const response = await startSession(id).unwrap();

      const serverTimeMs = response?.session_start_apihit_time
        ? new Date(response.session_start_apihit_time).getTime()
        : null;

      const startedAt = Math.min(serverTimeMs ?? Date.now(), Date.now());
      const duration = response?.total_session_time?.value ?? 0;

      const session = {
        session_id: response?.booking_id ?? response?.session_id ?? id,
        started_at: startedAt,
        duration,
      };

      Toast.show({ type: 'success', text1: 'Session started' });

      return session;
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Failed to start session' });
      return false;
    }
  };

  return { handleStartSession, isLoading };
};
