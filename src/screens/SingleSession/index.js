import React from "react";
import { View, Text, Image, ScrollView, TextInput } from "react-native";
import HeaderWithBack from "../../components/HeaderWithBack";
import TrainerInfoCard from "../../components/TrainerInfoCard";
import TrainingProgressSelector from "../../components/TrainingProgressSelector";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const SingleSession = ({ route }) => {

  const session = route?.params?.session || {
    name: "Cristofer Bator",
    experience: "5 year",
    sessionTiming: "60 min",
    numSessions: "12",
    workoutType: "Gym",
    rating: "4.5",
    image:"../../../assets/trainer3.jpg",
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderWithBack title="Session history" subtitle="SessionDetails" />

      <Image
        source={require("../../../assets/trainer2.jpg")}
        style={styles.topImage}
      />
<View style={styles.infoRowWrapper}>
  <TrainerInfoCard
    name={session.name}
    experience={session.experience}
    sessionTiming={session.sessionTiming}
    numSessions={session.numSessions}
    workoutType={session.workoutType}
    image={require("../../../assets/trainer2.jpg")}
  />

  <View style={styles.ratingBox}>
    <Icon name="star" size={20} color="#F4C430" />
    <Text style={styles.ratingText}>4.6</Text>
  </View>
</View>

     

      <TrainingProgressSelector
        progressDay={1}
        progressTime="01:02 Hrs"
      />


      <View style={styles.notesContainer}>
        <Text style={styles.notesTitle}>Notes</Text>
        <View style={styles.notesBox}>
          <Text style={styles.notesText}>
            Lorem ipsum dolor sit amet consectetur. Nec quis facilisis fusce eget euismod.
          </Text>
        </View>
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
};

export default SingleSession;
