import LinearGradient from "react-native-linear-gradient";
import { Dimensions, View } from "react-native";

const { width: SCREEN_W } = Dimensions.get("window");

const BackgroundCurve = ({ circleMultiplier = 3.2, imageCenterY = 140 }) => {
  const circleSize = SCREEN_W * circleMultiplier;
  const top = imageCenterY - circleSize / 2;

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: (SCREEN_W - circleSize) / 2,
        top,
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <LinearGradient
        colors={["#F3F1FA", "#ECEBF6"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}
      />
    </View>
  );
};
export default BackgroundCurve;