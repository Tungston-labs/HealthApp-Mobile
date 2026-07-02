import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const BottomNav = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const icons = {
            workout: "home-outline",
            Session: "barbell-outline",
            sessionhistory: "grid-outline",
            profile: "person-outline",
          };

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
    </View>
  );
};

export default BottomNav;