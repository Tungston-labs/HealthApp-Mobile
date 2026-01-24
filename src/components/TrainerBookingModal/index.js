import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import TrainerInfoCard from "../TrainerInfoCard";

const workoutOptions = ["Single", "Couple", "Group"];

const TrainerBookingModal = ({
  visible,
  onClose,
  plan,
  trainer,
  mode,
  oldTrainerId,
}) => {


  const navigation = useNavigation();

  const [selected, setSelected] = useState("Single");
  const [address, setAddress] = useState("");

  const { loading, data, error } = useSelector(
    (state) => state.trainerDetail
  );

  useEffect(() => {
  if (mode === "change") {
    console.log("🧠 CHANGE MODE IDS:", {
      oldTrainerId,
      newTrainerId: trainer?.id,
    });
  }
}, [mode, oldTrainerId, trainer]);


  // Reset modal fields when it closes
  useEffect(() => {
    if (!visible) {
      setSelected("Single");
      setAddress("");
    }
  }, [visible]);

  // ✅ Amount logic
  const amount = useMemo(() => {
    if (!data && !trainer) return 0;

    if (mode === "change") {
      // Use price_difference from backend
      return Math.abs(Number(trainer?.price_difference || 0));
    }

    // Book mode → use selected type from trainerDetail
    switch (selected) {
      case "Single":
        return Number(data?.single_price || 0);
      case "Couple":
        return Number(data?.couple_price || 0);
      case "Group":
        return Number(data?.group_price || 0);
      default:
        return 0;
    }
  }, [mode, selected, data, trainer]);

  const handlePayment = () => {
    if (!address.trim()) {
      Alert.alert("Address required", "Please enter your address");
      return;
    }
console.log({trainer});

 navigation.navigate("Payment", {
  mode,
  new_trainer_id: trainer?.id,   // ✅ NEW trainer
  old_trainer_id: oldTrainerId,  // ✅ OLD trainer
  plan_id: plan.id,
  booking_type: selected.toLowerCase(),
  amount,
});



  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>

          {/* Close */}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Icon name="close" size={26} color="#000" />
          </TouchableOpacity>

          {/* Body */}
          <View style={{ flex: 1 }}>
            {loading && <ActivityIndicator size="large" />}
            {!loading && error && (
              <Text style={styles.errorText}>{error}</Text>
            )}
            {!loading && !error && (data || trainer) && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerSection}>
                  <Image
                    source={
                      (data?.profile_pic || trainer?.profile_pic)
                        ? { uri: data?.profile_pic || trainer?.profile_pic }
                        : require("../../../assets/trainer2.jpg")
                    }
                    style={styles.profileImage}
                  />

                  <TrainerInfoCard
                    name={data?.name || trainer?.name}
                    experience={data?.experience || trainer?.experience}
                    sessionTiming={data?.section_timing || trainer?.section_timing}
                    numSessions={data?.no_of_section || trainer?.no_of_section}
                    workoutType={plan?.name}
                  />
                </View>

                <Text style={styles.sectionTitle}>
                  Choose your workout type
                </Text>

                <View style={styles.optionRow}>
                  {workoutOptions.map((item) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => {
                        if (mode !== "change") setSelected(item);
                      }}
                      style={[
                        styles.optionBtn,
                        selected === item && styles.optionBtnActive,
                        mode === "change" && { opacity: 0.6 } // visually disabled
                      ]}
                      disabled={mode === "change"}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selected === item && styles.optionTextActive,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
                  Address
                </Text>

                <TextInput
                  style={styles.addressInput}
                  multiline
                  placeholder="Enter your address"
                  value={address}
                  onChangeText={setAddress}
                />
              </ScrollView>
            )}
          </View>

          {/* Footer */}
          {(data || trainer) && !loading && (
            <View style={styles.footer}>
              <TouchableOpacity
                style={[
                  styles.payBtn,
                  (!address.trim()) && { opacity: 0.6 },
                ]}
                disabled={!address.trim()}
                onPress={handlePayment}
              >
                <Text style={styles.payText}>
                  {mode === "change" ? "Price Difference: ₹" : "Pay ₹"}
                  {amount}
                </Text>
              </TouchableOpacity>
            </View>
          )}

        </View>
      </View>
    </Modal>
  );
};

export default TrainerBookingModal;
