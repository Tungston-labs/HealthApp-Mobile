import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { showError } from "../../utils/toast";
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
  normalizeSlotDays,
  normalizeTime24,
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
    booking_type = "single",
    amount = 0,
    address,
  } = route.params || {};

  console.log("PAYMENT PARAMS =>", route.params);
  const filters = useSelector((state) => state.trainer.filters);

  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const start_date = filters?.start_date || route.params?.start_date || getTodayDate();
  const time = normalizeTime24(filters?.time || route.params?.time || "10:00");
  const slot_days = normalizeSlotDays(filters?.slot_days || route.params?.slot_days || ["mon", "wed", "fri"]);


  const { loading, data } = useSelector((state) => state.trainerDetail);

  const [selectedMethod] = useState("razorpay");
  const [showSuccess, setShowSuccess] = useState(false);
  const [paying, setPaying] = useState(false);
  const [orderRequired, setOrderRequired] = useState(true);

  useEffect(() => {
    const id = mode === "book" ? trainerId : new_trainer_id;
    if (id) dispatch(fetchTrainerDetailThunk(id));
  }, [dispatch, mode, trainerId, new_trainer_id]);

  const openRazorpay = async () => {
    try {
      const paymentTrainerId = mode === "book" ? trainerId : new_trainer_id;

      if (!paymentTrainerId) {
        showError("Trainer unavailable", "Please select a trainer again.");
        return;
      }

      if (!plan_id) {
        showError("Plan unavailable", "Please select a workout plan again before payment.");
        return;
      }

      setPaying(true);

      let orderData = route.params?.preCreatedOrder;

      if (!orderData) {
        let res;
        if (mode === "change") {
          res = await createChangeTrainerOrder({
            old_trainer_id,
            new_trainer_id,
            plan_id,
          });
        } else {
          res = await createTrainerBookingOrder({
            trainer_id: paymentTrainerId,
            plan_id,
            booking_type,
            start_date,
            time,
            slot_days,
            address: address || "Not provided",
          });
        }
        orderData = res?.data;
      }

      const {
        order_required = true,
        order_id,
        amount: backend_amount,
        key,
      } = orderData || {};


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
        name: "FitSapio",
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
          trainer_id: paymentTrainerId,
          plan_id,
          booking_type,
          start_date,
          time,
          slot_days,
          address: address || "Not provided",
        });
      }

      setShowSuccess(true);
    } catch (err) {
      console.log("❌ PAYMENT ERROR:", err?.response?.data || err.message || err);

      let msg = "Payment failed. Please try again.";
      const backendData = err?.response?.data;

      if (backendData) {
        msg =
          backendData.error ||
          backendData.message ||
          backendData.detail ||
          backendData.non_field_errors?.[0] ||
          (typeof backendData === "string" ? backendData : msg);
      } else if (err?.description) {
        msg = err.description;
      } else if (err?.message) {
        msg = err.message;
      } else if (typeof err === "string") {
        msg = err;
      }

      showError("Booking Failed", msg);
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