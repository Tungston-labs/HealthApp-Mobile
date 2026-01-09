

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style";

const SessionCard = ({
  clientName,
  address,
  sessionDate,
  timeLabel,
  status,
  sessionCount,
  duration,
  profilePic,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Image
          source={
            profilePic
              ? { uri: profilePic }
              : require("../../../assets/user2.png")
          }
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{clientName}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>

        <Text style={styles.status}>{status}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <Text>{sessionDate}</Text>
        <Text>{timeLabel}</Text>
        <Text>{duration}</Text>
        <Text>{sessionCount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SessionCard;
