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
    new_trainer_id,
    old_trainer_id,
    trainerId,
    plan_id,
    booking_type,
    amount = 0,
  } = route.params || {};

  const filters = useSelector((state) => state.trainer.filters);
  const { start_date, time, slot_days } = filters || {};

  const { loading, data } = useSelector((state) => state.trainerDetail);

  const [selectedMethod, setSelectedMethod] = useState("razorpay");
  const [showSuccess, setShowSuccess] = useState(false);
  const [paying, setPaying] = useState(false);
  const [orderRequired, setOrderRequired] = useState(true);

  useEffect(() => {
    const id = mode === "book" ? trainerId : new_trainer_id;
    if (id) dispatch(fetchTrainerDetailThunk(id));
  }, [dispatch, mode, trainerId, new_trainer_id]);

  const openRazorpay = async () => {
    try {
      setPaying(true);

      let res;

      if (mode === "change") {
        res = await createChangeTrainerOrder({
          old_trainer_id,
          new_trainer_id,
          plan_id,
        });
      }
      // 🆕 NEW BOOKING FLOW
      else {
        // 🆕 NEW BOOKING FLOW
        res = await createTrainerBookingOrder({
          trainer_id: trainerId || new_trainer_id,
          plan_id,
          booking_type,
          start_date,
          time,
          slot_days,
        });

      }

      const {
        order_required = true,
        order_id,
        amount: backend_amount,
        key,
      } = res?.data || {};

      setOrderRequired(order_required);

      // ✅ NO PAYMENT REQUIRED
      if (mode === "change" && order_required === false) {
        await verifyChangeTrainerPayment({
          old_trainer_id,
          new_trainer_id,
          plan_id,
        });

        setShowSuccess(true);
        return;
      }

      // ❌ SAFETY CHECK
      if (!order_id || !backend_amount || !key) {
        throw new Error("Invalid order data from backend");
      }

      // 🚀 OPEN RAZORPAY
      const response = await RazorpayCheckout.open({
        key,
        order_id,
        amount: Math.round(backend_amount * 100),
        currency: "INR",
        name: "InFit",
        description: "Trainer Payment",
        prefill: {
          email: "test@email.com",
          contact: "9999999999",
          name: "Test User",
        },
        theme: { color: "#3399cc" },
      });

      // 🔐 VERIFY PAYMENT
      if (mode === "change") {
        await verifyChangeTrainerPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          old_trainer_id,
          new_trainer_id,
          plan_id,
        });
      } else {
        await verifyTrainerPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
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
      console.log("❌ PAYMENT ERROR:", err?.response?.data || err.message);
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

      <ScrollView>
        <Text style={styles.sectionTitle}>Trainer info</Text>

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

        <TouchableOpacity
          style={[
            styles.paymentCard,
            selectedMethod === "razorpay" && styles.paymentCardActive,
          ]}
        >
          <Text style={styles.paymentText}>GPay / Razorpay</Text>
          <Icon name="checkmark-circle" size={28} color="#2ecc71" />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text>Total</Text>
          <Text style={styles.totalValue}>₹ {amount}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.payBtn,
            (paying || (!orderRequired && mode === "change")) && { opacity: 0.6 },
          ]}
          disabled={paying}
          onPress={openRazorpay}
        >
          <Text style={styles.payText}>
            {paying ? "Processing..." : "Proceed"}
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
