// components/TrainerBookingModal.js
import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import TrainerInfoCard from "../TrainerInfoCard";

const workoutOptions = ["Single", "Couple", "Group"];

const TrainerBookingModal = ({ visible, onClose, trainer }) => {
    const [selected, setSelected] = useState("Single");
    const navigation=useNavigation();
    if (!trainer) return null;

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <Icon name="close" size={26} color="#000" />
                    </TouchableOpacity>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 120 }}
                    >
                        {/* Header */}
                        <View style={styles.headerSection}>
                            <Image
                                source={require("../../../assets/trainer2.jpg")}
                                style={styles.profileImage}
                            />

                          <TrainerInfoCard
                          name="Cristofer Bator"
                        experience="5 years"
                        sessionTiming="60 min"
                        numSessions="12"
                        workoutType="Yoga"

                          />
                        </View>

                        <Text style={styles.sectionTitle}>Choose your workout type</Text>

                        <View style={styles.optionRow}>
                            {workoutOptions.map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    onPress={() => setSelected(item)}
                                    style={[
                                        styles.optionBtn,
                                        selected === item && styles.optionBtnActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            selected === item && styles.optionTextActive,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Address */}
                        <Text style={[styles.sectionTitle, { marginTop: 15 }]}>Address</Text>

                        <TextInput
                            style={styles.addressInput}
                            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting 
                            industry......."
                            placeholderTextColor="#777"
                            multiline
                        />
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.payBtn} onPress={()=>navigation.navigate("Payment")}>
                            <Text style={styles.payText}>Pay 2500</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default TrainerBookingModal;
