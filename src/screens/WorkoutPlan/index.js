import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../../utils/toast";

import Header from "../../components/Header";
import FilterModal from "../../components/FIlterModal";
import PlanCard from "../../components/PlanCard";
import Skeleton from "../../components/Skelton";
import UpcomingSessionSection from "../UpcomingSession";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { fetchPlansThunk } from "../../redux/slices/planSlice";
import styles from "./style";
import { fetchWeeklySessionsThunk } from "../../redux/slices/UpcomingSessionSlice";
import CommonActionModal from "../../components/ModalComponents";
import {
  requestNutritionThunk,
  resetNutritionState,
} from "../../redux/slices/NutritionRequestSlice";
const WorkoutPlan = ({ navigation }) => {
  const dispatch = useDispatch();
  const { sessions } = useSelector(
    state => state.weeklySessions
  );

  useEffect(() => {
    dispatch(fetchWeeklySessionsThunk());
  }, [dispatch]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlanSlot, setSelectedPlanSlot] = useState(null);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [consultType, setConsultType] = useState("call");
  const [consultNote, setConsultNote] = useState("");
  const [showConsultModal, setShowConsultModal] = useState(false);


  const { plans, loading, error } = useSelector(
    (state) => state.planList
  );

  const user = useSelector((state) => state.auth?.user);
  useEffect(() => {
    console.log("Sessions:", sessions);
  }, [sessions]);
  useEffect(() => {
    dispatch(fetchPlansThunk());
  }, [dispatch]);
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchPlansThunk());
    }, [dispatch])
  );
  const {
    loading: nutritionLoading,
    success: nutritionSuccess,
    error: nutritionError,
  } = useSelector((state) => state.nutritionRequest || {});

  const handleConsultSubmit = () => {
    if (!consultNote.trim()) {
      showError("Please enter a note");
      return;
    }

    dispatch(
      requestNutritionThunk({
        consultation_type: consultType,
        note: consultNote,
      })
    );
  };
  useEffect(() => {
    if (nutritionSuccess) {
      showSuccess("Nutrition request submitted successfully");
      setShowConsultModal(false);
      setConsultNote("");
      setConsultType("call");
      dispatch(resetNutritionState());
    }

    if (nutritionError) {
      showError(nutritionError);
      dispatch(resetNutritionState());
    }
  }, [nutritionSuccess, nutritionError, dispatch]);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/*  FIXED HEADER */}
      <Header
        username={user?.name || "User"}
        subtitle="Your workout plans"
        onNotificationPress={() =>
          navigation.navigate("Notifications")
        }
      />

      {loading ? (
        <FlatList
          data={Array.from({ length: 6 })}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.gridContainer}
          renderItem={() => (
            <Skeleton height={220} borderRadius={16} />
          )}
        />
      ) : (
        <FlatList
          data={showUpcoming ? plans.slice(0, 4) : plans}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.gridContainer}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}

          ListHeaderComponent={
            sessions && sessions.length > 0 ? (
              <>
                <UpcomingSessionSection
                  sessions={sessions}
                  loading={loading}
                  onConsultPress={() => setShowConsultModal(true)}

                />
                <View style={{ height: 16 }} />
              </>
            ) : null
          }

          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No plans available
            </Text>
          }

          renderItem={({ item }) => (
            <PlanCard
              item={item}
              onPress={() => {
                setSelectedPlanId(item.id);
                setShowModal(true);
                setSelectedPlanSlot(item?.plan_type);
              }}
            />
          )}
        />
      )}

      {error && <Text>{JSON.stringify(error)}</Text>}

      <FilterModal
        visible={showModal}
        planId={selectedPlanId}
        selectedPlanSlot={selectedPlanSlot}
        onClose={(success = false) => {
          setShowModal(false);
          if (success) {
            setShowUpcoming(true);
          }
        }}
      />

      <CommonActionModal
        visible={showConsultModal}
        onClose={() => setShowConsultModal(false)}
        onConfirm={!nutritionLoading ? handleConsultSubmit : undefined}
        iconName="chatbubble-ellipses-outline"
        iconColor="#000000"
        title="Request a Consultation"
        description="Choose your consultation type and leave a short note."
        cancelText="Cancel"
        confirmText={nutritionLoading ? "Sending..." : "Send"}
        showDropdown
        showNote
        selectedValue={consultType}
        onSelectValue={setConsultType}
        noteValue={consultNote}
        onChangeNote={setConsultNote}
      />
    </View>
  );
};

export default WorkoutPlan;