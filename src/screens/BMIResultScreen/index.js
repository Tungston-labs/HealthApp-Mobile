import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from 'react-native-toast-message';
import styles from "./style";
import { useSelector, useDispatch } from "react-redux";
import { registerClientThunk, resetClientState } from "../../redux/slices/clientSlice";
import { resetRegistration } from "../../redux/slices/registrationSlice";
import { setAuth } from "../../redux/slices/authSlice";
import { getCurrentLocation } from "../../utils/location";
import { reverseGeocode } from "../../utils/reverseGeocode";
import { validateUserStep1 } from "../../utils/Validators";

const WIZARD_FIELD_STEPS = {
  gender: 1,
  dob: 2,
  age: 2,
  blood_group: 3,
  wellness_goal: 4,
  health_issues: 5,
  weight: 6,
  height: 7,
};

const BASIC_DETAIL_FIELDS = [
  "name",
  "email",
  "phno",
  "phone",
  "mobile",
  "password",
  "profile_pic",
  "address",
  "latitude",
  "longitude",
];

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

  const { loading, registered } = useSelector(
    (state) => state.client
  );

  const showRegistrationIssue = (message, target = {}) => {
    Toast.show({
      type: "error",
      text1: message || "Please complete the missing details",
    });

    if (target.screen === "basic") {
      navigation.navigate("SignupDetailsScreenUser");
      return;
    }

    if (target.step) {
      navigation.navigate("MainWizardScreen", { initialStep: target.step });
    }
  };

  const validateFinalRegistration = (data) => {
    const step1 = validateUserStep1(data);
    if (!step1.ok) {
      return { ok: false, msg: step1.msg, target: { screen: "basic" } };
    }

    const requiredWizardFields = [
      { field: "gender", msg: "Please select your gender", step: 1 },
      { field: "dob", msg: "Please select your date of birth", step: 2 },
      { field: "blood_group", msg: "Please select your blood group", step: 3 },
      { field: "wellness_goal", msg: "Please select at least one wellness goal", step: 4 },
      { field: "health_issues", msg: "Please select at least one health condition", step: 5 },
      { field: "weight", msg: "Please select your weight", step: 6 },
      { field: "height", msg: "Please select your height", step: 7 },
    ];

    const missing = requiredWizardFields.find(({ field }) => {
      const value = data[field];
      return Array.isArray(value) ? value.length === 0 : !value;
    });

    if (missing) {
      return {
        ok: false,
        msg: missing.msg,
        target: { step: missing.step },
      };
    }

    return { ok: true };
  };

  const getBackendErrorTarget = (err) => {
    const field = err?.fieldErrors?.[0]?.field;
    const message = err?.fieldErrors?.[0]?.message || err?.message || err;

    if (field) {
      if (BASIC_DETAIL_FIELDS.includes(field)) {
        return { message, target: { screen: "basic" } };
      }

      if (WIZARD_FIELD_STEPS[field]) {
        return { message, target: { step: WIZARD_FIELD_STEPS[field] } };
      }
    }

    if (/email|phone|mobile|phno/i.test(String(message))) {
      return { message, target: { screen: "basic" } };
    }

    return {
      message:
        err?.status === 400 && !err?.fieldErrors?.length
          ? "Registration failed. The server did not return field-specific validation details."
          : message,
      target: {},
    };
  };

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

  const getBmiPositionPercent = (val) => {
    if (val < 15) return 0;
    if (val > 40) return 100;

    if (val < 18.5) {
      const ratio = (val - 15) / (18.5 - 15);
      return ratio * 18.18;
    } else if (val < 25) {
      const ratio = (val - 18.5) / (25 - 18.5);
      return 18.18 + ratio * (45.45 - 18.18);
    } else if (val < 30) {
      const ratio = (val - 25) / (30 - 25);
      return 45.45 + ratio * (72.73 - 45.45);
    } else {
      const ratio = (val - 30) / (40 - 30);
      return 72.73 + ratio * (100 - 72.73);
    }
  };

  const progressPercent = getBmiPositionPercent(bmiValue);
  const SCALE_WIDTH = 269.5;
  const CHIP_WIDTH = 100;
  const HALF_CHIP_PERCENT = (CHIP_WIDTH / 2 / SCALE_WIDTH) * 100;
  const chipLeftPercent = Math.max(
    HALF_CHIP_PERCENT,
    Math.min(100 - HALF_CHIP_PERCENT, progressPercent)
  );
  const arrowOffset = (progressPercent - chipLeftPercent) * (SCALE_WIDTH / 100);

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

    // include lat/lng if available — round to 6 decimals to match backend DecimalField
    if (data.latitude != null) {
      const lat = Number(data.latitude);
      if (!Number.isNaN(lat)) {
        formData.append("latitude", String(lat.toFixed(6)));
      }
    }
    if (data.longitude != null) {
      const lon = Number(data.longitude);
      if (!Number.isNaN(lon)) {
        formData.append("longitude", String(lon.toFixed(6)));
      }
    }

    return formData;
  };



const handleFinalSubmit = async () => {
  // Ensure we send latitude/longitude if available — try to fetch device location when missing
  let regData = { ...registration };

  const validation = validateFinalRegistration(regData);
  if (!validation.ok) {
    showRegistrationIssue(validation.msg, validation.target);
    return;
  }

  if (!regData.latitude || !regData.longitude) {
    try {
      const coords = await getCurrentLocation();
      regData.latitude = coords.latitude;
      regData.longitude = coords.longitude;

      // Only fill address when it's empty to avoid overwriting user-entered address
      if (!regData.address) {
        try {
          regData.address = await reverseGeocode(coords.latitude, coords.longitude);
        } catch (e) {
          console.log('Reverse geocode failed:', e?.message || e);
        }
      }
    } catch (e) {
      console.log('Unable to fetch device location during registration:', e?.message || e);
      // proceed without lat/lng — user can set later
    }
  }

  const typedAddress = [
    regData.address,
    regData.landmark,
    regData.city,
    regData.pincode,
  ]
    .filter(Boolean)
    .join(", ")
    .trim();

  if (!typedAddress && (!regData.latitude || !regData.longitude)) {
    showRegistrationIssue(
      "Please add your address or use your current location",
      { screen: "basic" }
    );
    return;
  }

  const formData = buildRegisterPayload(regData);
  
  try {
    const res = await dispatch(registerClientThunk(formData)).unwrap();
    const user = res?.user;
    const access = res?.access;

    if (user && access) {
      dispatch(setAuth({ user, access }));
    }

    Toast.show({
      type: 'success',
      text1: 'Registration Successful',
      text2: 'Welcome! Redirecting to the app.',
    });
  } catch (err) {
    const { message, target } = getBackendErrorTarget(err);
    showRegistrationIssue(message, target);
  }
};


useEffect(() => {
  if (registered) {
    dispatch(resetRegistration());
    dispatch(resetClientState());
  }
}, [registered, dispatch]);


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

            {/* ==== SCALE & POINTER ==== */}
            <View style={{ width: SCALE_WIDTH, alignSelf: "center", marginTop: 20, position: "relative" }}>
              {/* Dynamic pointer container */}
              <View style={{ width: "100%", height: 35, position: "relative" }}>
                <View
                  style={[
                    styles.chipWrapper,
                    {
                      left: `${chipLeftPercent}%`,
                    },
                  ]}
                >
                  <View style={[styles.chip, { backgroundColor: bmiColor }]}>
                    <Text style={styles.chipText}>{bmiText}</Text>
                  </View>
                  <View
                    style={[
                      styles.chipArrow,
                      {
                        borderTopColor: bmiColor,
                        transform: [{ translateX: arrowOffset }],
                      },
                    ]}
                  />
                </View>
              </View>

              {/* ==== SCALE BAR ROW ==== */}
              <View style={[styles.scaleWrapper, { marginTop: 0, marginHorizontal: 0 }]}>
                {[
                  ...Array(10).fill("#84CDEE"),
                  ...Array(15).fill("#78B060"),
                  ...Array(15).fill("#FFDF32"),
                  ...Array(15).fill("#F5554A"),
                ].map((c, i) => (
                  <View key={i} style={[styles.scaleBar, { backgroundColor: c }]} />
                ))}
              </View>
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