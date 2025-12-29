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

const TermsAndConditions = () => {
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

          <Text style={styles.title}>Terms & Conditions</Text>
        </View>

        {/* Intro */}
        <Text style={styles.paragraph}>
          Infit App is an online platform that connects fitness enthusiasts with
          professional trainers for personalized workout plans, diet programs,
          yoga sessions, gym guidance, and related fitness services. By accessing
          or using the app, you agree to comply with the following Terms and
          Conditions.
        </Text>

        {/* User Section */}
        <Text style={styles.subTitle}>User</Text>
        <View style={styles.underline} />

        <Text style={styles.paragraph}>
          • You must be at least 18 years old to use the Infit App.
        </Text>
        <Text style={styles.paragraph}>
          • You are responsible for maintaining the confidentiality of your login
          credentials and account information.
        </Text>
        <Text style={styles.paragraph}>
          • All information provided during registration and profile updates must
          be accurate and up to date.
        </Text>
        <Text style={styles.paragraph}>
          • Infit does not provide medical advice. All fitness and diet information
          is for general guidance only.
        </Text>
        <Text style={styles.paragraph}>
          • You should consult a qualified healthcare professional before starting
          any fitness or dietary program.
        </Text>
        <Text style={styles.paragraph}>
          • Infit is not responsible for injuries, health issues, or other outcomes
          resulting from participation in training programs.
        </Text>

        {/* Trainer Section */}
        <Text style={styles.subTitle}>Trainer</Text>
        <View style={styles.underline} />

        <Text style={styles.paragraph}>
          • Trainers must provide accurate, valid, and up-to-date professional
          credentials.
        </Text>
        <Text style={styles.paragraph}>
          • Trainers are solely responsible for the fitness guidance, workout
          plans, and diet recommendations they provide.
        </Text>
        <Text style={styles.paragraph}>
          • Trainers must ensure all shared content complies with professional and
          ethical standards.
        </Text>
        <Text style={styles.paragraph}>
          • Infit does not verify or guarantee trainer performance, outcomes, or
          results.
        </Text>
        <Text style={styles.paragraph}>
          • Trainers must communicate respectfully and professionally with users
          at all times.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;
