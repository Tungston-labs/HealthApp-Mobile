// screens/TrainerList/Trainercard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const fallbackImage = require('../../../assets/trainer1.jpg');

const TrainerCard = ({
  trainer = {},
  planId,
  onBookNow,
  showBookButton = true,
  showPrice = true,
  showRating = true,
  showViewProfileButton = true,
  onPressCard,
}) => {
  const navigation = useNavigation();
  const imageSource = trainer.trainer_profile_pic || trainer.profile_pic
    ? { uri: trainer.trainer_profile_pic || trainer.profile_pic }
    : fallbackImage;
  const experienceValue = [
    trainer.years_of_experience,
    trainer.experience,
    trainer.trainer_experience,
  ].find(value => value !== null && value !== undefined && value !== "");
  const experience = Number.isFinite(Number(experienceValue))
    ? Number(experienceValue)
    : 0;
console.log("TRAINER CARD DATA:", trainer);
  return (
    <View style={styles.card}>
      {/* IMAGE + PROFILE */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPressCard && onPressCard()} // <- call safely
      >
        <Image
          source={imageSource}
          style={styles.trainerImg}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* View Profile */}
      {showViewProfileButton && (
        <TouchableOpacity
          style={styles.viewProfileBtn}
          onPress={() =>
            navigation.navigate("TrainerDetail", {
              trainerId: trainer.id,
              planId: planId || trainer.plan?.id || trainer.plan_id,
            })
          }
        >
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      )}

      {/* INFO */}
      <View style={styles.info}>
        <Text style={styles.trainerName}>
          {trainer.trainer_name || trainer.name || "Trainer"}
        </Text>
        <Text style={styles.plansName}>
  {trainer.plan_name || trainer.plan?.name || ""}
</Text>

        <Text style={styles.exp}>
          {experience} {experience === 1 ? "Year" : "Years"} experience
        </Text>

        {(showPrice || showRating) && (
          <View style={styles.ratingplan}>
            {showPrice && (
              <View style={styles.priceRow}>
                <Text style={styles.price}>₹ {trainer.single_price ?? 0}</Text>
                {trainer.plan?.name && (
                  <Text style={styles.planName}>
                    {trainer.plan.name}
                  </Text>
                )}
              </View>
            )}
            {showRating && (
              <View style={styles.starrating}>
                <Icon name="star" color="#FFB800" size={18} />
                <Text style={styles.rating}>{trainer.star_rating ?? 0}</Text>
              </View>
            )}
          </View>
        )}

        {/* Book Now */}
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
