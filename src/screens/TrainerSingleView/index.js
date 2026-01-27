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
import TrainerBookingModal from "../../components/TrainerBookingModal";

const TrainerDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { trainerId } = route.params;
  const [selectedCert, setSelectedCert] = useState(null);


  const { loading, data, error } = useSelector(
    (state) => state.trainerDetail
  );

  const [showCertificates, setShowCertificates] = useState(false);

  useEffect(() => {
    if (trainerId) {
      dispatch(fetchTrainerDetailThunk(trainerId));
    }
  }, [trainerId]);
  console.log("TrainerDetailScreen route.params", route.params);
  console.log("Trainer ID received:", trainerId);
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
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={28} color="#000" />
        </TouchableOpacity>

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
            experience={data.experience}
            sessionTiming={data.section_timing}

            numSessions={data.no_of_section}
            workoutType={data.plan_name}
          />
        </View>

        <View style={styles.certContainer}>
          <TouchableOpacity
            style={styles.certHeader}
            onPress={() => setShowCertificates(!showCertificates)}
          >
            <Text style={styles.certTitle}>Certificates</Text>
            <Icon
              name={showCertificates ? "chevron-up" : "chevron-down"}
              size={22}
              color="#000"
            />
          </TouchableOpacity>

          {showCertificates && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.certList}
            >
              {data.certificates?.map((cert, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.certCard}
                  onPress={() => setSelectedCert(cert)}
                  activeOpacity={0.8}
                >
                  <Image
                    source={{ uri: cert }}
                    style={styles.certImage}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          {selectedCert && (
            <View style={styles.certModal}>
              <TouchableOpacity
                style={styles.certClose}
                onPress={() => setSelectedCert(null)}
              >
                <Icon name="close" size={28} color="#fff" />
              </TouchableOpacity>

              <Image
                source={{ uri: selectedCert }}
                style={styles.certFullImage}
                resizeMode="contain"
              />
            </View>
          )}

        </View>

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
          onPress={() => setShowBookingModal(true)}
        >
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>

        <TrainerBookingModal
          visible={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          trainerId={trainerId}
        />
      </View>
    </View>
  );
};

export default TrainerDetailScreen;
