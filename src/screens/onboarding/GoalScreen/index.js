import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./style";

export default function GoalScreen() {
  const [selected, setSelected] = useState(null);

  const goalGroups = [
    "Other",
    "Lose weight",
    "Gain muscle",
    "Eat healthier",
    "Manage diabetes",
    "Reduce stress",
    "Sleep better",
    
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

      {/* Radio */}
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
