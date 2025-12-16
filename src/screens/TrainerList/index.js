// screens/Trainers/TrainerListScreen.js
import React, { useState } from "react";
import { View, FlatList,Text } from "react-native";
import HeaderWithBack from "../../components/HeaderWithBack";
import TrainerCard from "./Trainercard";
import styles from "./styles";
import TrainerBookingModal from "../../components/TrainerBookingModal"
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
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBookNow = (trainer) => {
    setSelectedTrainer(trainer);
    setShowModal(true);
  };
  return (
    <View style={styles.container}>
      <HeaderWithBack title="GYM" />
     <Text style={styles.subtitle}>Available trainers</Text> 
<FlatList
  data={trainers}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TrainerCard trainer={item} onBookNow={() => handleBookNow(item)} />
  )}
  showsVerticalScrollIndicator={false}
  ItemSeparatorComponent={() => <View style={styles.separator} />}
/>


      <TrainerBookingModal
        visible={showModal}
        trainer={selectedTrainer}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
};

export default TrainerListScreen;
