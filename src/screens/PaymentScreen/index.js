import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import HeaderWithBack from "../../components/HeaderWithBack";
import PaymentSuccessModal from "../../components/PaymentSuccessModal";
import TrainerInfoCard from "../../components/TrainerInfoCard";
import { fetchTrainerDetailThunk } from "../../redux/slices/trainerDetailSlice";

const PaymentScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  // ✅ Read from route params
  const { trainerId, booking_type, amount } = route.params;

  const { loading, data, error } = useSelector(
    (state) => state.trainerDetail
  );

  const [selectedMethod, setSelectedMethod] = useState("razorpay");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (trainerId) {
      dispatch(fetchTrainerDetailThunk(trainerId));
    }
  }, [dispatch, trainerId]);

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

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Other payment methods
        </Text>
        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.otherMethod}
          onPress={() => setSelectedMethod("netbanking")}
        >
          <Icon name="business-outline" size={22} />
          <Text style={styles.otherMethodText}>Net Banking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.otherMethod}
          onPress={() => setSelectedMethod("card")}
        >
          <Icon name="card-outline" size={22} />
          <Text style={styles.otherMethodText}>
            Debit / Credit Card
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.totalWrapper}>
          <Text style={styles.totalLabel}>Total</Text>
          {/* ✅ Correct amount */}
          <Text style={styles.totalValue}>₹ {amount}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.payBtn,
            !selectedMethod && { opacity: 0.6 },
          ]}
          disabled={!selectedMethod}
          onPress={() => setShowSuccess(true)}
        >
          <Text style={styles.payText}>Proceed to Pay</Text>
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
