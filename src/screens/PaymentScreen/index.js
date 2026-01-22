import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import RazorpayCheckout from "react-native-razorpay";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import HeaderWithBack from "../../components/HeaderWithBack";
import PaymentSuccessModal from "../../components/PaymentSuccessModal";
import TrainerInfoCard from "../../components/TrainerInfoCard";
import { fetchTrainerDetailThunk } from "../../redux/slices/trainerDetailSlice";
import {
  createTrainerBookingOrder,
  verifyTrainerPayment,
} from "../../services/paymentServices";

const PaymentScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  // ✅ Params from previous screen
  const {
    trainerId,
    plan_id,
    booking_type,
    amount,
    start_date,
    time,
    slot_days,
  } = route.params;

  const { loading, data, error } = useSelector(
    (state) => state.trainerDetail
  );

  const [selectedMethod, setSelectedMethod] = useState("razorpay");
  const [showSuccess, setShowSuccess] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (trainerId) {
      dispatch(fetchTrainerDetailThunk(trainerId));
    }
  }, [dispatch, trainerId]);

  const openRazorpay = async () => {
    // ✅ Ensure plan_id exists
    if (!plan_id) {
      Alert.alert("Error", "Plan ID is missing. Please select a plan.");
      return;
    }

    try {
      setPaying(true);

      const payload = {
        trainer_id: trainerId,
        plan_id,
        booking_type,
      };

      console.log("Booking payload:", payload);

      // 1️⃣ Create order
      const orderRes = await createTrainerBookingOrder(payload);
      const { order_id, amount: orderAmount, key } = orderRes.data;

      const options = {
        key,
        amount: Math.round(orderAmount * 100), // in paise
        currency: "INR",
        name: "HealthApp",
        description: "Trainer booking",
        order_id,
        theme: { color: "#4CAF50" },
      };

      console.log("RAZORPAY OPTIONS:", options);

      // 2️⃣ Open Razorpay
      const response = await RazorpayCheckout.open(options);

      console.log("PAYMENT SUCCESS:", response);

      // 3️⃣ Verify payment
      await verifyTrainerPayment({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        start_date,
        time,
        slot_days,
      });

      setShowSuccess(true);
    } catch (error) {
      console.log("PAYMENT ERROR:", error?.response?.data || error.message || error);
      Alert.alert("Error", "Unable to initiate payment");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text>Unable to load trainer details</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack title="Payment" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trainer Info */}
        <Text style={styles.sectionTitle}>Trainer info</Text>
        <View style={styles.separator} />

        <View style={styles.workoutPlan}>
          <Text style={styles.label}>Workout Plan - {data.plan_name}</Text>
          <Text style={styles.label}>Workout Type - {booking_type}</Text>
        </View>

        <View style={styles.trainerBox}>
          <Image
            source={
              data.profile_pic
                ? { uri: data.profile_pic }
                : require("../../../assets/trainer2.jpg")
            }
            style={styles.trainerImg}
          />
          <TrainerInfoCard
            name={data.name}
            experience={data.experience}
            sessionTiming={data.section_timing}
            numSessions={data.no_of_section}
            workoutType={data.plan_name}
          />
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Preferred payment method</Text>
        <View style={styles.separator} />

        <TouchableOpacity
          style={[
            styles.paymentCard,
            selectedMethod === "razorpay" && styles.paymentCardActive,
          ]}
          onPress={() => setSelectedMethod("razorpay")}
        >
          <Text style={styles.paymentText}>GPay / Razorpay</Text>
          {selectedMethod === "razorpay" && (
            <Icon name="checkmark-circle" size={28} color="#2ecc71" />
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.totalWrapper}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹ {amount}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.payBtn,
            (paying || !selectedMethod) && { opacity: 0.6 },
          ]}
          disabled={paying || !selectedMethod}
          onPress={openRazorpay}
        >
          <Text style={styles.payText}>
            {paying ? "Processing..." : "Proceed to Pay"}
          </Text>
        </TouchableOpacity>

        <PaymentSuccessModal
          visible={showSuccess}
          onClose={() => {
            setShowSuccess(false);
            navigation.reset({
              index: 0,
              routes: [{ name: "MainApp", params: { defaultTab: "Session" } }],
            });
          }}
        />
      </View>
    </View>
  );
};

export default PaymentScreen;
