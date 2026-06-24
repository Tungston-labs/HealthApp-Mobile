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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import TrainerInfoCard from "../TrainerInfoCard";
import { verifyChangeTrainerPayment } from "../../services/trainerServices";

const workoutOptions = ["Single", "Couple", "Group"];

const TrainerBookingModal = ({
  visible,
  onClose,
  plan,
  trainer,
  trainerId,
  planId,
  mode,
  oldTrainerId,
}) => {

  const navigation = useNavigation();

  const [selected, setSelected] = useState("Single");
  const [address, setAddress] = useState("");

  const { loading, data, error } = useSelector(
    (state) => state.trainerDetail
  );
const route=useRoute()
  const bookingMode = mode || "book";
  const selectedTrainerId = trainer?.id || trainerId || data?.id;
  const selectedPlanId = plan?.id || planId || data?.plan_id || data?.plan?.id;
useEffect(() => {
  console.log("PAYMENT PARAMS", route.params);
}, []);
  useEffect(() => {
    if (bookingMode === "change") {
      console.log("🧠 CHANGE MODE IDS:", {
        oldTrainerId,
        newTrainerId: selectedTrainerId,
      });
    }
  }, [bookingMode, oldTrainerId, selectedTrainerId]);

  useEffect(() => {
    if (!visible) {
      setSelected("Single");
      setAddress("");
    }
  }, [visible]);

  const amount = useMemo(() => {
    if (!data && !trainer) return 0;

    if (bookingMode === "change") {
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
  }, [bookingMode, selected, data, trainer]);

  const handlePayment = async () => {
    if (!address.trim()) {
      Alert.alert("Address required", "Please enter your address");
      return;
    }

    // 🔹 CHANGE TRAINER + NO PRICE DIFFERENCE
    if (!selectedTrainerId) {
      Alert.alert("Trainer unavailable", "Please select a trainer again.");
      return;
    }

    if (!selectedPlanId) {
      Alert.alert("Plan unavailable", "Please select a workout plan again before booking.");
      return;
    }

    if (bookingMode === "change" && !oldTrainerId) {
      Alert.alert("Trainer unavailable", "Current trainer details are missing.");
      return;
    }

    // 🔹 CHANGE TRAINER + NO PRICE DIFFERENCE
    if (bookingMode === "change" && amount === 0) {
      try {
        const res = await verifyChangeTrainerPayment({
          old_trainer_id: oldTrainerId,
          new_trainer_id: selectedTrainerId,
          plan_id: selectedPlanId,
        });

        if (res.data.status) {
          Alert.alert("Success", "Trainer changed successfully");
          onClose();
navigation.navigate("MainApp", {
  screen: "MySessions",
});        }
      } catch (err) {
        Alert.alert("Error", "Trainer change failed");
      }
      return; // ⛔ STOP – no navigation
    }
    onClose()
    navigation.navigate("Payment", {
      mode: bookingMode,
      trainerId: bookingMode === "book" ? selectedTrainerId : undefined,
      new_trainer_id: bookingMode === "change" ? selectedTrainerId : undefined,
      old_trainer_id: oldTrainerId,
      plan_id: selectedPlanId,
      booking_type: selected.toLowerCase(),
      amount,
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* Close */}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Icon name="close" size={26} color="#000" />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            {loading && <ActivityIndicator size="large" />}

            {!loading && error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            {!loading && !error && (data || trainer) && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
              >
                {/* Trainer Info */}
                <View style={styles.headerSection}>
                  <Image
                    source={
                      data?.profile_pic || trainer?.profile_pic
                        ? {
                          uri:
                            data?.profile_pic ||
                            trainer?.profile_pic,
                        }
                        : require("../../../assets/trainer2.jpg")
                    }
                    style={styles.profileImage}
                  />

                  <TrainerInfoCard
                    name={data?.name || trainer?.name}
                    experience={data?.experience || trainer?.experience}
                    sessionTiming={
                      data?.section_timing ||
                      trainer?.section_timing
                    }
                    numSessions={
                      data?.no_of_section ||
                      trainer?.no_of_section
                    }
                    workoutType={plan?.name || data?.plan_name}
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
                        if (bookingMode !== "change") {
                          setSelected(item);
                        }
                      }}
                      style={[
                        styles.optionBtn,
                        selected === item &&
                        styles.optionBtnActive,
                        bookingMode === "change" && {
                          opacity: 0.6,
                        },
                      ]}
                      disabled={bookingMode === "change"}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selected === item &&
                          styles.optionTextActive,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Address Header */}
                <View style={styles.addressHeader}>
                  <Text style={styles.sectionTitle}>
                    Address
                  </Text>

                  <TouchableOpacity>
                    <Text style={styles.addNewText}>
                      + Add New
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Address Input */}
                <TextInput
                  style={styles.addressInput}
                  multiline
                  scrollEnabled={true}
                  placeholder="Enter your address"
                  value={address}
                  onChangeText={setAddress}
                  textAlignVertical="top"
                />

                {/* Extra Space for Footer */}
                <View style={{ height: 100 }} />
              </ScrollView>
            )}
          </View>

          {(data || trainer) && !loading && (
            <View style={styles.footer}>
              <TouchableOpacity
                style={[
                  styles.payBtn,
                  !address.trim() && {
                    opacity: 0.6,
                  },
                ]}
                disabled={!address.trim()}
                onPress={handlePayment}
              >
                <Text style={styles.payText}>
                  {bookingMode === "change"
                    ? "Change-Pay ₹"
                    : "Pay ₹"}
                  {amount}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default TrainerBookingModal;