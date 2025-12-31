import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ScheduleCard from '../../components/ScheduleCard';
import styles from './style';
import TrainingProgressCard from '../../components/ProgressBar';
import { format, parse } from 'date-fns';
import Skeleton from '../../components/Skelton';
import Toast from 'react-native-toast-message';
import { useGetTodaysSchedulesQuery } from '../../redux/api/trainer/scheduleApi';

const TrainerHome = () => {
  const navigation = useNavigation();

  const {
    data: schedules = [],
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetTodaysSchedulesQuery();

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

<TrainingProgressCard />


      <Text style={styles.sectionTitle}>Today's Schedule</Text>

      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} height={100} borderRadius={15} margin={10} />
        ))
      ) : schedules?.length === 0 ? (
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
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
        >
          {schedules.map((item, index) => (
            <ScheduleCard
              key={item?.id || index}
              time={
                item?.time
                  ? format(parse(item.time, 'HH:mm:ss', new Date()), 'HH:mm')
                  : '00:00'
              }
              name={item?.client?.name}
              image={item?.client?.profile_pic}
              weight={item?.client?.weight}
              rating={item?.client?.height}
              progress={'need to change'}
              onPress={() => goToScheduleDetail(item?.id)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TrainerHome;
