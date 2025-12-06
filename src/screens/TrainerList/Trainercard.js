// screens/Trainers/TrainerCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const TrainerCard = ({ trainer, onBookNow }) => {
    const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View>
        <Image source={trainer.image} style={styles.trainerImg} />

        <TouchableOpacity
          style={styles.viewProfileBtn}
          onPress={() => navigation.navigate("TrainerDetail", { trainer })}
        >
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.trainerName}>{trainer.name}</Text>
        <Text style={styles.exp}>{trainer.experience} experience</Text>
        <View style={styles.ratingplan}>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹ {trainer.price} </Text>
            <Text style={styles.plan}>/plan</Text>
          </View>
          <View style={styles.starrating}>
            <Icon name="star" color="#FFB800" size={18} style={styles.starIcon} />
            <Text style={styles.rating}>{trainer.rating}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onBookNow} style={styles.bookBtn}>
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrainerCard;
