import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

import CommonActionModal from "../../components/ModalComponents";
import TrainerInfoCard from "../../components/TrainerInfoCard";
import EmptyState from "../../components/EmptyState";

import { useDispatch, useSelector } from "react-redux";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { fetchTrainerDetailThunk } from "../../redux/slices/trainerDetailSlice";
import {
  cancelTrainingThunk,
  resetCancelState,
} from "../../redux/slices/CancelTrainingSlice";
import {
  requestNutritionThunk,
  resetNutritionState,
} from "../../redux/slices/NutritionRequestSlice";

import {
  fetchChangeTrainerThunk,
  resetTrainerChange,
} from "../../redux/slices/changeTrainerSlice";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const [consultType, setConsultType] = useState("call");
  const [consultNote, setConsultNote] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);

  const { user } = useSelector((state) => state.auth || {});
  const session = user?.session ?? null;

  const trainerId = route.params?.trainerId;

  const { loading, data } = useSelector(
    (state) => state.trainerDetail || {}
  );

  const {
    loading: changeLoading,
    data: changeData,
    error: changeError,
  } = useSelector((state) => state.trainerChange || {});

  const trainer = trainerId ? data ?? null : session;
  console.log({ trainer });

  useEffect(() => {
    if (trainerId) {
      dispatch(fetchTrainerDetailThunk(trainerId));
    }
  }, [trainerId, dispatch]);

  const trainerPhone =
    trainer?.phno ||
    null;

  const handleEmergencyCall = () => {
    if (!trainerPhone) {
      alert("Trainer phone number not available");
      return;
    }
    Linking.openURL(`tel:${trainerPhone}`).catch(() =>
      alert("Unable to make the call")
    );
    setShowEmergencyModal(false);
  };

  const {
    success: cancelSuccess,
    error: cancelError,
  } = useSelector((state) => state.cancelTraining || {});

  useFocusEffect(
    useCallback(() => {
      dispatch(resetCancelState());
    }, [dispatch])
  );

  useEffect(() => {
    if (cancelSuccess) {
      alert("Cancellation request submitted successfully");
      setShowCancelModal(false);
      dispatch(resetCancelState());
    }

    if (cancelError) {
      alert(cancelError);
      dispatch(resetCancelState());
    }
  }, [cancelSuccess, cancelError, dispatch]);

  const {
    loading: nutritionLoading,
    success: nutritionSuccess,
    error: nutritionError,
  } = useSelector((state) => state.nutritionRequest || {});

  const handleConsultSubmit = () => {
    if (!consultNote.trim()) {
      alert("Please enter a note");
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
      alert("Nutrition request submitted successfully");
      setShowConsultModal(false);
      setConsultNote("");
      setConsultType("call");
      dispatch(resetNutritionState());
    }

    if (nutritionError) {
      alert(nutritionError);
      dispatch(resetNutritionState());
    }
  }, [nutritionSuccess, nutritionError, dispatch]);

  const handleChangeTrainer = () => {
    if (!trainer?.id) {
      alert("Trainer not available");
      return;
    }

    navigation.navigate("TrainerList", {
      mode: "change",
      trainerId: trainer.id,
    });
  };

  useEffect(() => {
    if (changeData) {
      alert("Trainer change request successful");
      dispatch(resetTrainerChange());

      // refresh trainer data if needed
      dispatch(fetchTrainerDetailThunk(trainer.id));
    }

    if (changeError) {
      alert(changeError);
      dispatch(resetTrainerChange());
    }
  }, [changeData, changeError, dispatch, trainer]);

  if (!session && !trainerId) {
    return (
      <EmptyState
        image={require("../../../assets/emptytrainer.png")}
        title="No Trainer Assigned"
        subtitle="Once you book a plan, trainer details will appear here."
      />
    );
  }

  if (trainerId && !loading && !trainer) {
    return (
      <EmptyState
        title="Trainer not found"
        subtitle="Unable to load trainer details."
      />
    );
  }

  const fallbackImage = require("../../../assets/trainer1.jpg");

  const imageSource = trainer?.profile_pic
    ? { uri: trainer.profile_pic }
    : fallbackImage;

  const trainerTiming = trainer?.section_timing
    ? `${trainer.section_timing} min`
    : "N/A";

  const workoutPlan = trainer?.plan_name || "N/A";
  const workoutTypeText = trainer?.workout_type || "N/A";
  const trainerNotes = trainer?.notes || "No notes available";

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("ClientList");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
            >
              <Icon name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>

            <View>
              <Text style={styles.title}>Trainers</Text>
              <Text style={styles.subtitle}>Trainer Details</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.callIcon}
            onPress={() => setShowEmergencyModal(true)}
          >
            <Icon name="call" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.trainerCard}>
          <Image source={imageSource} style={styles.trainerImage} />
          <TrainerInfoCard
            name={trainer?.name || "N/A"}
            experience={trainer?.experience ?? 0}
            sessionTiming={trainerTiming}
            numSessions={trainer?.no_of_section ?? 0}
            workoutType={workoutPlan}
          />
        </View>
        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Workout plan - {workoutPlan}</Text>
        <Text style={styles.workoutText}>Workout type - {workoutTypeText}</Text>

        <Text style={styles.notesTitle}>Notes</Text>
        <View style={styles.notesBox}>
          <Text style={styles.notesText}>{trainerNotes}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setShowConsultModal(true)}
          >
            <Text style={styles.buttonText}>Report</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowCancelModal(true)}
          >
            <Text style={styles.cancelText}>Cancel training</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.changeTrainerButton}
          onPress={handleChangeTrainer}
        >
          <Icon name="person-outline" size={18} color="#fff" />
          <Text style={styles.changeTrainerText}>Change trainer</Text>
        </TouchableOpacity>

      </ScrollView>

      <CommonActionModal
        visible={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => {
          dispatch(cancelTrainingThunk());
          setShowCancelModal(false);
        }}
        iconName="close-circle-outline"
        iconColor="red"
        title="Cancel training"
        description="Refunds are available only before completing 7 sessions."
        cancelText="Cancel"
        confirmText="Confirm"
      />

      <CommonActionModal
        visible={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        onConfirm={handleEmergencyCall}
        iconName="call-outline"
        iconColor="green"
        title="Confirm Emergency Call"
        description={
          trainerPhone
            ? `Call trainer at ${trainerPhone}?`
            : "Trainer phone number not available"
        }
        cancelText="Cancel"
        confirmText="Call now"
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

export default ProfileSection;
