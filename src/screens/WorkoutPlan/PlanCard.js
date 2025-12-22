// screens/WorkoutPlan/PlanCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style";

const PlanCard = ({ item, onPress }) => {
  return (
 <TouchableOpacity
  activeOpacity={0.9}
  style={styles.card}
  onPress={onPress}
>
      {/* Background Image */}
      <Image
        source={item.image}
        style={styles.cardImage}
        resizeMode="cover"
          pointerEvents="none"

      />

      <View style={styles.overlay} />

      <View style={styles.textContainer}>
        <Text style={styles.planName}>{item.plan_name}</Text>
        <Text style={styles.planType}>
          {item.plan_type === "3_days" ? "3 Days Plan" : "6 Days Plan"}
        </Text>
        <Text style={styles.planPrice}>₹{item.single_price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlanCard;
