import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style";

export default function ResetPasswordScreen({ navigation }) {   
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

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
          />
          <TouchableOpacity
            onPress={() => setConfirmShowPassword(!confirmShowPassword)}
          >
            <Ionicons
              name={confirmShowPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.resetBtn}>
        <Text style={styles.resetText}>Reset Password</Text>
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
