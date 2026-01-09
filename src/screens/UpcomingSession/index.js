import React, { useEffect } from "react";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import Header from "../../components/Header";
import GradientCard from "../../components/LinearGradient";
import { fetchWeeklySessionsThunk } from "../../redux/slices/UpcomingSessionSlice";

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
