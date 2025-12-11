import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const HistoryCard = ({ item }) => {
  const navigation = useNavigation();

  return (
  <TouchableOpacity
      style={styles.card}
      onPress={() =>navigation.navigate("Session", {
  screen: "SingleSession",
  params: { session: item },
})
      }
    >
      <Image source={item.image} style={styles.profileImage} />

      <View style={styles.contentContainer}>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Experience</Text>
            <Text style={styles.value}>{item.experience}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Session Timing</Text>
            <View style={styles.valueRow}>
              <Icon name="time-outline" size={16} color="#000" />
              <Text style={styles.valueWithIcon}>{item.sessionTiming}</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>No. of Sessions</Text>
            <View style={styles.valueRow}>
              <Icon name="barbell-outline" size={16} color="#000" />
              <Text style={styles.valueWithIcon}>{item.numSessions}</Text>
            </View>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Workout Plan</Text>
            <Text style={styles.value}>{item.workoutPlan}</Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default HistoryCard;
