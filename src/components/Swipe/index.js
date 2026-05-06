import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    justifyContent: "center",
    elevation: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Montserrat_700Bold",
  },
});

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ClickButton = ({
  width = 320,
  height = 50,
  title = "Punch In",
  successTitle = "Punched In",
  onPress,
  backgroundColor ="#EF0707" ,
  activeColor = "#E2E2FF",
  textColor = "#fff",
  fontSize = 17,
  borderRadius = 150,
  icon = "finger-print-outline",
  resetAfterSuccess = true,
}) => {
  const scale = useSharedValue(1);
  const progress = useSharedValue(0);
  const [pressed, setPressed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [backgroundColor, activeColor]
    ),
  }));

  const handlePress = () => {
    setPressed(true);
    onPress?.();

    progress.value = withTiming(1, { duration: 300 });

    if (resetAfterSuccess) {
      setTimeout(() => {
        progress.value = withTiming(0, { duration: 300 });
        setPressed(false);
      }, 1500);
    }
  };

  return (
    <AnimatedPressable
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={handlePress}
      style={[
        styles.button,
        { width, height, borderRadius },
        animatedStyle,
      ]}
    >
      <View style={styles.content}>
        {icon && (
          <Ionicons
            name={icon}
            size={22}
            color={pressed ? "#000" : textColor}
            style={{ marginRight: 8 }}
          />
        )}
        <Text
          style={[
            styles.text,
            { color: pressed ? "#000" : textColor, fontSize },
          ]}
        >
          {pressed ? successTitle : title}
        </Text>
      </View>
    </AnimatedPressable>
  );
};

export default ClickButton;
