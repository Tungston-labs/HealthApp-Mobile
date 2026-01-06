import React from "react";
import { View, ScrollView, Text } from "react-native";
import styles from "./style";

import Header from "../../components/Header";
import AssignedClientCard from "../../components/AssignedClientCard";

const TrainerAssignedClients = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        username="John"
        subtitle="Gym"
        bmiValue="22.5"
      />

      {/* Section Title */}
      <Text style={styles.sectionTitle}>All Assigned Clients</Text>

      {/* Client List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listWrapper}
      >
        <AssignedClientCard />
        <AssignedClientCard />
        <AssignedClientCard />
        <AssignedClientCard />
        <AssignedClientCard />
        <AssignedClientCard />
      </ScrollView>
    </View>
  );
};

export default TrainerAssignedClients;
