import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import ScheduleCard from "../../components/ScheduleCard";
import styles from "./style";

const TrainerHome = () => {
  const navigation = useNavigation();

  const goToScheduleDetail = () => {
    navigation.navigate("TrainerScheduleDetail");
  };

  const goToNotifications = () => {
    navigation.navigate("Notifications");
  };

  // 👉 Schedule data (empty array means no schedules)
  // const schedules = [];
  const schedules = [
    {
      time: "08:45",
      name: "Jeffery",
      image: require("../../../assets/trainer2.jpg"),
      weight: "75",
      rating: "5.5",
      progress: "02/15",
    },
  ];

  return (
    <View style={styles.container}>
     <View style={styles.headerCard}>
  <View>
    <Text style={styles.greeting}>Hi, John</Text>
    <Text style={styles.subTitle}>Gym</Text>
  </View>

  <TouchableOpacity
    style={styles.bell}
    onPress={goToNotifications}
    activeOpacity={0.7}
  >
    <Icon name="notifications-outline" size={20} />
  </TouchableOpacity>
</View>


      <Text style={styles.sectionTitle}>Today's Schedule</Text>

      {schedules.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../Images/empty.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />

          <Text style={styles.emptyTitle}>Your schedule is empty</Text>
          <Text style={styles.emptySubText}>
            Users will book your training slots{"\n"}stay tuned.
          </Text>
        </View>
      ) : (

        <ScrollView showsVerticalScrollIndicator={false}>
          {schedules.map((item, index) => (
            <ScheduleCard
              key={index}
              time={item.time}
              name={item.name}
              image={item.image}
              weight={item.weight}
              rating={item.rating}
              progress={item.progress}
              onPress={goToScheduleDetail}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TrainerHome;
