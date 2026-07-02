import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";

const GradientCard = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
      >
        <LinearGradient
          colors={["#D3DAE4", "#D3DAE4", "#EF0707", "#EF0707"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.25, 0.25, 1]}
          style={styles.card}
        >
          <Image
            source={require("../../../assets/upcoming.png")}
            style={styles.overlayImage}
          />

          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Get personalized plans from pro nutritionists — stay consistent,
              stay healthy
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default GradientCard;