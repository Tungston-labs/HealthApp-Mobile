import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./style";
const Skeleton = ({
  width = "100%",
  height = 16,
  borderRadius = 6,
  margin = 6,
}) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1600,
        easing: (t) => t * t * (3 - 2 * t),
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],  
  });

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          margin,
        },
      ]}
    >
      <Animated.View
        style={[styles.gradientWrapper, { transform: [{ translateX }] }]}
      >
        <LinearGradient
          colors={["#e0e0e0", "#ffffff90", "#e0e0e0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};


export default Skeleton;
