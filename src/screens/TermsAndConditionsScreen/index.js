import React from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";

const TermsAndConditions = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <Icon name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Terms & Conditions</Text>
                </View>

                <Text style={styles.paragraph}>
                    Infit App, an online platform connecting fitness enthusiasts with professional
                    trainers for personalized workout and diet plans, yoga, gym guidance, and more. By using
                    the app, you agree to comply with the following terms:
                </Text>

                <Text style={styles.paragraph}>
                    By downloading, registering, or using Infit App, you agree to these Terms and Conditions. If
                    you do not agree, please do not use the app
                    You must be at least 18 years old to use the app.
                    Trainers must provide accurate professional credentials.
                </Text>

                <Text style={styles.paragraph}>
                    Users and trainers must register accounts to access features.
                    You are responsible for keeping your login credentials confidential.
                    All information provided must be accurate and up-to-date
                </Text>
                <Text style={styles.paragraph}>
                    Infit connects users with trainers for fitness programs, diet plans, yoga, and gym
                    guidance.
                    Users and trainers communicate directly through the app.
                    Infit does not provide medical advice; all health and fitness content is informational.
                    Using the app’s plans or following trainer instructions is at your own risk.
                    Consult a qualified healthcare professional before starting any fitness or dietary
                    program.
                    Infit is not liable for injuries, health issues, or other consequences resulting from your
                    participation in training programs.
                </Text>

            </ScrollView>
        </SafeAreaView>
    );
};

export default TermsAndConditions;

