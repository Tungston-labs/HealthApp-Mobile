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
  createChangeTrainerOrder,
  verifyChangeTrainerPayment,
} from "../../services/trainerServices";
import {
  createTrainerBookingOrder,
  verifyTrainerPayment,
  
} from "../../services/paymentServices";

const PaymentScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const {
    mode = "book",
    trainerId,
    old_trainer_id,
    plan_id,
    booking_type,
    amount,
  } = route.params;

  const filters = useSelector((state) => state.trainer.filters);
  const start_date = filters?.start_date;
  const time = filters?.time;
  const slot_days = filters?.slot_days;

  const { loading, data } = useSelector((state) => state.trainerDetail);

  const [selectedMethod, setSelectedMethod] = useState("razorpay");
  const [showSuccess, setShowSuccess] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    dispatch(fetchTrainerDetailThunk(trainerId));
  }, [dispatch, trainerId]);
  console.log({trainerId});
  

  const openRazorpay = async () => {
    try {
      setPaying(true);

      /* ================= CREATE ORDER ================= */
      const orderRes =
        mode === "change"
          ? await createChangeTrainerOrder({
              old_trainer_id,
              new_trainer_id: trainerId,
              plan_id,
            })
          : await createTrainerBookingOrder({
              trainer_id: trainerId,
              plan_id,
              booking_type,
            });

      const {
        order_required = true,
        order_id,
        razorpay_order_id,
        amount: backendAmount,
        key,
      } = orderRes.data;

      /* ================= NO PAYMENT REQUIRED ================= */
      if (mode === "change" && !order_required) {
        await verifyChangeTrainerPayment({
          old_trainer_id,
          new_trainer_id: trainerId,
          plan_id,
        });

        setShowSuccess(true);
        return;
      }

      /* ================= RAZORPAY ================= */
     const options = {
  key,
  currency: "INR",
  name: "HealthApp",
  description: "Trainer Booking",
  order_id: order_id || razorpay_order_id,
  amount: Math.round(backendAmount * 100),

  prefill: {
    email: "test@email.com",
    contact: "9999999999",
    name: "Test User",
  },

  theme: { color: "#3399cc" },
};

      // const response = await RazorpayCheckout.open(options);
      let response;

try {
  response = await RazorpayCheckout.open(options);
  console.log("✅ PAYMENT SUCCESS RESPONSE:", response);
} catch (e) {
  console.log("❌ PAYMENT FAILED / CANCELLED:", e);
  throw e;
}


      /* ================= VERIFY ================= */
      const verifyPayload = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      };
      console.log("object", verifyPayload)
      if (mode === "change") {
        await verifyChangeTrainerPayment({
          ...verifyPayload,
          old_trainer_id,
          new_trainer_id: trainerId,
          plan_id,
        });
      } else {
        await verifyTrainerPayment({
          ...verifyPayload,
          trainer_id: trainerId,
          plan_id,
          booking_type,
          start_date,
          time,
          slot_days,
        });
      }

      setShowSuccess(true);
    } catch (err) {
      console.log("❌ PAYMENT ERROR:", err?.response?.data || err);
      Alert.alert("Payment failed", "Please try again");
    } finally {
      setPaying(false);
    }
  };

  if (loading || !data) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack title="Payment" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Trainer info</Text>
        <View style={styles.separator} />

        <View style={styles.workoutPlan}>
          <Text style={styles.label}>Workout Type - {booking_type}</Text>
          <Text style={styles.label}>Sessions - {data.no_of_section}</Text>
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
          <Icon name="checkmark-circle" size={28} color="#2ecc71" />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalWrapper}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹ {amount}</Text>
        </View>

        <TouchableOpacity
          style={[styles.payBtn, paying && { opacity: 0.6 }]}
          disabled={paying}
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
              routes: [{ name: "MainApp" }],
            });
          }}
        />
      </View>
    </View>
  );
};

export default PaymentScreen;
