import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import TicketModal from "../../components/TicketModal";
import { createTicket } from "../../services/ticketService";
import CommonActionModal from "../../components/ModalComponents";
import TrainerInfoCard from "../../components/TrainerInfoCard";
import EmptyState from "../../components/EmptyState";
import { Alert } from "react-native";
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

import { resetTrainerChange } from "../../redux/slices/changeTrainerSlice";
import { fetchClientTrainersThunk } from "../../redux/slices/clientTrainerSlice";
import { getImageSource } from "../../utils/media";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

const [showTicketModal, setShowTicketModal] = useState(false);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const { user } = useSelector((state) => state.auth || {});
  const session = user?.session ?? null;

  const trainerId = route.params?.trainerId;

  const { loading, data } = useSelector(
    (state) => state.trainerDetail || {}
  );

  const {
    data: changeData,
    error: changeError,
  } = useSelector((state) => state.trainerChange || {});

  const hasTrainerDetail = data && Object.keys(data).length > 0;
  const trainer =
    trainerId && hasTrainerDetail
      ? data
      : session;
  console.log({ trainer });

  useEffect(() => {
    if (trainerId) {
      dispatch(fetchTrainerDetailThunk(trainerId));
    }
  }, [trainerId, dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (trainerId) {
        dispatch(fetchTrainerDetailThunk(trainerId));
      }
    }, [trainerId, dispatch])
  );

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
    dispatch(fetchClientTrainersThunk());
    dispatch(resetCancelState());
    setShowCancelModal(false);

    Alert.alert(
      "Success",
      "Cancellation request submitted successfully.",
      [
        {
          text: "OK",
          onPress: () => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate("ClientStackScreen");
            }
          },
        },
      ]
    );
  }

  if (cancelError) {
    Alert.alert("Error", cancelError);
    dispatch(resetCancelState());
  }
}, [cancelSuccess, cancelError, dispatch, navigation]);

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
useEffect(() => {
  console.log("showTicketModal =", showTicketModal);
}, [showTicketModal]);

  const currentTrainerId =
    trainerId ||
    trainer?.id ||
    trainer?.trainer_id ||
    trainer?.current_trainer_id;

  console.log("currentTrainerId", currentTrainerId);

  const handleChangeTrainer = () => {
    console.log("CHANGE TRAINER CLICKED");
    console.log("trainer", trainer);
    console.log("currentTrainerId", currentTrainerId);
    if (!currentTrainerId) {
      alert("Trainer not available");
      return;
    }

    navigation.navigate("TrainerList", {
      mode: "change",
      trainerId: currentTrainerId,
    });
  };



  if (!session && !trainerId) {
    return (
      <EmptyState
        image={require("../../../assets/emptytrainer.png")}
        title="No Trainer Assigned"
        subtitle="Once you book a plan, trainer details will appear here."
      />
    );
  }

  if (trainerId && loading && !hasTrainerDetail && !session) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" style={styles.loader} />
      </View>
    );
  }

  if (trainerId && !loading && !hasTrainerDetail && !session) {
    return (
      <EmptyState
        title="Trainer not found"
        subtitle="Unable to load trainer details."
      />
    );
  }

  const fallbackImage = require("../../../assets/trainer1.jpg");

  const imageSource = getImageSource(
    trainer?.profile_pic || trainer?.profile_pic_url || trainer?.trainer_profile_pic,
    fallbackImage
  );

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

const handleTicketSubmit = async ({ trainer_id, complaint }) => {
  try {
    await createTicket({
      trainer_id,
      complaint,
    });

    alert("Complaint submitted successfully.");
    setShowTicketModal(false);
  } catch (error) {
    console.log("Ticket Error:", error?.response?.data);

    alert(
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      "Unable to submit complaint."
    );
  }
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
  onPress={() => {
    console.log("Report button pressed");
    setShowTicketModal(true);
  }}
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
          const payload = currentTrainerId ? { trainer_id: currentTrainerId } : {};
          dispatch(cancelTrainingThunk(payload));
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
<TicketModal
  visible={showTicketModal}
  onClose={() => setShowTicketModal(false)}
  trainerId={
    trainer?.id ||
    trainer?.trainer_id ||
    trainerId
  }
  trainerName={trainer?.name || "Trainer"}
  onSubmit={handleTicketSubmit}
/>
    </View>
  );
};

export default ProfileSection;
