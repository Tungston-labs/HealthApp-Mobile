import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { updateRegistration } from "../../../redux/slices/registrationSlice";

export default function GoalScreen() {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state) => state.registration.wellness_goal
  );

  const goalGroups = [
    "Other",
    "Lose weight",
    "Gain muscle",
    "Eat healthier",
    "Manage diabetes",
    "Reduce stress",
    "Sleep better",
  ];

  const selectGoal = (goal) => {
    dispatch(updateRegistration({ wellness_goal: goal }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={goalGroups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              selected === item && styles.cardActive,
            ]}
            onPress={() => selectGoal(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.label}>{item}</Text>

            <View style={styles.radioOuter}>
              {selected === item && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
