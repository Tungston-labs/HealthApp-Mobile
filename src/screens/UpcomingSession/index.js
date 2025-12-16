import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import Header from "../../components/Header";
import GradientCard from "../../components/LinearGradient";

const DATA = [
  {
    id: "1",
    name: "Cristofer Bator",
    time: "10:45 AM",
    day: "Thursday",
    image: require("../../../assets/trainer2.jpg"),
  },
  {
    id: "2",
    name: "Cristofer Bator",
    time: "10:45 AM",
    day: "Saturday",
    image: require("../../../assets/trainer2.jpg"),
  },
  {
    id: "3",
    name: "Cristofer Bator",
    time: "10:45 AM",
    day: "Tuesday",
    image: require("../../../assets/trainer2.jpg"),
  },
];

const UpcomingSession = () => {
  return (
    <View style={styles.container}>
      <Header username="Jain" />

      <GradientCard />

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Training progress</Text>
          <View style={styles.dayPill}>
            <Text style={styles.dayText}>Day 1</Text>
          </View>
        </View>

<View style={styles.progressContainer}>
  <View style={styles.progressTrack}>
    <View style={styles.progressFill} />
  </View>
</View>

        <View style={styles.progressBottom}>
          <Text style={styles.startedText}>Started</Text>
          <Text style={styles.timerText}>⏱ 00.00.00</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Upcoming sessions</Text>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 150 }}
        renderItem={({ item }) => (
          <View style={styles.sessionCard}>
            <Image source={item.image} style={styles.sessionImage} />

            <View style={styles.sessionInfo}>
              <Text style={styles.trainerName}>{item.name}</Text>
              <Text style={styles.timeLabel}>Time</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>

            <View style={styles.dayButton}>
              <Text style={styles.dayButtonText}>{item.day}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default UpcomingSession;
