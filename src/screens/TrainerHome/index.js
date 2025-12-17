import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import ScheduleCard from "../../components/ScheduleCard";
import styles from "./style";

const TrainerHome = () => {
  const navigation = useNavigation();

  const goToScheduleDetail = () => {
    navigation.navigate("TrainerScheduleDetail");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi, John</Text>
          <Text style={styles.subTitle}>Gym</Text>
        </View>

        <TouchableOpacity style={styles.bell}>
          <Icon name="notifications-outline" size={20} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Today's Schedule</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScheduleCard
          time="08:45"
          name="Jeffery"
          image={require("../../../assets/trainer2.jpg")}
          weight="75"
          rating="5.5"
          progress="02/15"
          onPress={goToScheduleDetail}
        />

        <ScheduleCard
          time="09:45"
          name="Jeffery"
          image={require("../../../assets/trainer2.jpg")}
          weight="75"
          rating="5.5"
          progress="11/15"
          onPress={goToScheduleDetail}
        />

        <ScheduleCard
          time="10:45"
          name="Jeffery"
          image={require("../../../assets/trainer2.jpg")}
          weight="75"
          rating="5.5"
          progress="14/15"
          onPress={goToScheduleDetail}
        />

        <ScheduleCard
          time="11:45"
          name="Jeffery"
          image={require("../../../assets/trainer2.jpg")}
          weight="75"
          rating="5.5"
          progress="0/15"
          onPress={goToScheduleDetail}
        />

        <ScheduleCard
          time="12:45"
          name="hii"
          image={require("../../../assets/trainer2.jpg")}
          weight="75"
          rating="5.5"
          progress="0/15"
          onPress={goToScheduleDetail}
        />
      </ScrollView>
    </View>
  );
};

export default TrainerHome;
