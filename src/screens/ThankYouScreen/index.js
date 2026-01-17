import React from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../../redux/slices/authSlice";
import styles from "./style";

export default function ThankYouScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { trainerStatus } = useSelector(state => state.auth);
  const isApproved = trainerStatus === "approved";

  const handleGoToLogin = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerWrapper}>
        <Image
          source={require("../../Images/thankyou.png")}
          style={styles.clockImage}
        />

        <Text style={styles.title}>Thank you!</Text>

        <Text style={styles.description}>
          {isApproved ? (
            <>
              Your account has been{" "}
              <Text style={styles.boldText}>approved.</Text>
              {"\n"}Please login to continue.
            </>
          ) : (
            <>
              Your account is under review and will be{"\n"}
              verified within{" "}
              <Text style={styles.boldText}>24 hours.</Text>
              {"\n\n"}
              Once approved, please login again.
            </>
          )}
        </Text>

        <View style={styles.loginBtnWrapper}>
          <TouchableOpacity
            style={[
              styles.loginBtn,
              !isApproved && { opacity: 0.7 },
            ]}
            onPress={handleGoToLogin}
          >
            <Text style={styles.loginText}>
              {isApproved ? "Go to Login" : "Login Again Later"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
