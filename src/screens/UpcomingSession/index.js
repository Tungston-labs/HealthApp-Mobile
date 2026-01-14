import React, { useEffect } from "react";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import Header from "../../components/Header";
import GradientCard from "../../components/LinearGradient";
import { fetchWeeklySessionsThunk } from "../../redux/slices/UpcomingSessionSlice";

const PLAN_DATA = [
  {
    id: "1",
    plan_name: "Weight Loss",
    plan_type: "3_days",
    single_price: 999,
    upload_file: "https://via.placeholder.com/300",
  },
  {
    id: "2",
    plan_name: "Muscle Gain",
    plan_type: "6_days",
    single_price: 1499,
    upload_file: "https://via.placeholder.com/300",
  },
  {
    id: "3",
    plan_name: "Yoga",
    plan_type: "3_days",
    single_price: 799,
    upload_file: "https://via.placeholder.com/300",
  },
  {
    id: "4",
    plan_name: "Cardio",
    plan_type: "6_days",
    single_price: 1199,
    upload_file: "https://via.placeholder.com/300",
  },
];

const UpcomingSession = () => {
  const dispatch = useDispatch();
console.log("🔥 UpcomingSession screen rendered");
  const { sessions, loading } = useSelector(
    (state) => state.weeklySessions
  );
console.log("Thunk ref 👉", fetchWeeklySessionsThunk);

useEffect(() => {
  dispatch(fetchWeeklySessionsThunk());
}, [dispatch]);

console.log("Weekly sessions:", sessions);

  return (
    <View style={styles.container}>
      <Header username="Jain" />
      <GradientCard />

      <Text style={styles.sectionTitle}>Upcoming sessions</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 150 }}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 40 }}>
              No upcoming sessions
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.sessionCard}>
              <Image
                source={{ uri: item.trainer_profile_pic }}
                style={styles.sessionImage}
              />

              <View style={styles.sessionInfo}>
                <Text style={styles.trainerName}>
                  {item.trainer_name}
                </Text>

                <Text style={styles.timeLabel}>Time</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>

              <View style={styles.dayButton}>
                <Text style={styles.dayButtonText}>
                  {item.day}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default UpcomingSession;
