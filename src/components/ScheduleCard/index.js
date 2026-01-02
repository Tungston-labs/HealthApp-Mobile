import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const ScheduleCard = ({
  time,
  name,
  image,
  weight,
  rating,
  progress,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.wrapper}
    >
      <View style={styles.timelineDot} />
      <View style={styles.card}>
        <Text style={styles.time}>{time}</Text>

        <Image source={image} style={styles.avatar} />

        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>

          <View style={styles.metaRow}>

            <View style={styles.metaItem}>
              <Icon name="weight-lifter" size={16} color="#666" />
              <Text style={styles.metaText}>{weight} KG</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="human-male-height" size={16} color="#666" />
              <Text style={styles.metaText}>{rating}</Text>
            </View>
          </View>


          <View style={styles.progressBadge}>
            <Text style={styles.progressText}>{progress}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleCard;
