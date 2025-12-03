import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./style";

export default function OtpScreen({ navigation }) {
  const [otp, setOtp] = useState(["", "", "", "", ""]); // 5 OTP fields
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = () => {
    // 🔥 Navigate to ResetPasswordScreen
    navigation.navigate("ResetPasswordScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.innerContainer}
      >
        {/* BRAND NAME */}
        <Text style={styles.brand}>OTP</Text>

        {/* DESCRIPTION */}
        <Text style={styles.description}>
          Enter the code you received in your email{"\n"}below to reset your password.
        </Text>

        {/* OTP INPUT  */}
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

        {/* SUBMIT BUTTON */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
          <Text style={styles.submitArrow}>{">"}</Text>
        </TouchableOpacity>

        {/* BACK TO LOGIN */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.backToLogin}>
            Back to <Text style={styles.loginText}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
