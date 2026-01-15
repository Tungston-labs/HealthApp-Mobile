import { useCallback, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import ScheduleCard from '../../components/ScheduleCard';
import styles from './style';
import TrainingProgressCard from '../../components/ProgressBar';
import {
  format,
  isSameDay,
  isThisWeek,
  isToday,
  isTomorrow,
  parse,
  parseISO,
} from 'date-fns';
import Skeleton from '../../components/Skelton';
import CommonHeader from '../../components/CommonHeader';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const TrainerHomeView = ({
  activeSession,
  onEndSession,
  isSchedulesLoading,
  page,
  schedules,
  loadMore,
  isSchedulesFetching,
  onSessionStart,
  isSessionStarting,
  isActiveSessionLoading,
  isManualRefreshLoading,
  onRefresh,
  startingSessionId,
  isEndingSession,
}) => {
  const [overtimeShownSessionId, setOvertimeShownSessionId] = useState(null);
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  const goToScheduleDetail = useCallback(
    id => navigation.navigate('TrainerScheduleDetail', { id }),
    [navigation],
  );

  const isScheduleToday = useCallback(date => {
    if (!date) return false;
    return isToday(parseISO(date));
  }, []);

  const getDateLabel = date => {
    const parsed = parseISO(date);

    if (isToday(parsed)) return 'Today';
    if (isTomorrow(parsed)) return 'Tomorrow';

    if (isThisWeek(parsed, { weekStartsOn: 1 })) {
      return format(parsed, 'EEEE');
    }

    return format(parsed, 'dd MMM');
  };

  const shouldShowDateLabel = (currentItem, previousItem) => {
    if (!previousItem) return true;

    return !isSameDay(parseISO(currentItem.date), parseISO(previousItem.date));
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      const canStartToday = isScheduleToday(item?.date);
      const prevItem = schedules?.results?.[index - 1];
      const showLabel = shouldShowDateLabel(item, prevItem);

      return (
        <>
          {showLabel && (
            <Text style={styles.dateLabel}>{getDateLabel(item.date)}</Text>
          )}
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
            onPress={() => goToScheduleDetail(item.id)}
            onStart={() => onSessionStart(item.id)}
            disabled={
              isActiveSessionLoading || !!activeSession || !canStartToday
            }
            loading={isSessionStarting && startingSessionId === item.id}
          />
        </>
      );
    },
    [
      activeSession,
      isSessionStarting,
      isActiveSessionLoading,
      onSessionStart,
      startingSessionId,
      schedules,
    ],
  );

  return (
    <View style={styles.container}>
      <CommonHeader
        greeting="Hi"
        name={user?.name || 'Trainer'}
        subTitle={user?.trainer?.training_plan?.name || 'Basic Plan'}
      />
      <View style={styles.bodyContainer}>
        {activeSession && (
          <TrainingProgressCard
            session={activeSession}
            onEndSession={onEndSession}
            isEndingSession={isEndingSession}
            overtimeShownSessionId={overtimeShownSessionId}
            setOvertimeShownSessionId={setOvertimeShownSessionId}
          />
        )}
        <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
        {isSchedulesLoading && page === 1 ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height={100} borderRadius={15} />
          ))
        ) : (
          <FlatList
            data={schedules?.results || []}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            onEndReached={loadMore}
            onEndReachedThreshold={0.6}
            refreshing={isManualRefreshLoading}
            onRefresh={onRefresh}
            ListFooterComponent={
              isSchedulesFetching && page > 1 ? <Skeleton height={100} /> : null
            }
            ListEmptyComponent={
              !isSchedulesLoading && (
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
    </View>
  );
};

export default TrainerHomeView;
