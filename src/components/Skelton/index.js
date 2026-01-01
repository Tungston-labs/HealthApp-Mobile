import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./style";

const Skeleton = ({
  width = "100%",
  height = 16,
  borderRadius = 8,
  marginVertical = 6,
}) => {
  const shimmer = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.6,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-250, 250],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          marginVertical,
          opacity: pulse,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.shimmerWrapper,
          { transform: [{ translateX }] },
        ]}
      >
        <LinearGradient
          colors={["#E5E5E5", "#FFFFFF", "#E5E5E5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default Skeleton;
