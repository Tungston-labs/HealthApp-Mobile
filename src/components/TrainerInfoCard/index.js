// components/TrainerInfoCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from './styles'
const TrainerInfoCard = ({ name, experience, sessionTiming, numSessions,workoutType }) => {
  return (
    <View style={styles.infoSection}>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Experience</Text>
          <Text style={styles.value}>{experience}</Text>
        </View>

        <View>
          <Text style={styles.label}>Session timing</Text>
          <Text style={styles.value}>{sessionTiming}</Text>
        </View>
      </View>

      <View style={styles.rowSingle}>
        <View>
          <Text style={styles.label}>No of sessions</Text>
          <Text style={styles.value}>{numSessions}</Text>
        </View>
          <View>
          <Text style={styles.label}>Workout type</Text>
          <Text style={styles.value}>{workoutType}</Text>
        </View>
      </View>
    </View>
  );
};
export default TrainerInfoCard;
