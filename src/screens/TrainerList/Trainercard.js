import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const fallbackImage = require('../../../assets/trainer1.jpg');

const TrainerCard = ({ trainer = {}, onBookNow }) => {
  const navigation = useNavigation();

  const imageSource =
    typeof trainer.profile_pic === 'string' &&
    trainer.profile_pic.trim().length > 0
      ? { uri: trainer.profile_pic }
      : fallbackImage;

  return (
    <View style={styles.card}>
      <View>
        <Image
          source={imageSource}
          style={styles.trainerImg}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={styles.viewProfileBtn}
          onPress={() =>
            navigation.navigate('TrainerDetail', {
              trainerId: trainer.id,
            })
          }
        >
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.trainerName}>
          {trainer.name || 'Trainer'}
        </Text>

        <Text style={styles.exp}>
          {(trainer.experience ?? 0)} Years experience
        </Text>

        <View style={styles.ratingplan}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ₹ {trainer.single_price ?? 0}
            </Text>
            <Text style={styles.plan}>/plan</Text>
          </View>

          <View style={styles.starrating}>
            <Icon name="star" color="#FFB800" size={18} />
            <Text style={styles.rating}>{trainer.star_rating ?? 0}</Text>
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
