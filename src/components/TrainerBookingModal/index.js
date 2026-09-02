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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { showError, showSuccess } from "../../utils/toast";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import TrainerInfoCard from "../TrainerInfoCard";
import { createChangeTrainerOrder, verifyChangeTrainerPayment, fetchAvailableTrainersAPI, normalizeSlotDays, normalizeTime24 } from "../../services/trainerServices";
import { createTrainerBookingOrder } from "../../services/paymentServices";

import { getCurrentLocation, checkLocationPermission, requestLocationPermission } from "../../utils/location";
import { reverseGeocode } from "../../utils/reverseGeocode";
import LocationDisclosureModal from "../LocationDisclosureModal";

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
  const filters = useSelector((state) => state.trainer?.filters);


  const [selected, setSelected] = useState("Single");
  const [address, setAddress] = useState("");
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [showDisclosureModal, setShowDisclosureModal] = useState(false);

  const { loading, data, error } = useSelector(
    (state) => state.trainerDetail
  );
  const { user } = useSelector((state) => state.auth || {});

  const route = useRoute()
  const bookingMode = mode || "book";
  const displayTrainer = useMemo(() => {
    if (bookingMode === "change") return trainer;
    if (data && Object.keys(data).length > 0) {
      return { ...(trainer || {}), ...data };
    }
    return trainer;
  }, [bookingMode, trainer, data]);

  const selectedTrainerId =
    bookingMode === "change"
      ? trainer?.id
      : trainer?.id || trainerId || data?.id;


  const selectedPlanId =
    plan?.id ||
    planId ||
    data?.plan_id ||
    data?.plan?.id;

  useEffect(() => {
    console.log("PAYMENT PARAMS", route.params);
  }, [route.params]);

  useEffect(() => {
    if (bookingMode === "change") {
      console.log("🧠 CHANGE MODE IDS:", {
        oldTrainerId,
        newTrainerId: selectedTrainerId,
      });
    }
  }, [bookingMode, oldTrainerId, selectedTrainerId]);

  useEffect(() => {
    if (visible) {
      if (user?.address) {
        setAddress(user.address);
      }
    } else {
      setSelected("Single");
      setAddress("");
    }
  }, [visible, user]);

  const fetchLocationData = async () => {
    setFetchingLocation(true);
    try {
      const coords = await getCurrentLocation();
      const fullAddress = await reverseGeocode(
        coords.latitude,
        coords.longitude
      );
      if (fullAddress) {
        setAddress(fullAddress);
      } else {
        showError("Location Error", "Could not resolve address from coordinates.");
      }
    } catch (err) {
      console.log("Error fetching location:", err);
      if (user?.address) {
        setAddress(user.address);
      } else {
        showError("Location Error", "Unable to fetch location. Please enter your address manually.");
      }
    } finally {
      setFetchingLocation(false);
    }
  };

  const handleFetchLocation = async () => {
    const hasPermission = await checkLocationPermission();
    if (hasPermission) {
      fetchLocationData();
    } else {
      setShowDisclosureModal(true);
    }
  };

  const handleAcceptDisclosure = async () => {
    setShowDisclosureModal(false);
    const granted = await requestLocationPermission();
    if (granted) {
      fetchLocationData();
    }
  };

  const handleCancelDisclosure = () => {
    setShowDisclosureModal(false);
  };


  const amount = useMemo(() => {
    if (!displayTrainer) return 0;

    if (bookingMode === "change") {
      return Math.abs(Number(displayTrainer?.price_difference || 0));
    }

    const singleP = displayTrainer?.single_price ?? displayTrainer?.price ?? trainer?.single_price ?? data?.single_price ?? 0;
    const coupleP = displayTrainer?.couple_price ?? trainer?.couple_price ?? data?.couple_price ?? 0;
    const groupP = displayTrainer?.group_price ?? trainer?.group_price ?? data?.group_price ?? 0;

    switch (selected) {
      case "Single":
        return Number(singleP);
      case "Couple":
        return Number(coupleP);
      case "Group":
        return Number(groupP);
      default:
        return Number(singleP);
    }
  }, [bookingMode, selected, displayTrainer, trainer, data]);


  const [submitting, setSubmitting] = useState(false);

  const handlePayment = async () => {
    if (!address.trim()) {
      showError("Address required", "Please enter your address");
      return;
    }

    if (!selectedTrainerId) {
      showError("Trainer unavailable", "Please select a trainer again.");
      return;
    }

    if (displayTrainer?.is_available === false || displayTrainer?.is_booked === true || displayTrainer?.is_booked_for_slot === true) {
      showError("Trainer Unavailable", "This trainer is already booked for the selected session time slot. Please choose another trainer or select a different time slot.");
      return;
    }

    if (!selectedPlanId) {
      showError("Plan unavailable", "Please select a workout plan again before booking.");
      return;
    }

    if (bookingMode === "change" && !oldTrainerId) {
      showError("Trainer unavailable", "Current trainer details are missing.");
      return;
    }

    // 🔹 CHANGE TRAINER + NO PRICE DIFFERENCE
    if (bookingMode === "change" && amount === 0) {
      setSubmitting(true);
      try {
        const res = await verifyChangeTrainerPayment({
          old_trainer_id: oldTrainerId,
          new_trainer_id: selectedTrainerId,
          plan_id: selectedPlanId,
        });

        if (res.data.status) {
          showSuccess("Success", "Trainer changed successfully");
          onClose();
          navigation.navigate("MainApp", {
            screen: "MySessions",
          });
        }
      } catch (err) {
        showError("Error", "Trainer change failed");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // 🚀 PRE-CHECK & CREATE ORDER BEFORE NAVIGATING TO PAYMENT SCREEN
    setSubmitting(true);
    try {
      let orderRes;
      if (bookingMode === "change") {
        orderRes = await createChangeTrainerOrder({
          old_trainer_id: oldTrainerId,
          new_trainer_id: selectedTrainerId,
          plan_id: selectedPlanId,
        });
      } else {
        const getTodayDate = () => new Date().toISOString().split("T")[0];
        const startDate = filters?.start_date || getTodayDate();
        const timeVal = normalizeTime24(filters?.time || "10:00");
        const slotDays = normalizeSlotDays(filters?.slot_days || ["mon", "wed", "fri"]);

        // Pre-check trainer availability against the exact slot BEFORE payment
        const checkRes = await fetchAvailableTrainersAPI({
          plan_id: selectedPlanId,
          start_date: startDate,
          time: timeVal,
          slot_days: slotDays,
          latitude: filters?.latitude,
          longitude: filters?.longitude,
        }).catch(err => err.response);

        const availableTrainers = checkRes?.data?.trainers || [];
        const isTrainerAvailable = availableTrainers.some(
          t => (t.id === selectedTrainerId || t.trainer_id === selectedTrainerId) &&
               t.is_available !== false &&
               t.is_booked !== true &&
               t.is_booked_for_slot !== true
        );

        if (availableTrainers.length > 0 && !isTrainerAvailable) {
          showError(
            "Trainer Unavailable",
            "This trainer is already booked for the selected session time slot. Please choose another trainer or select a different session time."
          );
          setSubmitting(false);
          return;
        }

        orderRes = await createTrainerBookingOrder({
          trainer_id: selectedTrainerId,
          plan_id: selectedPlanId,
          booking_type: selected.toLowerCase(),
          start_date: startDate,
          time: timeVal,
          slot_days: slotDays,
          address: address.trim(),
        });
      }

      const orderData = orderRes?.data;
      onClose();

      navigation.navigate("Payment", {
        mode: bookingMode,
        trainerId: bookingMode === "book" ? selectedTrainerId : undefined,
        new_trainer_id: bookingMode === "change" ? selectedTrainerId : undefined,
        old_trainer_id: oldTrainerId,
        plan_id: selectedPlanId,
        booking_type: selected.toLowerCase(),
        amount,
        address: address.trim(),
        preCreatedOrder: orderData,
      });
    } catch (err) {
      console.log("BOOKING PRE-CHECK ERROR:", err?.response?.data || err?.message);
      const backendData = err?.response?.data;
      let msg = "Trainer is unavailable for the selected session time slot.";

      if (backendData) {
        msg =
          backendData.error ||
          backendData.message ||
          backendData.detail ||
          backendData.non_field_errors?.[0] ||
          (typeof backendData === "string" ? backendData : msg);
      } else if (err?.message) {
        msg = err.message;
      }

      showError("Booking Failed", msg);
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* Close */}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Icon name="close" size={26} color="#000" />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            {!displayTrainer && loading && <ActivityIndicator size="large" style={{ marginTop: 50 }} />}

            {!displayTrainer && !loading && error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            {displayTrainer && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
              >

                {/* Trainer Info */}
                <View style={styles.headerSection}>
                  <Image
                    source={
                      displayTrainer?.profile_pic || displayTrainer?.trainer_profile_pic || displayTrainer?.profile_pic_url
                        ? { uri: displayTrainer.profile_pic || displayTrainer.trainer_profile_pic || displayTrainer.profile_pic_url }
                        : require("../../../assets/trainer2.jpg")
                    }
                    style={styles.profileImage}
                  />
                  <TrainerInfoCard
                    name={displayTrainer?.name || displayTrainer?.trainer_name || "Trainer"}
                    experience={
                      displayTrainer?.years_of_experience ??
                      displayTrainer?.experience ??
                      displayTrainer?.trainer_experience ??
                      0
                    }
                    sessionTiming={displayTrainer?.section_timing || displayTrainer?.session_timing || 20}
                    numSessions={displayTrainer?.no_of_section || displayTrainer?.num_sessions || 12}
                    workoutType={plan?.name || displayTrainer?.plan_name || "Workout"}
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

                  <TouchableOpacity onPress={handleFetchLocation} disabled={fetchingLocation}>
                    {fetchingLocation ? (
                      <ActivityIndicator size="small" color="#EF0707" style={{ marginRight: 5 }} />
                    ) : (
                      <Text style={styles.addNewText}>
                        + Add New
                      </Text>
                    )}
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

          {displayTrainer && (
            <View style={styles.footer}>

              <TouchableOpacity
                style={[
                  styles.payBtn,
                  (!address.trim() || submitting) && {
                    opacity: 0.6,
                  },
                ]}
                disabled={!address.trim() || submitting}
                onPress={handlePayment}
              >
                {submitting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.payText}>
                    {bookingMode === "change"
                      ? "Change-Pay ₹"
                      : "Pay ₹"}
                    {amount}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

        </KeyboardAvoidingView>
      </View>
      <LocationDisclosureModal
        visible={showDisclosureModal}
        onAccept={handleAcceptDisclosure}
        onCancel={handleCancelDisclosure}
      />
    </Modal>
  );
};

export default TrainerBookingModal;