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

  // 🔥 MAIN PAYMENT FLOW
  const openRazorpay = async () => {
    try {
      setPaying(true);

      // 1️⃣ CREATE ORDER (BACKEND)
      const orderRes = await createTrainerBookingOrder({
        trainer_id: trainerId,
        plan_id: plan_id,
        booking_type: booking_type,
      });

      const { order_id, amount, key } = orderRes.data;

      // 2️⃣ OPEN RAZORPAY
      const options = {
        key: key,
        amount: amount * 100, // paise
        currency: "INR",
        name: data.name,
        description: "Trainer Booking",
        image: data.profile_pic,
        order_id: order_id,
        prefill: {
          name: "User",
          email: "user@email.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      RazorpayCheckout.open(options)
        .then(async (response) => {
          // 3️⃣ VERIFY PAYMENT (BACKEND)
          await verifyTrainerPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            start_date: start_date,
            time: time,
            slot_days: slot_days,
          });

          setShowSuccess(true);
        })
        .catch(() => {
          Alert.alert("Payment cancelled");
        })
        .finally(() => setPaying(false));
    } catch (err) {
      setPaying(false);
      console.log("Payment error:", err);
      Alert.alert("Error", "Unable to initiate payment");
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
          <Text style={styles.label}>
            Workout Plan - {data.plan_name}
          </Text>
          <Text style={styles.label}>
            Workout Type - {booking_type}
          </Text>
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
              routes: [
                {
                  name: "MainApp",
                  params: { defaultTab: "Session" },
                },
              ],
            });
          }}
        />
      </View>
    </View>
  );
};

export default PaymentScreen;
