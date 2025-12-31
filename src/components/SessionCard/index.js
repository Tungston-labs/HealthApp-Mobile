import React from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";

const SessionCard = ({
    clientName,
    date,
    time,
    endDate,
    status,
    sessionCount,
    totalSessions,
}) => {
    return (
        <View style={styles.card}>
            <Image
                source={require("../../../assets/trainer2.jpg")}
                style={styles.avatar}
            />

            <View style={styles.info}>
                <Text style={styles.name}>{clientName}</Text>

                <View style={styles.timeRow}>
                    <Icon name="time-outline" size={14} color="#777" />
                    <Text style={styles.timeText}>
                        {typeof time === "string" && time.includes(":")
                            ? time.slice(0, 5)
                            : time}
                    </Text>
                </View>

                <View style={styles.dateRow}>
                    <View>
                        <Text style={styles.label}>Start date</Text>
                        <Text style={styles.date}>{date}</Text>
                    </View>

                    <View>
                        <Text style={styles.label}>End date</Text>
                        <Text style={styles.date}>{endDate || "-"}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                    {String(sessionCount).padStart(2, "0")}/
                    {String(totalSessions).padStart(2, "0")}
                </Text>
            </View>
        </View>
    );
};


export default SessionCard;
