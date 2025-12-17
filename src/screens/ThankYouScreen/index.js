import React, { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

export default function ThankYouScreen() {
  const [showVerified, setShowVerified] = useState(false);
  const navigation = useNavigation();

  // Step 1: Show verified screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVerified(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Step 2: Move to Trainer tab after 1 second
  useEffect(() => {
    if (showVerified) {
      const navTimer = setTimeout(() => {
        navigation.replace("TrainerNavigator");
      }, 1000);

      return () => clearTimeout(navTimer);
    }
  }, [showVerified, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerWrapper}>
        {!showVerified && (
          <>
            <Image
              source={require("../../Images/thankyou.png")}
              style={styles.clockImage}
            />

            <Text style={styles.title}>Thank you!</Text>

            <Text style={styles.description}>
              Your account is under review and will Be{"\n"}
              verified within <Text style={styles.boldText}>24 hours.</Text>{" "}
              Please check back later.
            </Text>
          </>
        )}

        {showVerified && (
          <>
            <Image
              source={require("../../Images/verified.png")}
              style={styles.clockImage}
            />

            <Text style={styles.title}>Account Verified</Text>

            <Text style={styles.description}>
              Your account has been successfully{"\n"}
              verified.{"\n"}
              You're all set to continue!
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
