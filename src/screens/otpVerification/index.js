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
import Logo from "../../Images/logo.png";
import { Image } from "react-native";


export default function OtpScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.verifyotp);
  const email = route.params?.email;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  if (!email) {
    Alert.alert("Error", "Email not found. Please go back and try again.");
    navigation.navigate("Login");
    return;
  }

  const handleChange = (text, index) => {
    const newOtp = [...otp];

    if (text.length > 1) {
      const textArray = text.split("").slice(0, 6);
      textArray.forEach((digit, idx) => {
        newOtp[idx] = digit;
      });
      setOtp(newOtp);

      const nextIndex = Math.min(textArray.length, 5);
      inputRefs.current[nextIndex].focus();
    } else {
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }


    const otpString = newOtp.join("");
    if (otpString.length === 6 && !newOtp.includes("")) {
      handleSubmit(otpString);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      const newOtp = [...otp];
      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = (otpString) => {
    dispatch(verifyOtpAction({ otp: otpString, email }));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetOtpState());
      navigation.navigate("ResetPasswordScreen", { email });
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
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>
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
              onKeyPress={(e) => handleKeyPress(e, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.backToLogin}>
            Back to <Text style={styles.loginText}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
