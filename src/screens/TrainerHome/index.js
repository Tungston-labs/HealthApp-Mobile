import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ScheduleCard from '../../components/ScheduleCard';
import styles from './style';
import TrainingProgressCard from '../../components/ProgressBar';
import { format, isToday, parse, parseISO } from 'date-fns';
import Skeleton from '../../components/Skelton';
import Toast from 'react-native-toast-message';
import { useGetUpcomingSchedulesQuery } from '../../redux/api/trainer/scheduleApi';
import { useStartSession } from '../../hooks/useStartSession';
import { useActiveSession } from '../../hooks/useActiveSession';
import { useEndSession } from '../../hooks/useEndSession';
const TrainerHome = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigation = useNavigation();

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
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetUpcomingSchedulesQuery({ page, limit });

  const goToScheduleDetail = id => {
    navigation.navigate('TrainerScheduleDetail', { id });
  };

  const goToNotifications = () => {
    navigation.navigate('Notifications');
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error loading schedules',
        text2: error || 'Something went wrong. Please try again.',
      });
    }
  }, [error]);

  const loadMore = () => {
    if (schedules?.current_page < schedules?.total_pages && !isFetching) {
      setPage(prev => prev + 1);
    }
  };

  const onSessionStart = async id => {
    if (activeSession || isSessionStarting || isActiveSessionLoading) return;

    const success = await handleStartSession({ id });
    if (success) {
      setActiveSession(success);

      fetchActiveSession();
    }
  };

  const onEndSession = async () => {
    if (!activeSession || isEnding) return;

    const success = await handleEndSession(activeSession.session_id);
    if (success) {
      await clearActiveSession();
      fetchActiveSession();
      Toast.show({
        type: 'success',
        text1: 'Session ended successfully',
        text2: 'Your session has been ended.',
      });
    }
  };

  const isScheduleToday = date => {
    if (!date) return false;
    return isToday(parseISO(date));
  };

  const renderItem = useCallback(
    ({ item }) => {
      const canStartToday = isScheduleToday(item?.date);

      return (
        <ScheduleCard
          time={
            item?.time
              ? format(parse(item.time, 'HH:mm:ss', new Date()), 'HH:mm')
              : '00:00'
          }
          name={item?.client?.name}
          image={item?.client?.profile_pic_url}
          height={item?.client?.height}
          weight={item?.client?.weight}
          onPress={goToScheduleDetail}
          onStart={() => onSessionStart(item.id)}
          disabled={isActiveSessionLoading || !!activeSession || !canStartToday}
          /////////////------need to check this becuse the activesection may be null at the time of laoding-----//////////////////////////
          loading={isSessionStarting && activeSession?.session_id === item.id}
        />
      );
    },
    [activeSession, isSessionStarting, isActiveSessionLoading],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View>
          <Text style={styles.greeting}>Hi, John</Text>
          <Text style={styles.subTitle}>Gym</Text>
        </View>

        <TouchableOpacity
          style={styles.bell}
          onPress={goToNotifications}
          activeOpacity={0.7}
        >
          <Icon name="notifications-outline" size={20} />
        </TouchableOpacity>
      </View>

      {activeSession && (
        <TrainingProgressCard
          session={activeSession}
          onEndSession={onEndSession}
        />
      )}
      <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
      {isLoading && page === 1 ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} height={100} borderRadius={15} margin={10} />
        ))
      ) : (
        <FlatList
          data={schedules?.results || []}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.6}
          refreshing={isFetching && page === 1}
          onRefresh={() => {
            setPage(1);
            refetch();
          }}
          ListFooterComponent={
            isFetching && page > 1 ? <Skeleton height={100} /> : null
          }
          ListEmptyComponent={
            !isLoading && (
              <View style={styles.emptyContainer}>
                <Image
                  source={require('../../Images/empty.png')}
                  style={styles.emptyImage}
                  resizeMode="contain"
                />
                <Text style={styles.emptyTitle}>Your schedule is empty</Text>
                <Text style={styles.emptySubText}>
                  Users will book your training slots{'\n'}stay tuned.
                </Text>
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default TrainerHome;
