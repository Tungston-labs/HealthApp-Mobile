import React, { useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles";
import HeaderWithBack from "../../components/HeaderWithBack";
import TrainerCard from "../../screens/TrainerList/Trainercard";
import EmptyState from "../../components/EmptyState";
import { fetchClientTrainersThunk } from "../../redux/slices/clientTrainerSlice";
import { useNavigation } from "@react-navigation/native";

const ClientListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { trainers, loading } = useSelector(state => state.clientTrainer);

  useEffect(() => {
    dispatch(fetchClientTrainersThunk());
  }, [dispatch]);

  // Show loader while fetching
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Show empty state if no trainers
  if (!trainers || trainers.length === 0) {
    return (
      <View style={styles.container}>
        <HeaderWithBack
          title="Trainers"
          subtitle="Trainer Information"
        />
        <EmptyState
          image={require("../../../assets/emptytrainer.png")}
          title="No Trainers Available"
          subtitle="Once you book a plan, trainer plans will appear here."
        />
      </View>
    );
  }

  // Render FlatList only if trainers exist
  return (
    <View style={styles.container}>
      <HeaderWithBack
        title="Trainers"
        subtitle="Trainer Information"
      />

  <FlatList
  data={trainers}
  keyExtractor={item => item.id.toString()}
  renderItem={({ item }) => (
    <TrainerCard
      trainer={item}
      showBookButton={false}
      showPrice={false}
      showRating={false}
      showViewProfileButton={false}
      onPressCard={() => 
        navigation.push("ProfileSection", { trainerId: item.trainer_id })
      }
    />
  )}
/>



    </View>
  );
};


export default ClientListScreen;
