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
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import TrainerInfoCard from "../TrainerInfoCard";

const workoutOptions = ["Single", "Couple", "Group"];

const TrainerBookingModal = ({ visible, onClose, plan }) => {
  const navigation = useNavigation();

  const [selected, setSelected] = useState("Single");
  const [address, setAddress] = useState("");

  const { loading, data, error } = useSelector(
    (state) => state.trainerDetail
  );

  // ✅ Reset state when modal closes
  useEffect(() => {
    if (!visible) {
      setSelected("Single");
      setAddress("");
    }
  }, [visible]);

  // ✅ Safe price calculation
  const amount = useMemo(() => {
    if (!plan) return 0;

    switch (selected) {
      case "Single":
        return plan.single_price;
      case "Couple":
        return plan.couple_price;
      case "Group":
        return plan.group_price;
      default:
        return 0;
    }
  }, [selected, plan]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close */}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Icon name="close" size={26} color="#000" />
          </TouchableOpacity>

          {/* BODY — always rendered */}
          <View style={{ flex: 1 }}>
            {loading && <ActivityIndicator size="large" />}

            {!loading && error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            {!loading && !error && data && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerSection}>
                  <Image
                    source={
                      data.profile_pic
                        ? { uri: data.profile_pic }
                        : require("../../../assets/trainer2.jpg")
                    }
                    style={styles.profileImage}
                  />

                  <TrainerInfoCard
                    name={data.name}
                    experience={data.experience}
                    sessionTiming={data.section_timing}
                    numSessions={data.no_of_section}
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
                      onPress={() => setSelected(item)}
                      style={[
                        styles.optionBtn,
                        selected === item && styles.optionBtnActive,
                      ]}
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
          {!!data && !loading && (
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.payBtn}
                disabled={!amount}
                onPress={() =>
                  navigation.navigate("Payment", {
                    trainerId: data.id,
                    plan_id: plan.id,
                    booking_type: selected.toLowerCase(),
                    amount: amount,
                    address: address,
                  })
                }
              >
                <Text style={styles.payText}>Pay ₹{amount}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default TrainerBookingModal;
                 