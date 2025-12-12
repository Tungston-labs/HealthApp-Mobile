import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import HeaderWithBack from "../../components/HeaderWithBack";
import PaymentSuccessModal from "../../components/PaymentSuccessModal"
import TrainerInfoCard from "../../components/TrainerInfoCard";
const PaymentScreen = ({ navigation, route }) => {

  const trainer = route?.params?.trainer || {
    name: "Cristofer Bator",
    experience: "5 year",
    sessions: 12,
    timing: "60 min",
    image: require("../../../assets/trainer2.jpg"),
    amount: 2500,
  };

  const [selectedMethod, setSelectedMethod] = useState("gpay");
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <View style={styles.container}>
      <HeaderWithBack title="Payment"></HeaderWithBack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Trainer info</Text>
              <View style={styles.separator}></View>
              <View style={styles.workoutPlan}>
          <Text style={styles.label}>Workout Plan- Gym</Text>
          <Text style={styles.label}>Workout type- single</Text>
            </View>
        <View style={styles.trainerBox}>
          <Image source={trainer.image} style={styles.trainerImg} />

          <View style={styles.trainerInfo}>
            <TrainerInfoCard
                name="Cristofer Bator"
                        experience="5 years"
                        sessionTiming="60 min"
                        numSessions="12"
                        workoutType="Yoga"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Preferred payment method</Text>
      <View style={styles.separator}></View>
        <TouchableOpacity
          style={[
            styles.paymentCard,
            selectedMethod === "gpay" && styles.paymentCardActive,
          ]}
          onPress={() => setSelectedMethod("gpay")}
        >
          <Image
            style={styles.gpayLogo}
            source={require("../../../assets/gpay.png")}
          />

          <View style={{ flex: 1 }}>
          </View>

          {selectedMethod === "gpay" && (
            <Icon name="checkmark-circle" size={34} color="#2ecc71" />
          )}
        </TouchableOpacity>
        
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Other payment Method
        </Text>
      <View style={styles.separator}></View>

        <TouchableOpacity
          style={styles.otherMethod}
          onPress={() => setSelectedMethod("netbanking")}
        >
          <Icon name="business-outline" size={22} />
          <Text style={styles.otherMethodText}>Net Banking</Text>
          <Icon
            name={
              selectedMethod === "netbanking"
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={22}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.otherMethod}
          onPress={() => setSelectedMethod("card")}
        >
          <Icon name="card-outline" size={22} />
          <Text style={styles.otherMethodText}>Debit/Credit Card</Text>
          <Icon
            name={
              selectedMethod === "card"
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={22}
          />
        </TouchableOpacity>
      </ScrollView>

     <View style={styles.footer}>
  <View>
    <Text style={styles.totalLabel}>Total</Text>
    <Text style={styles.totalValue}>₹ {trainer.amount}</Text>
  </View>

  <TouchableOpacity
    style={styles.payBtn}
    onPress={() => setShowSuccess(true)}
  >
    <Text style={styles.payText}>Pay</Text>
  </TouchableOpacity>

<PaymentSuccessModal
  visible={showSuccess}
  onClose={() => {
    setShowSuccess(false);
    navigation.navigate("MainApp"); 
  }}
/>

</View>

    </View>
  );
};

export default PaymentScreen;
