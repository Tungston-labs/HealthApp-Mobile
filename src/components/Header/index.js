import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import CommonActionModal from "../ModalComponents/index";

const Header = ({
  username = "User",
  subtitle = "",
  bmiValue = "22.5",
}) => {
  const navigation = useNavigation();
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const handleEmergencyCall = () => {
    setShowEmergencyModal(false);
  
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Hi, {username}</Text>

        <View style={styles.bmiContainer}>
          <Text style={styles.bmiLabel}>BMI</Text>
          <Text style={styles.bmiValue}>{bmiValue}</Text>
        </View>

        <Text style={styles.subheading}>{subtitle}</Text>
      </View>

      <TouchableOpacity
        style={styles.callIcon}
        onPress={() => setShowEmergencyModal(true)}
      >
        <Icon name="call" size={22} color="#fff" />
      </TouchableOpacity>

      <CommonActionModal
        visible={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        onConfirm={handleEmergencyCall}
        iconName="call-outline"
        iconColor="green"
        title="Confirm Emergency Call"
        description="Are you sure you want to make an emergency call?"
        cancelText="Cancel"
        confirmText="Call now"
        showDropdown={false}
        showNote={false}
      />
    </View>
  );
};

export default Header;
