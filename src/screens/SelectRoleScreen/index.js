import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

export default function SelectRoleScreen() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  // Animated scale values
  const trainerScale = useRef(new Animated.Value(1)).current;
  const userScale = useRef(new Animated.Value(1)).current;

  const selectRole = (role) => {
    setSelected(role);

    // Animate scale for trainer card
    Animated.spring(trainerScale, {
      toValue: role === "trainer" ? 1.08 : 1,
      useNativeDriver: true,
    }).start();

    // Animate scale for user card
    Animated.spring(userScale, {
      toValue: role === "user" ? 1.08 : 1,
      useNativeDriver: true,
    }).start();

    // Immediately navigate after selection
    if (role === "trainer") {
      navigation.navigate("CreateAccount"); 
    } else if (role === "user") {
      navigation.navigate("SignupDetailsScreenUser");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Sign up as</Text>
      </View>

      {/* Center Content */}
      <View style={styles.centerWrapper}>
        <Text style={styles.subtitle}>
          Choose your role to create{"\n"}the right experience for you.
        </Text>
        <Text style={styles.subText}>Join as a User or Trainer.</Text>

        {/* Role Cards */}
        <View style={styles.cardRow}>
          {/* Trainer Card */}
          <Animated.View
            style={[
              styles.card,
              selected === "trainer" && styles.activeCard,
              { transform: [{ scale: trainerScale }] },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => selectRole("trainer")}
              style={{ flex: 1 }}
            >
              <ImageBackground
                source={require("../../../assets/trainer.png")}
                style={styles.cardImage}
                imageStyle={styles.cardImageStyle}
              >
                <Text style={styles.cardLabel}>Trainer</Text>
              </ImageBackground>
            </TouchableOpacity>
          </Animated.View>

          {/* User Card */}
          <Animated.View
            style={[
              styles.card,
              selected === "user" && styles.activeCard,
              { transform: [{ scale: userScale }] },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => selectRole("user")}
              style={{ flex: 1 }}
            >
              <ImageBackground
                source={require("../../../assets/user2.png")}
                style={styles.cardImage}
                imageStyle={styles.cardImageStyle}
              >
                <Text style={styles.cardLabel}>User</Text>
              </ImageBackground>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}
