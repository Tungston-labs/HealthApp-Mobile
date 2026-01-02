import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const HistoryCard = ({ item }) => {
  const navigation = useNavigation();

  const {
    client,
    time,
    time_label,
    session_number,
    total_sessions,
    date,
    status,
  } = item;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Session", {
          screen: "SingleSession",
          params: { session: item },
        })
      }
    >
      {/* Profile Image */}
      <Image
        source={
          client?.profile_pic_url
            ? { uri: client.profile_pic_url }
            : require("../../../assets/trainer2.jpg")
        }
        style={styles.profileImage}
      />
              

      <View style={styles.contentContainer}>
        {/* Row 1 */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Client Name</Text>
            <Text style={styles.value}>{client?.name || "N/A"}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Session Time</Text>
            <View style={styles.valueRow}>
              <Icon name="time-outline" size={16} color="#000" />
              <Text style={styles.valueWithIcon}>
                {time} ({time_label})
              </Text>
            </View>
          </View>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Sessions</Text>
            <View style={styles.valueRow}>
              <Icon name="barbell-outline" size={16} color="#000" />
              <Text style={styles.valueWithIcon}>
                {session_number}/{total_sessions}
              </Text>
            </View>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Status</Text>
            <Text
              style={[
                styles.value,
                { color: status === "completed" ? "green" : "#ff9800" },
              ]}
            >
              {status}
            </Text>
          </View>
        </View>

        {/* Date */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Session Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryCard;
