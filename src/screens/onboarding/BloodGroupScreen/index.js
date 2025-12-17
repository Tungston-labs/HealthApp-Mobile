import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { updateRegistration } from "../../../redux/slices/registrationSlice";
export default function BloodGroupScreen() {
const dispatch = useDispatch();
  const selected = useSelector(
    state => state.registration.blood_group
  );
  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];
  const onSelect = (group) => {
    dispatch(updateRegistration({ blood_group: group }));
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selected === item && styles.cardActive,
      ]}
      onPress={() => onSelect(item)}
    >
      <Text style={styles.label}>{item}</Text>
      <View style={styles.radioOuter}>
        {selected === item && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bloodGroups}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}



