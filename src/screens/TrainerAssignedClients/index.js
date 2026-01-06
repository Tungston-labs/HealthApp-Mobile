import React from "react";
import { View, ScrollView, Text } from "react-native";
import styles from "./style";

import Header from "../../components/Header";
import AssignedClientCard from "../../components/AssignedClientCard";

const TrainerAssignedClients = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      
      <View style={styles.headerCard}>
              <View>
                <Text style={styles.greeting}>Hi, John</Text>
                <Text style={styles.subTitle}>Gym</Text>
              </View>
            </View>
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
