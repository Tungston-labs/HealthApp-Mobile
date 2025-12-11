import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./style";

export default function ConditionScreen() {
  const [selected, setSelected] = useState(null);

  const goalGroups = [
    "Other",
    "Arthritis / Joint Stiffness",
    "Asthma / Breathing Difficulty",
    "High Blood Pressure ",
    "Diabetes",
    "Obesity / Overweight",
    
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selected === item && styles.cardActive,
      ]}
      onPress={() => setSelected(item)}
      activeOpacity={0.8}
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
        data={goalGroups}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
