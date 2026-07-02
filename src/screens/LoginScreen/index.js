import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { loginClientThunk, resetAuthState } from "../../redux/slices/authSlice";
import styles from "./style";
import { useIsFocused } from "@react-navigation/native";
import Logo from "../../Images/logo.png";
import { Image } from "react-native";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {
    loading,
    isLoggedIn,
    user,
    role,
    isVerified,
    error,
  } = useSelector(state => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (loading) return;

    dispatch(
      loginClientThunk({
        email_or_phno: email,
        password,
      })
    );
  };

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    if (role === "trainer") {
      if (isVerified) {
        navigation.reset({
          index: 0,
          routes: [{ name: "TrainerNavigator" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "ThankYouScreen" }],
        });
      }
    } else {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "MainApp",
            params: { screen: "workout" },
          },
        ],
      });
    }
  }, [isLoggedIn, role, isVerified]);

  useEffect(() => {
    if (error && isFocused) {
      Alert.alert("Login Failed", error);
      dispatch(resetAuthState());
    }
  }, [error, isFocused]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#8D8D8D"
            style={styles.leftIcon}
          />
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="key-outline"
            size={20}
            color="#8D8D8D"
            style={styles.leftIcon}
          />
          <TextInput
            placeholder="Enter password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIconWrapper}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#8D8D8D"
            />
          </TouchableOpacity>
        </View>
        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Forgot password?
        </Text>
      </View>
      <View style={styles.loginBtnWrapper}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          disabled={loading} >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginText}>Log in</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SelectRoleScreen")}>
          <Text style={styles.signUp}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
