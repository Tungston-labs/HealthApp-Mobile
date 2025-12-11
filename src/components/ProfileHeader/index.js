import React from "react";
import { View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Svg, { Path } from "react-native-svg";
import styles from "./styles";

const ProfileHeaderCard = ({ profileImage, name }) => {
  return (
    <View style={styles.wrapper}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#ECEBF6", "#FFFFFF"]} 
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.title}>Profile</Text>

        <View style={styles.imageWrapper}>
          <Image source={profileImage} style={styles.image} />
        </View>

        <Text style={styles.name}>{name}</Text>
      </LinearGradient>

      {/* Inverted (Concave) Curve */}
      <Svg
        width="100%"
        height="90"
        viewBox="0 0 400 90"
        style={styles.curve}
      >
        <Path
          d="
            M0 0 
            Q200 140 400 0 
            L400 90 
            L0 90 
            Z
          "
          fill="#FFFFFF"
        />
      </Svg>
    </View>
  );
};

export default ProfileHeaderCard;
