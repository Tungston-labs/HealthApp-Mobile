import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";

const PersonalDetailsCard = ({ isOpen, onToggle }) => {
    return (
        <View style={styles.card}>
            {/* TOP ROW */}
            <View style={styles.topRow}>
                <Image
                    source={require("../../../assets/trainer2.jpg")}
                    style={styles.avatar}
                />

                <View style={styles.info}>
                    <Text style={styles.name}>Jeffery</Text>
                    <Text style={styles.time}>08:45</Text>
                </View>

                <View style={styles.progressBadge}>
                    <Text style={styles.progressText}>11/15</Text>
                </View>
            </View>

            {/* META INFO (ALWAYS VISIBLE) */}
            <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                    <Icon name="water-outline" size={16} />
                    <Text style={styles.metaText}>AB+</Text>
                </View>

                <View style={styles.metaItem}>
                    <Icon name="scale-outline" size={16} />
                    <Text style={styles.metaText}>75 KG</Text>
                </View>

                <View style={styles.metaItem}>
                    <Icon name="barbell-outline" size={16} />
                    <Text style={styles.metaText}>5.5</Text>
                </View>
            </View>

            {/* DATE ROW */}
            <View style={styles.dateRow}>
                <View style={styles.dateBlock}>
                    <Text style={styles.label}>Start date</Text>
                    <Text style={styles.value}>12 jan 2025</Text>
                </View>

                <View style={styles.dateBlock}>
                    <Text style={styles.label}>End date</Text>
                    <Text style={styles.value}>28 jan 2025</Text>
                </View>
            </View>

            {/* EXPANDED CONTENT */}
            {isOpen && (
                <>
                    <View style={styles.divider} />

                    <View style={styles.section}>
                        <Text style={styles.label}>Workout Goals</Text>
                        <Text style={styles.value}>Weight loss , Gain muscles</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Have any (Health condition / injury)</Text>
                        <Text style={styles.value}>
                            Lorem ipsum dolor sit amet consectetur. Malesuada at sapien nisi
                            praesent.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.half}>
                            <Text style={styles.label}>Pin code</Text>
                            <Text style={styles.value}>682500</Text>
                        </View>
                        <View style={styles.half}>
                            <Text style={styles.label}>City / Town</Text>
                            <Text style={styles.value}>Ernakulam</Text>
                        </View>

                        <View style={styles.divider} />

                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Landmark</Text>
                        <Text style={styles.value}>Lake Annalisemouth</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Address</Text>
                        <Text style={styles.value}>
                            29250 Elsie Trafficway, West Forestmouth 58892-3171
                        </Text>
                    </View>
                </>
            )}

            {/* ARROW */}
            <TouchableOpacity style={styles.arrow} onPress={onToggle}>
                <Icon
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={22}
                    color="#6C63FF"
                />
            </TouchableOpacity>
        </View>
    );
};

export default PersonalDetailsCard;
