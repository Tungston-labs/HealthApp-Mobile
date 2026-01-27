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

const TrainerTermsAndConditions = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}>
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
                    This Privacy Policy & Terms apply to fitness trainers using the Infit
                    Fitness App to provide fitness guidance or services.
                </Text>
                <Text style={styles.subTitle}>1. Eligibility</Text>
                <Text style={styles.paragraph}>• Trainers must be 18 years or older.</Text>
                <Text style={styles.paragraph}>
                    • Trainers must be legally eligible to provide fitness training
                    services.
                </Text>
                <Text style={styles.paragraph}>
                    • Trainers must provide accurate and verifiable information.
                </Text>
                <Text style={styles.subTitle}>
                    2. Information We Collect (Trainer Side)
                </Text>
                <View style={styles.underline} />
                <Text style={styles.paragraph}>
                    Personal & verification information collected includes:
                </Text>
                <Text style={styles.paragraph}>• Full name</Text>
                <Text style={styles.paragraph}>• Email address</Text>
                <Text style={styles.paragraph}>• Aadhaar card number</Text>
                <Text style={styles.paragraph}>
                    • Aadhaar card upload for verification
                </Text>
                <Text style={styles.paragraph}>
                    • Professional certificates uploaded by the Trainer
                </Text>
                <Text style={styles.subTitle}>3. Purpose of Data Collection</Text>
                <View style={styles.underline} />
                <Text style={styles.paragraph}>
                    Trainer data is collected to:
                </Text>
                <Text style={styles.paragraph}>
                    • Verify trainer identity and qualifications
                </Text>
                <Text style={styles.paragraph}>
                    • Enable trainer profiles and services
                </Text>
                <Text style={styles.paragraph}>
                    • Maintain platform safety and trust
                </Text>
                <Text style={styles.paragraph}>
                    • Process payments, if applicable
                </Text>
                <Text style={styles.subTitle}>4. Trainer Responsibilities</Text>
                <View style={styles.underline} />
                <Text style={styles.paragraph}>
                    • Provide safe, ethical, and professional fitness guidance.
                </Text>
                <Text style={styles.paragraph}>
                    • Avoid giving medical advice or medical diagnosis.
                </Text>
                <Text style={styles.paragraph}>
                    • Respect all users regardless of gender or background.
                </Text>
                <Text style={styles.paragraph}>
                    • Maintain confidentiality of user information.
                </Text>
                <Text style={styles.subTitle}>5. Data Sharing</Text>
                <View style={styles.underline} />
                <Text style={styles.paragraph}>
                    • Trainer data is not sold or rented.
                </Text>
                <Text style={styles.paragraph}>
                    • Data may be shared when required by law.
                </Text>
                <Text style={styles.paragraph}>
                    • With verification or compliance partners.
                </Text>
                <Text style={styles.paragraph}>
                    • To enable core App functionality.
                </Text>
                <Text style={styles.subTitle}>
                    6. Content & Certification Responsibility
                </Text>
                <View style={styles.underline} />
                <Text style={styles.paragraph}>
                    • Trainers are solely responsible for the accuracy of uploaded
                    certificates.
                </Text>
                <Text style={styles.paragraph}>
                    • Infit Fitness does not guarantee or endorse trainer qualifications.
                </Text>
                <Text style={styles.subTitle}>
                    7. Account Suspension & Termination
                </Text>
                <View style={styles.underline} />
                <Text style={styles.paragraph}>
                    Trainer accounts may be suspended or terminated for:
                </Text>
                <Text style={styles.paragraph}>
                    • Submission of false information or documents
                </Text>
                <Text style={styles.paragraph}>
                    • Unsafe, unethical, or unprofessional conduct
                </Text>
                <Text style={styles.paragraph}>
                    • User complaints or policy violations
                </Text>
                <Text style={styles.subTitle}>8. Limitation of Liability</Text>
                <View style={styles.underline} />
                <Text style={styles.paragraph}>
                    • Trainers act as independent service providers.
                </Text>
                <Text style={styles.paragraph}>
                    • Infit Fitness is not responsible for disputes or injuries arising from
                    trainer guidance.
                </Text>
                <Text style={styles.subTitle}>9. Data Security</Text>
                <View style={styles.underline} />
                <Text style={styles.paragraph}>
                    Trainer information is protected using appropriate technical and
                    organizational security measures.
                </Text>
                <Text style={styles.subTitle}>10. Changes to This Policy</Text>
                <View style={styles.underline} />
                <Text style={styles.paragraph}>
                    These terms may be updated from time to time. Continued use of the App
                    confirms acceptance of updated terms.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TrainerTermsAndConditions;
