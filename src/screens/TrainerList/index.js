import React, { useEffect, useState } from "react";
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons"; 
import HeaderWithBack from "../../components/HeaderWithBack";
import TrainerCard from "./Trainercard";
import styles from "./styles";
import TrainerBookingModal from "../../components/TrainerBookingModal";
import { fetchAvailableTrainersThunk } from "../../redux/slices/trainerPlanSlice";
import { useRoute } from "@react-navigation/native";

const TrainerListScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  
  // 1. Redux State
  const { trainers, plan, loading, error } = useSelector((state) => state.trainer);
  
  // 2. Local State
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  // 3. Derived Data (Ensure trainers is always an array)
  const trainersList = Array.isArray(trainers) ? trainers : [];
  
  // 4. Params from Navigation
  const isFiltered = route.params?.isFiltered;
  const planId = route.params?.planId || 3;

  useEffect(() => {
    // Only fetch default list if we DID NOT just come from the filter modal
    // This prevents the filter results from being overwritten
    if (!isFiltered) {
      dispatch(fetchAvailableTrainersThunk({ plan_id: planId }));
    }
  }, [dispatch, isFiltered, planId]);

  const handleRetry = () => {
    dispatch(fetchAvailableTrainersThunk({ plan_id: planId }));
  };

  // --- UI Logic ---

  if (loading && trainersList.length === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack title={plan?.name || 'Trainers'} />
      <Text style={styles.subtitle}>Available trainers</Text>

      {error ? (
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={50} color="red" />
          <Text style={styles.errorText}>
            {typeof error === "string" ? error : "Something went wrong"}
          </Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : trainersList.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No trainers available for this selection.</Text>
        </View>
      ) : (
        <FlatList
          data={trainersList}
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