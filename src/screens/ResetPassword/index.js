import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAction, resetState } from "../../redux/slices/resetPasswordSlice";
import Logo from "../../Images/logo.png";
import { Image } from "react-native";
export default function ResetPasswordScreen({ navigation, route }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.resetpassword);

  // Password validation function
  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!pass) return "Password is required";
    if (!regex.test(pass))
      return "Password must be 8+ chars, include uppercase, lowercase, number & special char";
    return "";
  };

  // Confirm password validation
  const validateConfirm = (confPass) => {
    if (!confPass) return "Confirm password is required";
    if (confPass !== password) return "Passwords do not match";
    return "";
  };

  const handleReset = async () => {
    const pwdError = validatePassword(password);
    const confError = validateConfirm(confirmPassword);

    setPasswordError(pwdError);
    setConfirmError(confError);

    if (pwdError || confError) return;

    try {
      await dispatch(
        resetPasswordAction({
          email: route.params.email,
          password: password,
          confirm_password: confirmPassword,
        })
      ).unwrap();

      Alert.alert("Success", "Password reset successfully");
      dispatch(resetState());
      navigation.navigate("Login");
    } catch (err) {
      Alert.alert(
        "Error",
        err?.message || JSON.stringify(err) || "Failed to reset password"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} 
        style={styles.logo} />
      </View>
      <Text style={styles.title}>
        Create your new password and confirm{"\n"}it to regain access
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter new password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="key-outline" size={20} color="#777" />
          <TextInput
            placeholder="Enter new password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(validatePassword(text));
            }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={{ color: "red", marginTop: 5 }}>{passwordError}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="key-outline" size={20} color="#777" />
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor="#999"
            secureTextEntry={!confirmShowPassword}
            style={styles.input}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmError(validateConfirm(text));
            }}
          />
          <TouchableOpacity onPress={() => setConfirmShowPassword(!confirmShowPassword)}>
            <Ionicons
              name={confirmShowPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>
        {confirmError ? (
          <Text style={{ color: "red", marginTop: 5 }}>{confirmError}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.resetBtn}
        onPress={handleReset}
        disabled={loading}
      >
        <Text style={styles.resetText}>{loading ? "Resetting..." : "Reset Password"}</Text>
        <Ionicons name="chevron-forward" size={22} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backWrapper}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.back}>Back to </Text>
        <Text style={styles.loginLink}>Log in</Text>
      </TouchableOpacity>

      {error && (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "red" }}>
            {typeof error === "string" ? error : JSON.stringify(error)}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
