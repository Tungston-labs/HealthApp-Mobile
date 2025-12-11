import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import ProfileHeaderCard from "../../components/ProfileHeader";
import HistoryCard from "../../components/Historycard";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
      
      <ProfileHeaderCard
        name="Peter Tarka"
        profileImage={require("../../../assets/trainer1.jpg")}
        showEdit={true}
      />

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Trainer info</Text>

        <HistoryCard
          item={{
            image: require("../../../assets/trainer1.jpg"),
            experience: "5 year",
            sessionTiming: "60 min",
            numSessions: "12",
            workoutPlan: "Gym",
          }}
        />

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.menuText}>Edit profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Terms & Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutItem}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
