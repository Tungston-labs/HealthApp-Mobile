import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-native";
import { registerClientThunk, resetClientState } from "../../redux/slices/clientSlice";
import { resetRegistration } from "../../redux/slices/registrationSlice";

export default function BMIResultScreen({ navigation }) {
  const {
    weight,
    weightUnit,
    height,
    age,
    gender,
  } = useSelector((state) => state.registration);
  const dispatch = useDispatch();

  const registration = useSelector(
    (state) => state.registration
  );

  const { loading, registered, error } = useSelector(
    (state) => state.client
  );

  const weightInKg =
    weightUnit === "LBS" ? weight * 0.453592 : weight;

  const heightInMeters = height / 100;
  if (!weight || !height) {
    return null;
  }

  const bmi = (
    weightInKg /
    (heightInMeters * heightInMeters)
  ).toFixed(1);

  const bmiValue = parseFloat(bmi);

  const progress = Math.min((bmiValue / 40) * 100, 100);
  const radius = 70;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (circumference * progress) / 100;

  let bmiText = "";
  let bmiColor = "";

  if (bmiValue < 18.5) {
    bmiText = "Underweight";
    bmiColor = "#84CDEE";
  } else if (bmiValue < 24.9) {
    bmiText = "Normal";
    bmiColor = "#78B060";
  } else if (bmiValue < 29.9) {
    bmiText = "Overweight";
    bmiColor = "#FFDF32";
  } else {
    bmiText = "Obesity";
    bmiColor = "#F5554A";
  }
const buildRegisterPayload = (data) => ({
  name: data.name,
  email: data.email,
  phno: data.phno,
  password: data.password,

  role: data.role || "user",
  dob: data.dob,
  gender: data.gender,
  blood_group: data.blood_group,

  height: data.height?.toString(),
  weight: data.weight?.toString(),

  wellness_goal: data.wellness_goal || "Other",

  health_issues: Array.isArray(data.health_issues)
    ? data.health_issues[0] || "Other"
    : data.health_issues || "Other",

address: `${data.address || ""}, ${data.landmark || ""}, ${data.city || ""} - ${data.pincode || ""}`,

});



  const handleFinalSubmit = () => {
    if (!registration.name || !registration.email || !registration.phno) {
      Alert.alert("Incomplete profile", "Please complete signup details");
      return;
    }

    if (!registration.height || !registration.weight) {
      Alert.alert("Missing data", "Height & Weight required");
      return;
    }

    const payload = buildRegisterPayload(registration);
    console.log("REGISTER PAYLOAD 👉", payload);

    dispatch(registerClientThunk(payload));
  };


  useEffect(() => {
    if (registered) {
      dispatch(resetRegistration());
      dispatch(resetClientState());

      navigation.reset({
        index: 0,
        routes: [{ name: "workout" }],
      });
    }
  }, [registered]);

  useEffect(() => {
    if (error) {
      const message =
        typeof error === "string"
          ? error
          : error.message || "Registration failed";

      Alert.alert("Registration failed", message);
    }
  }, [error]);



  return (
    <View style={styles.container}>
      <View style={styles.topBackground} />

      <Text style={styles.header}>Your BMI Result</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.cardInner}>

            {/* ==== BMI CIRCLE ==== */}
            <View style={styles.circleContainer}>
              <Svg width="180" height="180" style={styles.svgRotate}>
                <Circle
                  cx="90"
                  cy="90"
                  r={radius}
                  stroke="#BDBDBD"
                  strokeWidth={strokeWidth}
                  fill="none"
                />

                <Circle
                  cx="90"
                  cy="90"
                  r={radius}
                  stroke={bmiColor}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </Svg>

              <Text style={styles.bmiValue}>{bmi}</Text>
            </View>

            <Text style={styles.bmiMessage}>
              You have {bmiText} Body Weight!
            </Text>

            <View style={styles.chipWrapper}>
              <View style={[styles.chip, { backgroundColor: bmiColor }]}>
                <Text style={styles.chipText}>{bmiText}</Text>
              </View>
              <View
                style={[
                  styles.chipArrow,
                  { borderTopColor: bmiColor },
                ]}
              />
            </View>

            {/* ==== SCALE ==== */}
            <View style={styles.scaleWrapper}>
              {[
                ...Array(10).fill("#84CDEE"),
                ...Array(15).fill("#78B060"),
                ...Array(15).fill("#FFDF32"),
                ...Array(15).fill("#F5554A"),
              ].map((c, i) => (
                <View key={i} style={[styles.scaleBar, { backgroundColor: c }]} />
              ))}
            </View>

            {/* ==== INFO ==== */}
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoValue}>
                  {weight} {weightUnit.toLowerCase()}
                </Text>
                <Text style={styles.infoLabel}>Weight</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoValue}>{height} cm</Text>
                <Text style={styles.infoLabel}>Height</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoValue}>{age}</Text>
                <Text style={styles.infoLabel}>Age</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoValue}>{gender}</Text>
                <Text style={styles.infoLabel}>Gender</Text>
              </View>
            </View>

            {/* ==== LEGEND ==== */}
            <View style={styles.legendWrapper}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#84CDEE" }]} />
                <Text style={styles.legendLabel}>Under Weight :</Text>
                <Text style={styles.legendValue}>&lt; 18.5</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#78B060" }]} />
                <Text style={styles.legendLabel}>Normal Weight :</Text>
                <Text style={styles.legendValue}>18.5 - 24.9</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#FFDF32" }]} />
                <Text style={styles.legendLabel}>Over Weight :</Text>
                <Text style={styles.legendValue}>25 - 29.9</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#F5554A" }]} />
                <Text style={styles.legendLabel}>Obesity :</Text>
                <Text style={styles.legendValue}>30 - 39.9</Text>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleFinalSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Ionicons name="chevron-forward" size={28} color="#fff" />
        )}
      </TouchableOpacity>

    </View>
  );
}
