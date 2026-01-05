import React from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";

const AssignedClientCard = () => {
  return (
    <View style={styles.card}>
      {/* Avatar */}
      <Image
        source={require("../../../assets/trainer2.jpg")}
        style={styles.avatar}
      />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>John Mike</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Icon name="fitness-outline" size={14} color="#777" />
            <Text style={styles.metaText}>75 KG</Text>
          </View>

          <View style={styles.metaItem}>
            <Icon name="flame-outline" size={14} color="#777" />
            <Text style={styles.metaText}>5.5</Text>
          </View>

          <View style={styles.metaItem}>
            <Icon name="time-outline" size={14} color="#777" />
            <Text style={styles.metaText}>Session Time : 8:45</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AssignedClientCard;
