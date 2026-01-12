import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const fallbackImage = require('../../../assets/trainer1.jpg');

const TrainerCard = ({
  trainer = {},
  onBookNow,
  showBookButton = true,
  showPrice = true,
  showRating = true,
}) => {
  const navigation = useNavigation();

  const imageSource = trainer.profile_pic
    ? { uri: trainer.profile_pic }
    : fallbackImage;

  return (
    <View style={styles.card}>
      {/* IMAGE + PROFILE */}
      <View>
        <Image
          source={imageSource}
          style={styles.trainerImg}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={styles.viewProfileBtn}
          onPress={() =>
            navigation.navigate('TrainerDetail', { trainerId: trainer.id })
          }
        >
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      </View>

      {/* INFO */}
      <View style={styles.info}>
        <Text style={styles.trainerName}>
          {trainer.name || 'Trainer'}
        </Text>

        <Text style={styles.exp}>
          {trainer.experience ?? 0} Years experience
        </Text>

        {(showPrice || showRating) && (
          <View style={styles.ratingplan}>
            {showPrice && (
              <View style={styles.priceRow}>
                <Text style={styles.price}>
                  ₹ {trainer.single_price ?? 0}
                </Text>
                <Text style={styles.plan}>/plan</Text>
              </View>
            )}

            {showRating && (
              <View style={styles.starrating}>
                <Icon name="star" color="#FFB800" size={18} />
                <Text style={styles.rating}>
                  {trainer.star_rating ?? 0}
                </Text>
              </View>
            )}
          </View>
        )}

        {showBookButton && (
          <TouchableOpacity onPress={onBookNow} style={styles.bookBtn}>
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.fullUnderline} />
    </View>
  );
};

export default TrainerCard;
