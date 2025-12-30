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
import Icon from "react-native-vector-icons/Ionicons";
import ArrowIcon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordThunk,
  resetForgotPasswordState,
} from "../../redux/slices/forgotPasswordSlice";
import styles from "./style";


export default function ForgotPasswordScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { loading, success, error, message } = useSelector(
    (state) => state.forgotpassword 
      );
   const handleContinue = () => {
    if (!email) {
     Alert.alert("Error", "Email is required");
     return;
    }
    if (loading) return; 
     dispatch(forgotPasswordThunk({ email }));
    };
   useEffect(() => {
    if (success) {
    Alert.alert("Success", message, [
      {
        text: "OK",
        onPress: () => {
          dispatch(resetForgotPasswordState());
          navigation.navigate("OtpScreen", { email });
        },
      },
    ]);
  }

  if (error) {
    Alert.alert("Error", error, [
      {
        text: "OK",
        onPress: () => dispatch(resetForgotPasswordState()),
      },
    ]);
  }
}, [success, error]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerWrapper}>
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
      </View>
    </SafeAreaView>
  );
}
