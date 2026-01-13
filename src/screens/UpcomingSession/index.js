import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import styles from "./styles";
import Header from "../../components/Header";
import GradientCard from "../../components/LinearGradient";
import PlanCard from "../../components/PlanCard";

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

const PLAN_DATA = [
  {
    id: "1",
    plan_name: "Weight Loss",
    plan_type: "3_days",
    single_price: 999,
    upload_file: "https://via.placeholder.com/300",
  },
  {
    id: "2",
    plan_name: "Muscle Gain",
    plan_type: "6_days",
    single_price: 1499,
    upload_file: "https://via.placeholder.com/300",
  },
  {
    id: "3",
    plan_name: "Yoga",
    plan_type: "3_days",
    single_price: 799,
    upload_file: "https://via.placeholder.com/300",
  },
  {
    id: "4",
    plan_name: "Cardio",
    plan_type: "6_days",
    single_price: 1199,
    upload_file: "https://via.placeholder.com/300",
  },
];

const UpcomingSession = () => {
  return (
    <View style={styles.container}>
      <Header username="Jain" />
      <GradientCard />

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
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

        ListHeaderComponent={() => (
          <Text style={styles.sectionTitle}>Upcoming sessions</Text>
        )}

        ListFooterComponent={() => (
          <>
            <Text style={styles.sectionTitle}>Find Your Next Workout</Text>

            <View style={styles.planGrid}>

              {PLAN_DATA.map((item) => (
                <PlanCard key={item.id} item={item} onPress={() => { }} />
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
};

export default UpcomingSession;
