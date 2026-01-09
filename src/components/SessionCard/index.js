import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./style";
import Icon from "react-native-vector-icons/Ionicons";

const formatTime = (time) => {
  if (!time) return "--";
  return time.slice(0, 5); // HH:mm
};

const SessionCard = ({
  clientName,
  sessionDate,
  sessionCount,
  profilePic,
  time,
  endTime
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.mainRow}>
        {/* LEFT IMAGE */}
        <Image
          source={
            profilePic
              ? { uri: profilePic }
              : require("../../../assets/user2.png")
          }
          style={styles.avatar}
        />

        {/* RIGHT CONTENT */}
        <View style={styles.rightContent}>
          {/* TOP */}
          <View style={styles.topRow}>
            <View>
              <Text style={styles.name}>{clientName}</Text>

              <View style={styles.timeRow}>
                <Icon name="time-outline" size={14} color="#9A9A9A" />
                <Text style={styles.timeText}>{sessionDate}</Text>
              </View>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>{sessionCount}</Text>
            </View>
          </View>

          {/* BOTTOM */}
          <View style={styles.bottomRow}>
            <View>
              <Text style={styles.label}>Start time</Text>
              <Text style={styles.date}>{formatTime(time)}</Text>
            </View>

            <View>
              <Text style={styles.label}>End time</Text>
              <Text style={styles.date}>{formatTime(endTime)}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SessionCard;
