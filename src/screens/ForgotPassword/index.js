import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { showError, showSuccess } from "../../utils/toast";
import Icon from "react-native-vector-icons/Ionicons";
import ArrowIcon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordThunk,
  resetForgotPasswordState,
} from "../../redux/slices/forgotPasswordSlice";
import styles from "./style";
import Logo from "../../Images/logo.png";
import { Image } from "react-native";

export default function ForgotPasswordScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { loading, success, error, message } = useSelector(
    (state) => state.forgotpassword
  );
  const handleContinue = () => {
    if (!email) {
      showError("Error", "Email is required");
      return;
    }
    if (loading) return;
    dispatch(forgotPasswordThunk({ email }));
  };
  useEffect(() => {
    if (success) {
      dispatch(resetForgotPasswordState());
      navigation.navigate("OtpScreen", { email });
      showSuccess("Success", message);
    }

    if (error) {
      dispatch(resetForgotPasswordState());
      showError("Error", error);
    }
  }, [success, error, email, message, navigation, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerWrapper}>

        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>

        <Text style={styles.description}>
          Enter your registered email address below. We’ll send you a code to reset your password.
        </Text>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Icon name="mail-outline" size={20} color="#8D8D8D" />
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="done"
            onSubmitEditing={handleContinue}
          />
        </View>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={handleContinue}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.continueText}>Continue</Text>
              <ArrowIcon name="chevron-right" size={22} color="#fff" />
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.backToLogin}>
            Back to <Text style={styles.loginText}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
