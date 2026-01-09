import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import CommonActionModal from "../../components/ModalComponents";
import TrainerInfoCard from "../../components/TrainerInfoCard";
import EmptyState from "../../components/EmptyState";
import { useSelector } from "react-redux";

const ProfileSection = () => {
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [showConsultModal, setShowConsultModal] = useState(false);

    const { user } = useSelector((state) => state.auth || { user: null });

    const handleCancelTraining = () => {
        console.log("Training cancelled");
        setShowCancelModal(false);
    };

    const handleConsultation = () => {
        console.log("send feedback");
        setShowConsultModal(false);
    };

    const handleEmergencyCall = () => {
        setShowEmergencyModal(false);
    };

    // Use session from logged-in user
    const session = user?.session ? user : null;

    // Empty state condition
    if (!session) {
        return (
            <EmptyState
                image={require("../../../assets/emptytrainer.png")}
                title="No Trainer Assigned"
                subtitle="Once you book a trainer, their details will appear here."
            />
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Trainers</Text>
                        <Text style={styles.subtitle}>Trainer Details</Text>
                    </View>
                    <TouchableOpacity style={styles.callIcon} onPress={() => setShowEmergencyModal(true)}>
                        <Icon name="call" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                {/* Trainer Card */}
                <View style={styles.trainerCard}>
                    <Image
                        source={require("../../../assets/trainer2.jpg")}
                        style={styles.trainerImage}
                    />
                    <View style={styles.infoRowWrapper}>
                        <View style={styles.trainerInfoCardWrapper}>
                            <TrainerInfoCard
                                name={session.name}
                                experience={session.experience}
                                sessionTiming={session.sessionTiming}
                                numSessions={session.numSessions}
                                workoutType={session.workoutType}
                            />
                        </View>

                        <View style={styles.ratingBox}>
                            <Icon name="star" size={20} color="#F4C430" />
                            <Text style={styles.ratingText}>{session.rating || "4.6"}</Text>
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
                        Lorem ipsum dolor sit amet consectetur. Nec quis facilisis fusce eget euismod.
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

                <TouchableOpacity style={styles.changeTrainerButton}>
                    <Icon name="person-outline" size={18} color="#fff" />
                    <Text style={styles.changeTrainerText}> Change trainer</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Modals */}
            <CommonActionModal
                visible={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                onConfirm={handleCancelTraining}
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
                onConfirm={handleEmergencyCall}
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
                onConfirm={handleConsultation}
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
