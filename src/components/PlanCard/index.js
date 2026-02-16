import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style";

const PlanCard = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image
                source={{ uri: item.upload_file }}
                style={styles.cardImage}
                resizeMode="cover"
            />

            <View style={styles.overlay} />

            <View style={styles.textContainer}>
                <Text style={styles.planName}>{item.plan_name}</Text>
                <Text style={styles.planType}>
                    {item.plan_type === "3_days" ? "3 Days Plan" : "6 Days Plan"}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default PlanCard;
