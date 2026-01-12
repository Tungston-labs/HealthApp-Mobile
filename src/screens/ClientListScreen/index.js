import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles";
import HeaderWithBack from "../../components/HeaderWithBack";
import TrainerCard from "../../screens/TrainerList/Trainercard";
import EmptyState from "../../components/EmptyState";

import { fetchAvailableTrainersThunk  } from "../../redux/slices/trainerPlanSlice";

const ClientListScreen = () => {
  const dispatch = useDispatch();

  const { trainers, loading } = useSelector(
    (state) => state.trainerSessions
  );

  useEffect(() => {
    dispatch(fetchAvailableTrainersThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!trainers || trainers.length === 0) {
    return (
      <EmptyState
        image={require("../../../assets/emptytrainer.png")}
        title="No Trainers Available"
        subtitle="Trainer plans will appear here."
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <HeaderWithBack
        title="Trainers"
        subtitle="Trainer Information"
      />

      <FlatList
        data={trainers}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TrainerCard
            trainer={item}
            showBookButton={false}
            showPrice={false}
            showRating={false}
          />
        )}
      />
    </View>
  );
};

export default ClientListScreen;
