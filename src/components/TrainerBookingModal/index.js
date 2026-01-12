import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import TrainerInfoCard from "../TrainerInfoCard";

const workoutOptions = ["Single", "Couple", "Group"];

const TrainerBookingModal = ({ visible, onClose }) => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState("Single");

    const { loading, data, error } = useSelector(
        (state) => state.trainerDetail
    );

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Close */}
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <Icon name="close" size={26} color="#000" />
                    </TouchableOpacity>

                    {/* Content */}
                    {loading ? (
                        <ActivityIndicator size="large" />
                    ) : error ? (
                        <Text style={styles.errorText}>{error}</Text>
                    ) : !data ? (
                        <Text>No trainer data found</Text>
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Header */}
                            <View style={styles.headerSection}>
                                <Image
                                    source={
                                        data?.profile_pic?.length > 0
                                            ? { uri: data.profile_pic }
                                            : require("../../../assets/trainer2.jpg")
                                    }
                                    style={styles.profileImage}
                                />




                                <TrainerInfoCard
                                    name={data.name}
                                    experience={data.experience}
                                    sessionTiming={data.section_timing}
                                    numSessions={data.no_of_section}
                                    workoutType={data.plan_name}
                                />


                            </View>

                            <Text style={styles.sectionTitle}>
                                Choose your workout type
                            </Text>

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

                            <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
                                Address
                            </Text>

                            <TextInput
                                style={styles.addressInput}
                                placeholder="Enter your address"
                                multiline
                            />
                        </ScrollView>
                    )}

                    {/* Footer */}
                    {!!data && (
                        <View style={styles.footer}>
                            <TouchableOpacity
                                style={styles.payBtn}
                                onPress={() =>
                                    navigation.navigate("Payment", {
                                        trainerId: data.id,
                                        workoutType: selected,
                                    })
                                }
                            >
                                <Text style={styles.payText}>
                                    Pay {Number(data.expecting_salary)}
                                </Text>

                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default TrainerBookingModal;
