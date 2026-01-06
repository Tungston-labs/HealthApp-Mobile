import React from "react";
import { View, ScrollView } from "react-native";
import styles from "./style";
import SessionCard from "../../components/SessionCard";
import HeaderWithBack from "../../components/HeaderWithBack";


const SessionHistory = () => {
  return (
    <View style={styles.container}>
      <HeaderWithBack title="Session History" subtitle="Session Details" />

      <ScrollView
        contentContainerStyle={styles.cardWrapper}
        showsVerticalScrollIndicator={false}
      >
        {/* Render static cards */}
        <SessionCard />
        <SessionCard />
        <SessionCard />
        <SessionCard />
      </ScrollView>
    </View>
  );
};

export default SessionHistory;
