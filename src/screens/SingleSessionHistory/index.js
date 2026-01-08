import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import HeaderWithBack from "../../components/HeaderWithBack";
import styles from "./styles";
import {
  fetchCompletedSessionDetailThunk,
} from "../../redux/slices//completedSessionDetailSlice";

const SingleSessionHistory = ({ route }) => {
  const dispatch = useDispatch();
  const sectionId = route?.params?.session?.section_id;

  const { session, loading, error } = useSelector(
    (state) => state.completedSessionDetail
  );

  useEffect(() => {
    if (sectionId) {
      dispatch(fetchCompletedSessionDetailThunk(sectionId));
    }
  }, [sectionId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!session) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HeaderWithBack title="Session history" subtitle="SessionDetails" />

      {/* Top Image */}
      <Image
        source={{
          uri:
            session.trainer?.profile_pic ||
            "https://via.placeholder.com/600x300",
        }}
        style={styles.bannerImage}
      />

      {/* Trainer + Rating */}
      <View style={styles.headerRow}>
        <Text style={styles.trainerName}>
          {session.trainer?.name}
        </Text>

        <View style={styles.ratingBox}>
          <Icon name="star" size={18} color="#F4C430" />
          <Text style={styles.ratingText}>
            {session.trainer?.star_rating || "4.5"}
          </Text>
        </View>
      </View>

      {/* Info Row */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Workout plan</Text>
          <Text style={styles.infoValue}>Gym</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Session timing</Text>
          <View style={styles.inline}>
            <Icon name="time-outline" size={14} />
            <Text style={styles.infoValue}> 60 min</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Workout Type</Text>
          <Text style={styles.infoValue}>Single</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Notes */}
      <Text style={styles.notesTitle}>Notes</Text>

      {session.notes?.length > 0 ? (
        session.notes.map((note, index) => (
          <View key={index} style={styles.notesBox}>
            <Text style={styles.notesText}>{note.note}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.notesText}>No notes available</Text>
      )}

      <View style={{ height: 80 }} />
    </ScrollView>
  );
};

export default SingleSessionHistory;
