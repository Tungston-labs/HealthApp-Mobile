import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";
import SessionCard from "../../components/SessionCard";
import CalendarModal from "../../components/CalendarModal";

const SessionBooking = () => {
    const [activeTab, setActiveTab] = useState("booking");
    const [calendarVisible, setCalendarVisible] = useState(false);

    return (
        <View style={styles.container}>

            {/* TOGGLE */}
            <View style={styles.toggleWrapper}>
                <TouchableOpacity
                    style={[
                        styles.toggleBtn,
                        activeTab === "booking" && styles.activeToggle,
                    ]}
                    onPress={() => setActiveTab("booking")}
                >
                    <Text
                        style={[
                            styles.toggleText,
                            activeTab === "booking" && styles.activeToggleText,
                        ]}
                    >
                        Session bookings
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.toggleBtn,
                        activeTab === "history" && styles.activeToggle,
                    ]}
                    onPress={() => setActiveTab("history")}
                >
                    <Text
                        style={[
                            styles.toggleText,
                            activeTab === "history" && styles.activeToggleText,
                        ]}
                    >
                        Session History
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

                {activeTab === "booking" && (
                    <>
                        <Text style={styles.sectionTitle}>Section booking</Text>

                        <SessionCard />
                        <SessionCard />
                        <SessionCard />
                        <SessionCard />
                    </>
                )}

                {activeTab === "history" && (
                    <>
                        <View style={styles.filterRow}>
                            <View style={styles.searchBox}>
                                <Icon name="search" size={18} color="#7B77FF" />
                                <TextInput
                                    placeholder="Search by username"
                                    style={styles.searchInput}
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.dateBtn}
                                onPress={() => setCalendarVisible(true)}
                            >
                                <Icon name="calendar" size={18} color="#fff" />
                                <Text style={styles.dateText}>Select Date</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.historyDate}>12 nov 2025</Text>

                        <SessionCard />
                        <SessionCard />
                        <SessionCard />
                        <SessionCard />
                    </>
                )}

            </ScrollView>

            {/* CALENDAR MODAL */}
            <CalendarModal
                visible={calendarVisible}
                onClose={() => setCalendarVisible(false)}
            />
        </View>
    );
};

export default SessionBooking;
