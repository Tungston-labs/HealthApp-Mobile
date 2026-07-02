import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GradientCard from "../../components/LinearGradient";
import { fetchWeeklySessionsThunk } from "../../redux/slices/UpcomingSessionSlice";
import styles from "./styles";

const UpcomingSessionSection = ({
  onConsultPress,
  loading,
  sessions,
}) => {


  return (
    <View>
<GradientCard onPress={onConsultPress} />
      <Text style={styles.sectionTitle}>Up-coming sessions</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
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

export default UpcomingSessionSection;
