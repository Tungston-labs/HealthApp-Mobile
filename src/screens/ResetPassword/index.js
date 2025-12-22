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

export default function ResetPasswordScreen({ navigation, route }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.resetpassword);

const handleReset = async () => {
  if (!password || !confirmPassword) {
    Alert.alert("Error", "Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert("Error", "Passwords do not match");
    return;
  }

  try {
    await dispatch(
      resetPasswordAction({
        email: route.params.email,
        password: password,
        confirm_password: confirmPassword, 
      })
    ).unwrap();

    Alert.alert("Success", "Password reset successfully");
    navigation.navigate("Login");
  } catch (err) {
    Alert.alert("Error", err.message || "Failed to reset password");
  }
};

  return (
    <SafeAreaView style={styles.container}>
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
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>
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
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setConfirmShowPassword(!confirmShowPassword)}>
            <Ionicons
              name={confirmShowPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>
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
    </SafeAreaView>
  );
}
