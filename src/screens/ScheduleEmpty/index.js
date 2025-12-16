import React from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import styles from "./style";

export default function ScheduleEmpty() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerWrapper}>
        <Image
          source={require("../../Images/empty.png")} // single image
          style={styles.statusImage}
        />

        <Text style={styles.title}>Your schedule is empty</Text>

        <Text style={styles.description}>
          Users will book your training slots{"\n"}
          {"\n"}
          stay tuned.
        </Text>
      </View>
    </SafeAreaView>
  );
}
