import React from "react";
import { View, ScrollView } from "react-native";
import HeaderWithBack from "../../components/HeaderWithBack";
import trainerData from "./trainerData";  
import styles from "./styles";
import HistoryCard from "../../components/Historycard";

const SessionHistory = () => {
  return (
    
    <View style={styles.container}>
      <HeaderWithBack title="Session History" subtitle="Session Details" />

      <ScrollView
        contentContainerStyle={styles.cardWrapper}
        showsVerticalScrollIndicator={false}
      >
        {trainerData.map((item) => (
          <HistoryCard
          
            key={item.id} item={item}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SessionHistory;
