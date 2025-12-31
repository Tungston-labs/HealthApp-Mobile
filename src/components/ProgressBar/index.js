import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const TrainingProgressCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.dot} />
          <Text style={styles.title}>Training progress</Text>
        </View>

        <View style={styles.dayBadge}>
          <Text style={styles.dayText}>Day 1</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressActive} />
        <View style={styles.progressInactive} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.startedText}>Started</Text>

        <View style={styles.timeRow}>
          <Icon name="time-outline" size={16} color="#B0B0B0" />
          <Text style={styles.timeText}>00.00.00</Text>
        </View>
      </View>
    </View>
  );
};

export default TrainingProgressCard;
