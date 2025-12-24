import React, { useState } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import HeaderWithBack from "../../components/HeaderWithBack";
import TrainerCard from "./Trainercard";
import styles from "./styles";
import TrainerBookingModal from "../../components/TrainerBookingModal";

const TrainerListScreen = () => {
  const { trainers, plan, loading } = useSelector(state => state.trainerplan);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <HeaderWithBack title={plan?.name || "Trainers"} />
      <Text style={styles.subtitle}>Available trainers</Text>

      {trainers.length === 0 ? (
        <Text>No trainers available</Text>
      ) : (
        <FlatList
          data={trainers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TrainerCard
              trainer={item}
              onBookNow={() => setSelectedTrainer(item)}
            />
          )}
        />
      )}

      <TrainerBookingModal
        visible={!!selectedTrainer}
        trainer={selectedTrainer}
        onClose={() => setSelectedTrainer(null)}
      />
    </View>
  );
};

export default TrainerListScreen;
