import React from "react";
import { View, Image, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";

const GradientCard = () => {
  return (
    <View style={styles.container}>
   <LinearGradient
  colors={["#D3DAE4", "#D3DAE4", "#7774F4", "#7774F4"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  locations={[0, 0.25, 0.25, 1]}
  style={styles.card}
>

        {/* Left Image overlay */}
        <Image
          source={require("../../../assets/upcoming.png")}
          style={styles.overlayImage}
        />

        {/* Text Section */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Get personalized plans from pro nutritionists — stay consistent,
            stay healthy
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default GradientCard;
