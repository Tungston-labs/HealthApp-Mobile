import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import styles from "./style";
import SessionCard from "../../components/SessionCard";
import CalendarModal from "../../components/CalendarModal";
import { fetchTrainerBookings } from "../../redux/slices/trainerUpcomingSessions";

const SessionBooking = () => {
    const dispatch = useDispatch();

    const {
        bookings,
        isLoading,
        next,
    } = useSelector((state) => state.trainer);

    const [activeTab, setActiveTab] = useState("booking");
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [page, setPage] = useState(1);

    /* 🔄 Fetch bookings */
    useEffect(() => {
        if (activeTab === "booking") {
            dispatch(fetchTrainerBookings({ page: 1 }));
        }
    }, [activeTab]);

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

                {/* BOOKINGS TAB */}
                {activeTab === "booking" && (
                    <>
                        <Text style={styles.sectionTitle}>Session bookings</Text>

                        {isLoading && <ActivityIndicator size="large" />}

                        {!isLoading && bookings.length === 0 && (
                            <Text>No bookings found</Text>
                        )}

                        {bookings.map((item) => (
                            <SessionCard
                                key={item.id}
                                date={item.date}
                                time={item.time_label}
                                clientName={item.client.name}
                                status={item.status}
                            />
                        ))}
                    </>
                )}

                {/* HISTORY TAB */}
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

                        {/* Later connect history API here */}
                    </>
                )}

            </ScrollView>

            <CalendarModal
                visible={calendarVisible}
                onClose={() => setCalendarVisible(false)}
            />
        </View>
    );
};

export default SessionBooking;
