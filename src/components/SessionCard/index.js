import React from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";

const SessionCard = () => {
    return (
        <View style={styles.card}>
            <Image
                source={require("../../../assets/trainer2.jpg")}
                style={styles.avatar}
            />

            <View style={styles.info}>
                <Text style={styles.name}>Jeffery</Text>

                <View style={styles.timeRow}>
                    <Icon name="time-outline" size={14} color="#777" />
                    <Text style={styles.timeText}>10:45 am</Text>
                </View>

                <View style={styles.dateRow}>
                    <View>
                        <Text style={styles.label}>start date</Text>
                        <Text style={styles.date}>12/11/2025</Text>
                    </View>

                    <View>
                        <Text style={styles.label}>End date</Text>
                        <Text style={styles.date}>12/11/2025</Text>
                    </View>
                </View>
            </View>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>02/15</Text>
            </View>
        </View>
    );
};

export default SessionCard;
