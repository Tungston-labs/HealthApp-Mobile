import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import styles from "./style";
import { verifyOtpAction, resetOtpState } from "../../redux/slices/verifyOtpSlice";

export default function OtpScreen({ navigation, route }) {
const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.verifyotp);
  const email = route.params?.email;

if (!email) {
  Alert.alert("Error", "Email not found. Please go back and try again.");
  navigation.navigate("Login");
  return;
}

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

  if (text && index < otp.length - 1) {
  inputRefs.current[index + 1].focus();
}

  };

  const handleSubmit = () => {
    const otpString = otp.join("");
if (otpString.length !== 6) {
  Alert.alert("Error", "Please enter a valid 6-digit OTP");
  console.log("otp",otpString)
  return;
}


    dispatch(verifyOtpAction({ otp: otpString, email: route.params.email }));

  };

  useEffect(() => {
    if (success) {
      dispatch(resetOtpState());
      navigation.navigate("ResetPasswordScreen", { email: route.params.email });
  
    }
    
    if (error) {
      Alert.alert("OTP Verification Failed", error.message || "Try again");
    }
  }, [success, error]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.innerContainer}
      >
        <Text style={styles.brand}>OTP</Text>
        <Text style={styles.description}>
          Enter the code you received in your email{"\n"}below to reset your password.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.otpBox}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.submitText}>{loading ? "Verifying..." : "Submit"}</Text>
          <Text style={styles.submitArrow}>{">"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.backToLogin}>
            Back to <Text style={styles.loginText}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
