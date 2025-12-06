import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";

export default function GenderScreen({ selectedGender, onSelectGender }) {
  return (
    <View style={styles.container}>
      
      {/* FEMALE */}
      <TouchableOpacity
        style={[
          styles.genderBox,
          selectedGender === "female" && { borderWidth: 2, borderColor: "#7A5AF8" }
        ]}
        onPress={() => onSelectGender("female")}
      >
        <View style={styles.textWrapper}>
          <Text style={styles.genderText}>Female</Text>
        </View>

        <Image
          source={require("../../../Images/female.png")}
          style={styles.genderImg}
        />
      </TouchableOpacity>

      {/* MALE */}
      <TouchableOpacity
        style={[
          styles.genderBox,
          selectedGender === "male" && { borderWidth: 2, borderColor: "#7A5AF8" }
        ]}
        onPress={() => onSelectGender("male")}
      >
        <View style={styles.textWrapper}>
          <Text style={styles.genderText}>Male</Text>
        </View>

        <Image
          source={require("../../../Images/male.png")}
          style={styles.genderImg}
        />
      </TouchableOpacity>

    </View>
  );
}
