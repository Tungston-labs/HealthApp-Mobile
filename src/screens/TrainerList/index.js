// screens/Trainers/TrainerListScreen.js
import React from "react";
import { View, FlatList,Text } from "react-native";
import HeaderWithBack from "../../components/HeaderWithBack";
import TrainerCard from "./Trainercard";
import styles from "./styles";
import Header from "../../components/Header";

const trainers = [
  {
    id: "1",
    name: "Alex Morgan",
    experience: "7+ Years",
    price: 2500,
    rating: 4.5,
    image: require("../../../assets/trainer1.jpg"),
  },
  {
    id: "2",
    name: "Alex Morgan",
    experience: "7+ Years",
    price: 2500,
    rating: 4.5,
    image: require("../../../assets/trainer1.jpg"),
  },
  {
    id: "3",
    name: "Alex Morgan",
    experience: "7+ Years",
    price: 2500,
    rating: 4.5,
    image: require("../../../assets/trainer1.jpg"),
  },
    {
    id: "4",
    name: "Alex Morgan",
    experience: "7+ Years",
    price: 2500,
    rating: 4.5,
    image: require("../../../assets/trainer1.jpg"),
  },
   {
    id: "5",
    name: "Alex Morgan",
    experience: "7+ Years",
    price: 2500,
    rating: 4.5,
    image: require("../../../assets/trainer1.jpg"),
  },

];

const TrainerListScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderWithBack title="GYM" />
     <Text style={styles.subtitle}>Available trainers</Text> 
   <FlatList
  data={trainers}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <TrainerCard trainer={item} />}
  showsVerticalScrollIndicator={false}
  ItemSeparatorComponent={() => <View style={styles.separator} />}
/>

    </View>
  );
};

export default TrainerListScreen;
