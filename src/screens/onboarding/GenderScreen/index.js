import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { updateRegistration } from "../../../redux/slices/registrationSlice";

export default function GenderScreen({ onSelectGender }) {
  const dispatch = useDispatch();

  const selectedGender = useSelector(
    (state) => state.registration.gender
  );

  const selectGender = (value) => {
    dispatch(updateRegistration({ gender: value }));
    onSelectGender?.(); // move to next step
  };

  return (
    <View style={styles.container}>
      
      {/* FEMALE */}
      <TouchableOpacity
        style={[
          styles.genderBox,
          selectedGender === "female" && {
            borderWidth: 2,
            borderColor: "#7A5AF8",
          },
        ]}
        onPress={() => selectGender("female")}
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
          selectedGender === "male" && {
            borderWidth: 2,
            borderColor: "#7A5AF8",
          },
        ]}
        onPress={() => selectGender("male")}
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
