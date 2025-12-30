import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles"
const generateDatesForYear = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 365; i++) {
        const dateObj = new Date(today);
        dateObj.setDate(today.getDate() + i);
        const day = dateObj.toLocaleDateString("en-US", { weekday: "short" });
        const date = dateObj.getDate();
        dates.push({ date, day, fullDate: dateObj });
    }
    return dates;
};

const TrainingProgressSelector = ({ onDateSelect, progressDay = 1, progressTime = "00:00 Hrs" }) => {
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const yearDates = generateDatesForYear();
        setDates(yearDates);
    }, []);

    const handleSelect = (index) => {
        setSelectedDateIndex(index);
        if (onDateSelect) {
            onDateSelect(dates[index].fullDate);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.dayBar}>
                <Text style={styles.dayText}>Day {progressDay}</Text>
                <View style={styles.timeRow}>
                    <Text style={styles.timeText}>{progressTime}</Text>
                    <Icon name="time-outline" size={16} color="#fff" />
                </View>
            </View>
      <Text style={styles.timeHeader}>Training Time 10:30</Text>


            <FlatList
                data={dates}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingVertical: 10 }}
                renderItem={({ item, index }) => {
                    const isActive = selectedDateIndex === index;
                    return (
                        <TouchableOpacity
                            onPress={() => handleSelect(index)}
                            style={[styles.slotCard, isActive && styles.activeSlot]}
                        >
                            <Text style={[styles.slotDay, isActive && styles.activeSlotText]}>
                                {item.date}
                            </Text>
                            <Text style={[styles.slotWeek, isActive && styles.activeSlotText]}>
                                {item.day}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}
export default TrainingProgressSelector;