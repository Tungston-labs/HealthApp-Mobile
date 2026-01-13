import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import CommonActionModal from "../../components/ModalComponents";
import TrainerInfoCard from "../../components/TrainerInfoCard";
import EmptyState from "../../components/EmptyState";
import FilterModal from "../../components/FIlterModal";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchTrainerDetailThunk } from "../../redux/slices/trainerDetailSlice";

const ProfileSection = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = useSelector((state) => state.auth || {});
  const session = user?.session ?? null;

  const trainerId = route.params?.trainerId;

  const { loading, data } = useSelector((state) => state.trainerDetail);

  const trainer = trainerId ? data ?? null : session;

  useEffect(() => {
    if (trainerId) {
      dispatch(fetchTrainerDetailThunk(trainerId));
    }
  }, [trainerId]);

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

  const trainerName = trainer?.name || "N/A";
  const numSessions = trainer?.no_of_section ?? 0;
  const workoutType = trainer?.plan_name || "N/A";

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Trainers</Text>
            <Text style={styles.subtitle}>Trainer Details</Text>
          </View>
          <TouchableOpacity
            style={styles.callIcon}
            onPress={() => setShowEmergencyModal(true)}
          >
            <Icon name="call" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Trainer Card */}
        <View style={styles.trainerCard}>
          <Image source={imageSource} style={styles.trainerImage} />

          <View style={styles.infoRowWrapper}>
            <View style={styles.trainerInfoCardWrapper}>
              {trainer && (
                <TrainerInfoCard
                  name={trainerName}
                  experience={trainer?.experience ?? 0}
                  trainerTiming={trainerTiming}
                  numSessions={numSessions}
                  workoutType={workoutType}
                />
              )}
            </View>

            <View style={styles.ratingBox}>
              <Icon name="star" size={20} color="#F4C430" />
              <Text style={styles.ratingText}>
                {session?.rating || "4.6"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Workout Plan */}
        <Text style={styles.sectionTitle}>Workout plan - GYM</Text>
        <Text style={styles.workoutText}>Workout type - Single</Text>

        <Text style={styles.notesTitle}>Notes</Text>
        <View style={styles.notesBox}>
          <Text style={styles.notesText}>
            Lorem ipsum dolor sit amet consectetur. Nec quis facilisis fusce eget
            euismod.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Buttons */}
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

        {/* CHANGE TRAINER (FILTER FIRST) */}
        <TouchableOpacity
          style={styles.changeTrainerButton}
          onPress={() => {
            if (trainer?.plan_id) {
              setShowFilterModal(true);
            } else {
              console.warn("Plan ID not available for this trainer!");
            }
          }}
        >
          <Icon name="person-outline" size={18} color="#fff" />
          <Text style={styles.changeTrainerText}> Change trainer</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* FILTER MODAL */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        planId={trainer?.plan_id}
      />

      {/* MODALS */}
      <CommonActionModal
        visible={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => setShowCancelModal(false)}
        iconName="close-circle-outline"
        iconColor="red"
        title="Cancel training"
        description="Refunds are available only before completing 7 sessions."
        cancelText="Cancel"
        confirmText="Confirm"
        showDropdown={false}
        showNote={false}
      />

      <CommonActionModal
        visible={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        onConfirm={() => setShowEmergencyModal(false)}
        iconName="call-outline"
        iconColor="green"
        title="Confirm Emergency Call"
        description="Are you sure you want to make an emergency call?"
        cancelText="Cancel"
        confirmText="Call now"
        showDropdown={false}
        showNote={false}
      />

      <CommonActionModal
        visible={showConsultModal}
        onClose={() => setShowConsultModal(false)}
        onConfirm={() => setShowConsultModal(false)}
        iconName="chatbubble-ellipses-outline"
        iconColor="#6C63FF"
        title="Request a Consultation"
        description="Choose your consultation type and leave a short note."
        cancelText="Cancel"
        confirmText="Send"
        showDropdown={true}
        showNote={true}
      />
    </View>
  );
};

export default ProfileSection;
