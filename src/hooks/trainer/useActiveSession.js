import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetOngoingSessionQuery } from '../../redux/api/trainer/scheduleApi';

const STORAGE_KEY = 'active_session';

export const useActiveSession = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  const {
    data: apiSession,
    isLoading: apiLoading,
    refetch,
  } = useGetOngoingSessionQuery();
  
  const loadFromStorage = useCallback(async () => {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value) {
      setActiveSession(JSON.parse(value));
    }
    setHydrated(true);
  }, []);

  const syncFromApi = useCallback(async () => {
    if (apiSession === undefined) return;

    if (apiSession === null) {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setActiveSession(null);
    } else {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(apiSession));
      setActiveSession(apiSession);
    }
  }, [apiSession]);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    syncFromApi();
  }, [syncFromApi]);

  const clearSession = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setActiveSession(null);
  };

  return {
    activeSession,
    setActiveSession,
    clearSession,
    loading: apiLoading || !hydrated,
    reload: refetch,
  };
};
