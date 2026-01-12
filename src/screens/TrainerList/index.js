import React, { useEffect, useState } from "react";
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderWithBack from "../../components/HeaderWithBack";
import TrainerCard from "./Trainercard";
import styles from "./styles";
import TrainerBookingModal from "../../components/TrainerBookingModal";
import { fetchAvailableTrainersThunk } from "../../redux/slices/trainerPlanSlice";
import { fetchTrainerDetailThunk, resetTrainerDetail } from "../../redux/slices/trainerDetailSlice";
import { useNavigation, useRoute } from "@react-navigation/native";

const TrainerListScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();

  const { trainers, plan, loading, error } = useSelector((state) => state.trainer);

  const [selectedTrainerId, setSelectedTrainerId] = useState(null);

  const trainersList = Array.isArray(trainers) ? trainers : [];
  const isFiltered = route.params?.isFiltered;
const planId = route.params?.planId;

  useEffect(() => {
    if (!isFiltered) {
      dispatch(fetchAvailableTrainersThunk({ plan_id: planId }));
    }
  }, [dispatch, isFiltered, planId]);


const handleBookNow = (trainerId) => {
  setSelectedTrainerId(trainerId);
  dispatch(fetchTrainerDetailThunk(trainerId)); 
};


  const handleCloseModal = () => {
    setSelectedTrainerId(null);
    dispatch(resetTrainerDetail());
  };

  if (loading && trainersList.length === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack title={plan?.name || "Trainers"} />
      <Text style={styles.subtitle}>Available trainers</Text>

      {error ? (
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={50} color="red" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={trainersList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TrainerCard
              trainer={item}
              onBookNow={() => handleBookNow(item.id)}
            />

          )}
        />
      )}

      <TrainerBookingModal
        visible={!!selectedTrainerId}
        onClose={handleCloseModal}
      />
    </View>
  );
};

export default TrainerListScreen;
