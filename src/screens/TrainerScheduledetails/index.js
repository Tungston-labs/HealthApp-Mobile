import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./style";
import PersonalDetailsCard from "../../components/PersonalDetailsCard";
import TrainingProgressSelector from "../../components/TrainingProgressSelector";
import SwipeButton from "../../components/Swipe";

const TrainerScheduleDetail = () => {
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [showNote, setShowNote] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Detail</Text>
      </View>

      {/* Personal Details (Dropdown) */}
      <PersonalDetailsCard
        isOpen={detailsOpen}
        onToggle={() => setDetailsOpen(!detailsOpen)}
      />

      {/* Location */}
      <Text style={styles.mapHint}>Tap to open the map location.</Text>

      <View style={styles.locationBox}>
        <Icon name="location" size={18} color="#FF3B30" />
        <Text style={styles.locationText}>
          VP Marakar Rd, Edappally Junction, Nethaji Nagar, Edappally, Kochi,
          Ernakulam, Kerala 682024
        </Text>
      </View>

      {/* Workout Plan */}
      <Text style={styles.sectionTitle}>Workout plan - GYM</Text>
      <Text style={styles.subText}>Workout type - Single</Text>

      {/* Reused Calendar Component */}
      <TrainingProgressSelector progressDay={1} progressTime="00:00" />

      {/* Add Note */}
      <TouchableOpacity
        style={styles.addNoteBtn}
        onPress={() => setShowNote(!showNote)}
      >
        <Icon name="add" size={18} color="#fff" />
        <Text style={styles.addNoteText}>Add note</Text>
      </TouchableOpacity>

      {showNote && (
        <View style={styles.noteBox}>
          <TextInput
            placeholder="Type your note here..."
            multiline
            style={styles.noteInput}
          />
        </View>
      )}

      {/* Swipe Button */}
      <View style={styles.swipeWrapper}>
        <SwipeButton
          title="Slide to start session"
          successTitle="Session Ended"
          width={340}
          onSwipeSuccess={() => console.log("Session Ended")}
        />
      </View>
    </ScrollView>
  );
};

export default TrainerScheduleDetail;
