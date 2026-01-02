import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useActiveSession = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadSession = useCallback(async () => {
    const value = await AsyncStorage.getItem('active_session');
    setActiveSession(value ? JSON.parse(value) : null);
    setLoading(false);
  }, []);

  const clearSession = async () => {
    await AsyncStorage.removeItem('active_session');
    setActiveSession(null);
  };

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  return {
    activeSession,
    setActiveSession,
    clearSession,
    loading,
    reload: loadSession,
  };
};
