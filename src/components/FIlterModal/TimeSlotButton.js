import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

const TimeSlotButton = ({ label, active }) => {
  return (
    <TouchableOpacity
      style={[styles.timeBtn, active ? styles.activeTimeBtn : null]}
    >
      <Text style={active ? styles.timeTextActive : styles.timeTextInactive}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TimeSlotButton;
