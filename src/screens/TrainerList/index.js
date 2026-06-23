import React, { useEffect, useState } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

import HeaderWithBack from "../../components/HeaderWithBack";
import TrainerCard from "./Trainercard";
import TrainerBookingModal from "../../components/TrainerBookingModal";

import { fetchAvailableTrainersThunk } from "../../redux/slices/trainerPlanSlice";
import {
  fetchChangeTrainerThunk,
  resetTrainerChange,
} from "../../redux/slices/changeTrainerSlice";
import {
  fetchTrainerDetailThunk,
  resetTrainerDetail,
} from "../../redux/slices/trainerDetailSlice";

const TrainerListScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();

  const {
    mode = "book",
    planId,
    trainerId,
    isFiltered = false, // indicates if we came from filtered search
  } = route.params || {};

  const [selectedTrainer, setSelectedTrainer] = useState(null);

  // ---------------- ERROR NORMALIZER ----------------
  const getErrorMessage = (err) => {
    if (!err) return null;
    if (typeof err === "string") return err;
    if (typeof err === "object" && err.message) return err.message;
    return JSON.stringify(err);
  };

  // ---------------- REDUX STATE ----------------
  const reduxState = useSelector((state) => {
    // ✅ updated to match store registration
    if (mode === "book") return state.trainer || {};
    if (mode === "change") return state.trainerChange || {};
    return {};
  });

  const { trainers = [], plan, loading, error } = reduxState;
  const trainersList = Array.isArray(trainers) ? trainers : [];

  // ---------------- FETCH LOGIC ----------------
  useEffect(() => {
    // Fetch unfiltered trainers if we are booking and not coming from filter
    if (mode === "book" && !isFiltered && planId) {
      dispatch(fetchAvailableTrainersThunk({ plan_id: planId }));
    }

    if (mode === "change" && trainerId) {
      dispatch(resetTrainerChange());
      dispatch(fetchChangeTrainerThunk(trainerId));
    }
  }, [dispatch, mode, planId, trainerId, isFiltered]);

  // ---------------- ACTIONS ----------------
  const handleBookNow = (trainer) => {
    setSelectedTrainer(trainer);
    if (mode === "book") {
      dispatch(fetchTrainerDetailThunk(trainer.id));
    }
  };

  const handleCloseModal = () => {
    setSelectedTrainer(null);
    dispatch(resetTrainerDetail());
  };

  // ---------------- LOADER ----------------
  if (loading && trainersList.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ---------------- UI ----------------
  return (
    <View style={{ flex: 1 }}>
      <HeaderWithBack title={plan?.name || "Trainers"} />
      <Text style={{ margin: 10, fontSize: 16 }}>Available Trainers</Text>

      {error ? (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={{ color: "red" }}>
            {getErrorMessage(error)}
          </Text>
        </View>
      ) : (
        <FlatList
          data={trainersList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TrainerCard
              trainer={item}
              planId={plan?.id || planId}
              onBookNow={() => handleBookNow(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TrainerBookingModal
        visible={!!selectedTrainer}
        trainer={selectedTrainer}
        plan={plan}
        trainerId={selectedTrainer?.id}
        planId={plan?.id || planId}
        onClose={handleCloseModal}
        mode={mode}
        oldTrainerId={trainerId}
      />

    </View>
  );
};

export default TrainerListScreen;
