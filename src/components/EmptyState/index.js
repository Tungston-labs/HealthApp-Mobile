import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const EmptyState = ({
  title = "No Data Found",
  subtitle = "Please check back later",
  image,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        resizeMode="contain"
        style={styles.image}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default EmptyState;
