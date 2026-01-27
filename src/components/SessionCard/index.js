import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./style";
import Icon from "react-native-vector-icons/Ionicons";

const SessionCard = ({
  clientName,
  sessionDate,
  timeLabel,
  status,
  sessionCount,
  profilePic,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.mainRow}>
        <Image
          source={
            profilePic
              ? { uri: profilePic }
              : require("../../../assets/user2.png")
          }
          style={styles.avatar}
        />
        <View style={styles.rightContent}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.name}>{clientName}</Text>
              <View style={styles.timeRow}>
                <Icon name="time-outline" size={14} color="#9A9A9A" />
                <Text style={styles.timeText}>{timeLabel}</Text>
              </View>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{sessionCount}</Text>
            </View>
          </View>
          <View style={styles.bottomRow}>
            <View>
              <Text style={styles.label}>start date</Text>
              <Text style={styles.date}>{sessionDate}</Text>
            </View>
            <View>
              <Text style={styles.label}>End date</Text>
              <Text style={styles.date}>{status}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SessionCard;
