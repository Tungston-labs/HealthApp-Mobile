import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-native";
import { registerClientThunk, resetClientState } from "../../redux/slices/clientSlice";
import { resetRegistration } from "../../redux/slices/registrationSlice";
import { setAuth } from "../../redux/slices/authSlice";

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

  const buildRegisterPayload = (data) => {
    const formData = new FormData();

    // Basic fields
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phno", data.phno);
    formData.append("password", data.password);
    formData.append("role", data.role || "user");
    formData.append("dob", data.dob);
    formData.append("gender", data.gender);
    formData.append("blood_group", data.blood_group);
    formData.append("height", String(data.height));
    formData.append("weight", String(data.weight));
    formData.append(
      "address",
      `${data.address || ""}, ${data.landmark || ""}, ${data.city || ""} - ${data.pincode || ""}`
    );

    // Arrays
    formData.append(
      "health_issues",
      JSON.stringify(Array.isArray(data.health_issues) ? data.health_issues : [])
    );
    formData.append(
      "wellness_goal",
      JSON.stringify(Array.isArray(data.wellness_goal) ? data.wellness_goal : [])
    );

    // Profile picture
    if (data.profile_pic) {
      let uri = data.profile_pic.uri;
      if (Platform.OS === "android" && !uri.startsWith("file://")) {
        uri = "file://" + uri;
      }

      formData.append("profile_pic", {
        uri,
        type: data.profile_pic.type || "image/jpeg",
        name: data.profile_pic.fileName || "profile.jpg",
      });
    }

    return formData;
  };



const handleFinalSubmit = async () => {
  const formData = buildRegisterPayload(registration);
  
  try {
    const res = await dispatch(registerClientThunk(formData)).unwrap();

    const userData = res.user || {
      name: registration.name,
      email: registration.email,
      role: registration.role || "user",
    };

    // Correctly set auth in Redux
    dispatch(setAuth({ user: userData, access: res.token?.access }));

    // Navigate to main app
    navigation.replace("MainApp"); // or AppNavigator entry
  } catch (err) {
    Alert.alert("Registration failed", err?.message || err);
  }
};


useEffect(() => {
  if (registered) {
    dispatch(resetRegistration());
    dispatch(resetClientState());
  }
}, [registered]);


useEffect(() => {
  if (error && !registered) {
    Alert.alert(
      "Registration failed",
      typeof error === "string"
        ? error
        : error.message || "Registration failed"
    );
  }
}, [error, registered]);

if (!weight || !height) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}







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
