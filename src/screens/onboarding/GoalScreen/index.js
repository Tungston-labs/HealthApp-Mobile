import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { updateRegistration } from "../../../redux/slices/registrationSlice";

export default function GoalScreen() {
  const dispatch = useDispatch();

  const selected = useSelector(
    (state) => state.registration.wellness_goal || []
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

  const toggleGoal = (goal) => {
    const updated = selected.includes(goal)
      ? selected.filter((g) => g !== goal)
      : [...selected, goal];

    dispatch(updateRegistration({ wellness_goal: updated }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={goalGroups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item);

          return (
            <TouchableOpacity
              style={[
                styles.card,
                isSelected && styles.cardActive,
              ]}
              onPress={() => toggleGoal(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.label}>{item}</Text>

              <View style={styles.radioOuter}>
                {isSelected && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
