import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HistoryCard = ({ item }) => {
  const navigation = useNavigation();

  const formatTime = (time) => time?.slice(0, 5) || "N/A";

  return (
  <TouchableOpacity
  style={styles.card}
  onPress={() =>
    navigation.navigate("SingleSessionHistory", {
      session: item,
    })
  }
>

      {/* Trainer Image */}
      <Image
        source={{
          uri:
            item.trainer?.profile_pic ||
            "https://via.placeholder.com/150",
        }}
        style={styles.profileImage}
      />

      <View style={styles.contentContainer}>
        {/* Row 1 – Trainer Name */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.namevalue}>
              {item.trainer?.name || "N/A"}
            </Text>
          </View>
        </View>

        {/* Row 2 – Workout Plan & Time */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Workout Plan</Text>
            <Text style={styles.value}>
              {item.plan?.name || "Custom Plan"}
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Session Time</Text>
            <View style={styles.valueRow}>
              <Icon name="time-outline" size={16} color="#000" />
              <Text style={styles.valueWithIcon}>
                {formatTime(item.time)}
              </Text>
            </View>
          </View>
        </View>

        {/* Row 3 – Date */}
      
<View style={styles.row}>
  <View style={styles.column}>
    <Text style={styles.label}>Date</Text>

    <View style={styles.valueRow}>
      <Ionicons
        name="calendar-outline"
        size={16}
        color="#000"
        style={{ marginRight: 8 }}
      />
      <Text style={styles.value}>
        {item.date || "N/A"}
      </Text>
    </View>
  </View>
</View>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryCard;
