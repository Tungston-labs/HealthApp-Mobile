// screens/TrainerDetail/TrainerDetailScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "./styles";
import RatingBar from "../../components/TrainerDetail/RatingCard";
import ReviewCard from "../../components/TrainerDetail/ReviewCard";
import TrainerInfoCard from "../../components/TrainerInfoCard";
import { fetchTrainerDetailThunk } from "../../redux/slices/trainerDetailSlice";

const TrainerDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { trainerId } = route.params;

  const { loading, data, error } = useSelector(
    (state) => state.trainerDetail
  );

  const [showCertificates, setShowCertificates] = useState(false);

  useEffect(() => {
    if (trainerId) {
      dispatch(fetchTrainerDetailThunk(trainerId));
    }
  }, [trainerId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!data) return null;

  const rating = data.average_rating || 0;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={28} color="#000" />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.headerSection}>
          <Image
            source={
              data.profile_pic
                ? { uri: data.profile_pic }
                : require("../../../assets/trainer2.jpg")
            }
            style={styles.profileImage}
          />

          <TrainerInfoCard
            name={data.name}
            experience={`${data.experience} years`}
            sessionTiming={`${data.section_timing} min`}
            numSessions={data.no_of_section}
            workoutType={data.plan_name}
          />
        </View>

        {/* Certificates */}
        <TouchableOpacity
          style={styles.dropdownBtn}
          onPress={() => setShowCertificates(!showCertificates)}
        >
          <Text style={styles.dropdownText}>Certificates</Text>
          <Icon
            name={showCertificates ? "chevron-up" : "chevron-down"}
            size={24}
            color="#000"
          />
        </TouchableOpacity>

        {showCertificates &&
          data.certificates?.map((cert, index) => (
            <Image
              key={index}
              source={{ uri: cert }}
              style={styles.certificateImage}
            />
          ))}

        {/* Rating Section */}
        <Text style={styles.sectionTitle}>Rating and feedback</Text>
        <View style={styles.divider} />

        <View style={styles.ratingContainer}>
          <View>
            <Text style={styles.label}>Overall rating</Text>
            <Text style={styles.overallRating}>{rating.toFixed(1)}</Text>
            <View style={{ flexDirection: "row" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Icon
                  key={i}
                  name={i <= rating ? "star" : "star-outline"}
                  size={18}
                  color="#FBC02D"
                  style={{ marginLeft: 2 }}
                />
              ))}
            </View>
          </View>

          <View style={styles.ratingDetails}>
            <RatingBar label="5 Stars" rating={data.rating_breakdown?.[5] || 0} />
            <RatingBar label="4 Stars" rating={data.rating_breakdown?.[4] || 0} />
            <RatingBar label="3 Stars" rating={data.rating_breakdown?.[3] || 0} />
            <RatingBar label="2 Stars" rating={data.rating_breakdown?.[2] || 0} />
            <RatingBar label="1 Star" rating={data.rating_breakdown?.[1] || 0} />
          </View>
        </View>

        {/* Reviews */}
        {data.reviews?.length > 0 ? (
          data.reviews.map((review, index) => (
            <ReviewCard
              key={index}
              image={require("../../../assets/trainer3.jpg")}
              name={review.user_name || "User"}
              date={review.date}
              rating={review.rating}
              text={review.comment}
            />
          ))
        ) : (
          <Text style={styles.noReviews}>No reviews yet</Text>
        )}

        <View style={{ height: 90 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => navigation.navigate("Payment", { trainerId })}
        >
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrainerDetailScreen;
