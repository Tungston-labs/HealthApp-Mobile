import React, { useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { useGetUpcomingSchedulesQuery } from '../../redux/api/trainer/scheduleApi';
import { useStartSession } from '../../hooks/trainer/useStartSession';
import { useActiveSession } from '../../hooks/trainer/useActiveSession';
import { useEndSession } from '../../hooks/trainer/useEndSession';
import { resetTrainerHistory, getTrainerHistory } from '../../redux/slices/trainerHistorySlice';
import TrainerHomeView from './TrainerHomeView';

const TrainerHomeContainer = () => {
  const dispatch = useDispatch();
  const [isManualRefreshLoading, setIsManualRefreshLoading] = useState(false);
  const [startingSessionId, setStartingSessionId] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    activeSession,
    setActiveSession,
    loading: isActiveSessionLoading,
    reload: fetchActiveSession,
    clearSession: clearActiveSession,
  } = useActiveSession();

  const { handleStartSession, isLoading: isSessionStarting } =
    useStartSession();
  const { handleEndSession, isLoading: isEnding } = useEndSession();

  const {
    data: schedules,
    error: schedulesError,
    isLoading: isSchedulesLoading,
    isFetching: isSchedulesFetching,
    refetch: refetchSchedules,
  } = useGetUpcomingSchedulesQuery({ page, limit });

  useEffect(() => {
    if (schedulesError) {
      const message =
        schedulesError?.data?.message ||
        schedulesError?.error ||
        'Something went wrong. Please try again.';
      Toast.show({
        type: 'error',
        text1: 'Error loading schedules',
        text2: message,
      });
    }
  }, [schedulesError]);

  const handleManualRefresh = useCallback(async () => {
    setIsManualRefreshLoading(true);
    setPage(1);

    try {
      await refetchSchedules({ force: true });
    } finally {
      setIsManualRefreshLoading(false);
    }
  }, [refetchSchedules, setPage]);

  const loadMore = useCallback(() => {
    if (
      schedules?.current_page < schedules?.total_pages &&
      !isSchedulesFetching
    ) {
      setPage(prev => prev + 1);
    }
  }, [schedules, isSchedulesFetching]);

  const onSessionStart = useCallback(
    async id => {
      if (activeSession || isSessionStarting || isActiveSessionLoading) return;
      setStartingSessionId(id);

      const success = await handleStartSession({ id });
      setStartingSessionId(null);

      if (success) {
        setActiveSession(success);
        fetchActiveSession();
      }
    },
    [
      activeSession,
      isSessionStarting,
      isActiveSessionLoading,
      handleStartSession,
      setActiveSession,
      fetchActiveSession,
    ],
  );

  const onEndSession = useCallback(async () => {
    if (!activeSession || isEnding) return;

    const success = await handleEndSession(activeSession.session_id);
    if (success) {
      await clearActiveSession();
      fetchActiveSession();
      dispatch(resetTrainerHistory());
      dispatch(getTrainerHistory(1));
      Toast.show({
        type: 'success',
        text1: 'Session ended successfully',
        text2: 'Your session has been ended.',
      });
    }
  }, [
    activeSession,
    isEnding,
    handleEndSession,
    clearActiveSession,
    fetchActiveSession,
    dispatch,
  ]);

  return (
    <TrainerHomeView
      activeSession={activeSession}
      onEndSession={onEndSession}
      isSchedulesLoading={isSchedulesLoading}
      page={page}
      schedules={schedules}
      loadMore={loadMore}
      isSchedulesFetching={isSchedulesFetching}
      onSessionStart={onSessionStart}
      isSessionStarting={isSessionStarting}
      isActiveSessionLoading={isActiveSessionLoading}
      isManualRefreshLoading={isManualRefreshLoading}
      onRefresh={handleManualRefresh}
      startingSessionId={startingSessionId}
      isEndingSession={isEnding}
    />
  );
};

export default TrainerHomeContainer;
