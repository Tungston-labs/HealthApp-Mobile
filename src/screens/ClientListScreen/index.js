// screens/ClientListScreen/index.js
import React, { useCallback } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import HeaderWithBack from "../../components/HeaderWithBack";
import TrainerCard from "../../screens/TrainerList/Trainercard";
import EmptyState from "../../components/EmptyState";
import { fetchClientTrainersThunk } from "../../redux/slices/clientTrainerSlice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const ClientListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { trainers, loading } = useSelector(state => state.clientTrainer);
  console.log({ trainers })
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchClientTrainersThunk());
    }, [dispatch])
  );
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!trainers || trainers.length === 0) {
    return (
      <View style={styles.container}>
        <HeaderWithBack title="Trainers" subtitle="Trainer Information" />
        <EmptyState
          image={require("../../../assets/emptytrainer.png")}
          title="No Trainers Available"
          subtitle="Once you book a plan, trainer plans will appear here."
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack title="Trainers" subtitle="Trainer Informations" />

      <FlatList
        data={trainers}
        keyExtractor={item => String(item.id)}
        
        renderItem={({ item }) => (

          <TrainerCard
            trainer={item}
            showBookButton={false}
            showPrice={false}
            showRating={false}
            showViewProfileButton={false}
            onPressCard={() => {
              console.log({ item })
              console.log("CLIENT LIST: navigating to ProfileSection with trainer_id", item.trainer_id);
              // Use push to ensure navigation happens in current stack
              navigation.push("ProfileSection", { trainerId: item.trainer_id });
            }}
          />
        )}
      />
    </View>
  );
};

export default ClientListScreen;