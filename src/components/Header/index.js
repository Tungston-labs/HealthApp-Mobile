import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import CommonActionModal from "../ModalComponents/index";
import { useDispatch, useSelector } from "react-redux";
import { getClientBMIThunk } from "../../redux/slices/clientBmiSlice";

const Header = ({ subtitle = "" }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const { name, bmi, loading } = useSelector(state => state.clientBmi);

  useEffect(() => {
    dispatch(getClientBMIThunk());
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          Hi, {loading ? "..." : name || "User"}
        </Text>

        <View style={styles.bmiContainer}>
          <Text style={styles.bmiLabel}>BMI</Text>
          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Text style={styles.bmiValue}>{bmi}</Text>
          )}
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
        onConfirm={() => setShowEmergencyModal(false)}
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
