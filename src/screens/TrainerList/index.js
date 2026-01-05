import React, { useEffect, useState } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderWithBack from "../../components/HeaderWithBack";
import TrainerCard from "./Trainercard";
import styles from "./styles";
import TrainerBookingModal from "../../components/TrainerBookingModal";
import { fetchAvailableTrainersThunk } from "../../redux/slices/trainerPlanSlice";

const TrainerListScreen = () => {
  const dispatch = useDispatch();
  const { trainers, plan, loading, error } = useSelector(
    (state) => state.trainerplan
  );

  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    dispatch(
      fetchAvailableTrainersThunk({
        plan_id: 3,
      })
    );
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack title={plan?.name || "Trainers"} />
      <Text style={styles.subtitle}>Available trainers</Text>

      {trainers?.length === 0 ? (
        <Text style={styles.emptyText}>No trainers available</Text>
      ) : (
        <FlatList
          data={trainers}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
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
