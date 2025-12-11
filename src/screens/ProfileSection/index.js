import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import CommonActionModal from "../../components/ModalComponents";

const ProfileSection = () => {
    const [selectedDate, setSelectedDate] = useState(1);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showDietModal, setShowDietModal] = useState(false);
    const dates = [
        { date: "1", day: "Tue" },
        { date: "3", day: "Thu" },
        { date: "6", day: "Sat" },
        { date: "9", day: "Tue" },
        { date: "11", day: "Thu" },
        { date: "13", day: "Sat" },
        { date: "13", day: "Sat" },
        { date: "13", day: "Sat" },


    ];
    const handleCancelTraining = () => {
        console.log("Training cancelled");
        setShowCancelModal(false);
    };
    const handleDietSubmit = () => {
        console.log("send feedback");
        setShowDietModal(false);
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
                    <TouchableOpacity style={styles.callIcon}>
                        <Icon name="call" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Day Progress Bar */}
                <View style={styles.dayBar}>
                    <Text style={styles.dayText}>Day 1</Text>
                    <View style={styles.timeRow}>
                        <Text style={styles.timeText}>01:02 Hrs</Text>
                        <Icon name="time-outline" size={16} color="#fff" />
                    </View>
                </View>

                {/* Training Time Slots */}
                <Text style={styles.sectionTitle}>Training Time 10:30</Text>

                <View style={styles.slotsRow}>
                    {dates.map((item, index) => {
                        const isActive = selectedDate === index;

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedDate(index)}
                                style={[
                                    styles.slotCard,
                                    isActive && styles.activeSlot
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.slotDay,
                                        isActive && styles.activeSlotText
                                    ]}
                                >
                                    {item.date}
                                </Text>

                                <Text
                                    style={[
                                        styles.slotWeek,
                                        isActive && styles.activeSlotText
                                    ]}
                                >
                                    {item.day}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>


                <View style={styles.divider} />

                {/* Trainer Card */}
                <View style={styles.trainerCard}>
                    <Image
                        source={require("../../../assets/trainer2.jpg")}
                        style={styles.trainerImage}
                    />

                    <View style={styles.trainerInfo}>
                        <Text style={styles.trainerName}>Cristofer Bator</Text>

                        <View style={styles.infoRow}>
                            <View>
                                <Text style={styles.infoLabel}>Experience</Text>
                                <Text style={styles.infoValue}>5 year</Text>
                            </View>

                            <View>
                                <Text style={styles.infoLabel}>Session timing</Text>
                                <View style={styles.sessionRow}>
                                    <Icon name="time-outline" size={14} />
                                    <Text style={styles.infoValue}> 60 min</Text>
                                </View>
                            </View>

                            <View style={styles.ratingRow}>
                                <Icon name="star" size={14} color="#F4B400" />
                                <Text style={styles.ratingText}>4.5</Text>
                            </View>
                        </View>

                        <View style={styles.noSession}>
                            <Text style={styles.noSessionText}> no of session</Text>
                            <View style={styles.sessionicon}>
                                <Icon name="time" size={14} />
                                <Text>12</Text>
                            </View>
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
                        onPress={() => setShowDietModal(true)}
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
            <CommonActionModal
                visible={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                onConfirm={handleCancelTraining}
                iconName="close-circle"
                iconColor="#E53935"
                title="Cancel training"
                description="Refunds are available only before completing 7 sessions of your training plan."
                cancelText="Cancel"
                confirmText="Confirm"
            />
            <CommonActionModal
                visible={showDietModal}
                onClose={() => setShowDietModal(false)}
                onConfirm={handleDietSubmit}
                iconName="nutrition"
                iconColor="#6C6AF5"
                title="Connect with Your Personal Diet Coach!"
                description="Connect with a nutrition expert and receive a plan designed just for you."
                cancelText="Cancel"
                confirmText="Send"
            />

        </View>
    );
};

export default ProfileSection;
 