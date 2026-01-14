import React from "react";
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";

const UserTermsAndConditions = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <Icon name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.title}>     Terms & Conditions</Text>
                </View>

                {/* Intro */}
                <Text style={styles.paragraph}>
                    This Privacy Policy applies to all user information collected through
                    the Infit mobile application operated by Tungston Labs. It explains how
                    Infit collects, uses, and protects user information on the Infit mobile
                    application available on the Apple App Store and Google Play. By using
                    the App, you agree to this Privacy Policy. If you do not agree, please
                    stop using the App.
                </Text>

                {/* 1. Eligibility */}
                <Text style={styles.subTitle}>1. Eligibility</Text>
               

                <Text style={styles.paragraph}>
                    • The App is intended only for individuals who are 18 years of age or
                    older.
                </Text>
                <Text style={styles.paragraph}>
                    • By using the App, you confirm that all information provided is
                    accurate and belongs to you.
                </Text>

                {/* 2. Registration Form */}
                <Text style={styles.subTitle}>2. Registration Form</Text>
                <View style={styles.underline} />

                <Text style={styles.paragraph}>
                    The in-app registration form is used to create a user account and may
                    collect personal and health-related information.
                </Text>

                <Text style={styles.paragraph}>Purpose:</Text>
                <Text style={styles.paragraph}>• To create and manage a user account</Text>
                <Text style={styles.paragraph}>
                    • To personalize fitness programs and wellness recommendations
                </Text>
                <Text style={styles.paragraph}>
                    • To enable communication between the user and the application
                </Text>
                <Text style={styles.paragraph}>
                    • To provide access to paid services, if applicable
                </Text>
                <Text style={styles.paragraph}>
                    • To ensure account security and verification
                </Text>

                <Text style={styles.paragraph}>Data Usage:</Text>
                <Text style={styles.paragraph}>
                    • Information is used only to enhance the user experience
                </Text>
                <Text style={styles.paragraph}>
                    • Helps track fitness progress and activity reports
                </Text>
                <Text style={styles.paragraph}>
                    • Supports analysis to improve app functionality
                </Text>

                <Text style={styles.paragraph}>User Rights:</Text>
                <Text style={styles.paragraph}>
                    • Users can update or modify their information at any time
                </Text>
                <Text style={styles.paragraph}>
                    • Users may request deletion of their account and data
                </Text>

                {/* 3. Purpose of Data Collection */}
                <Text style={styles.subTitle}>3. Purpose of Data Collection</Text>
                <View style={styles.underline} />

                <Text style={styles.paragraph}>
                    User data is collected solely to:
                </Text>
                <Text style={styles.paragraph}>• Create and manage user profiles</Text>
                <Text style={styles.paragraph}>
                    • Provide personalized home training programs
                </Text>
                <Text style={styles.paragraph}>
                    • Track fitness and wellness progress
                </Text>
                <Text style={styles.paragraph}>
                    • Improve workout recommendations
                </Text>
                <Text style={styles.paragraph}>
                    • Communicate important updates and notifications
                </Text>
                <Text style={styles.paragraph}>
                    • The App does not provide medical advice
                </Text>

                {/* 4. Data Sharing */}
                <Text style={styles.subTitle}>4. Data Sharing</Text>
                <View style={styles.underline} />

                <Text style={styles.paragraph}>
                    • We do not sell or rent user data.
                </Text>
                <Text style={styles.paragraph}>
                    • Data may be shared only when required by law.
                </Text>
                <Text style={styles.paragraph}>
                    • With trusted service providers necessary to operate the App.
                </Text>
                <Text style={styles.paragraph}>
                    • With explicit user consent.
                </Text>

                {/* 5. Data Retention & Deletion */}
                <Text style={styles.subTitle}>5. Data Retention & Deletion</Text>
                <View style={styles.underline} />

                <Text style={styles.paragraph}>
                    • User data is stored securely and retained only as long as required
                    for App services.
                </Text>
                <Text style={styles.paragraph}>
                    • Users may update or delete their data at any time through the App or
                    by contacting support.
                </Text>

                {/* 6. User Responsibilities */}
                <Text style={styles.subTitle}>6. User Responsibilities</Text>
                <View style={styles.underline} />

                <Text style={styles.paragraph}>
                    • Provide accurate and truthful information.
                </Text>
                <Text style={styles.paragraph}>
                    • Use workouts responsibly and within personal limits.
                </Text>
                <Text style={styles.paragraph}>
                    • Not misuse App content or submit third-party data.
                </Text>

                {/* 7. Data Security */}
                <Text style={styles.subTitle}>7. Data Security</Text>
                <View style={styles.underline} />

                <Text style={styles.paragraph}>
                    We apply appropriate technical and organizational measures to protect
                    user data from unauthorized access, loss, or misuse.
                </Text>

                {/* 8. Policy Updates */}
                <Text style={styles.subTitle}>8. Changes to This Policy</Text>
                <View style={styles.underline} />

                <Text style={styles.paragraph}>
                    We may update this policy from time to time. Continued use of the App
                    indicates acceptance of the updated policy.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UserTermsAndConditions;
