import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../../Images/run.png"),
    title: "Welcome to your\nfitness space.",
    subtitle: "Healthy habits begin at home.",
  },
  {
    id: "2",
    image: require("../../Images/cycle.png"),
    title: "Welcome to your\nfitness space.",
    subtitle: "Stay active, stay balanced, stay home.",
  },
  {
    id: "3",
    image: require("../../Images/swim.png"),
    title: "Welcome to your\nfitness space.",
    subtitle: "Make your body healthier and stronger.",
  },
];

export default function Welcome() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const slideIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (slideIndex.current === slides.length - 1) {
        clearInterval(interval);

        navigation.replace("Login");
        return;
      }
      slideIndex.current += 1;
      flatListRef.current?.scrollToOffset({
        offset: slideIndex.current * width,
        animated: true,
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.bottomContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.indicatorWrapper}>
        <View style={styles.indicatorBackground} />
        <Animated.View
          style={[
            styles.indicatorFill,
            {
              left: scrollX.interpolate({
                inputRange: [0, width, width * 2],
                outputRange: ["0%", "33%", "66%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}
