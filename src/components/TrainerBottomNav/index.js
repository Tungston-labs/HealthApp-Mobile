import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";

const TrainerBottomNav = ({ state, navigation }) => {
  const icons = {
    TrainerHome: "home-outline",
    TrainerAssignedClients: "barbell-outline",

    Session: "grid-outline",
    ProfileScreenTrainer: "person-outline",
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[
              styles.iconWrapper,
              isFocused && styles.activeIconWrapper,
            ]}
            activeOpacity={0.8}
          >
            <Icon
              name={icons[route.name]}
              size={22}
              color={isFocused ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TrainerBottomNav;

