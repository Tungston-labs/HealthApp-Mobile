import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./style";
import PersonalDetailsCard from "../../components/PersonalDetailsCard";
import TrainingProgressSelector from "../../components/TrainingProgressSelector";
import SwipeButton from "../../components/Swipe";

const TrainerScheduleDetail = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [savedNote, setSavedNote] = useState("");

  const handleSubmitNote = () => {
    if (noteText.trim()) {
      setSavedNote(noteText);
      setNoteText("");
      setShowNoteModal(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Detail</Text>
      </View>

      {/* Personal Details */}
      <PersonalDetailsCard
        isOpen={detailsOpen}
        onToggle={() => setDetailsOpen(prev => !prev)}
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

      {/* Training Progress */}
      <TrainingProgressSelector progressDay={1} progressTime="00:00" />

      {/* Add Note Button */}
      <TouchableOpacity
        style={styles.addNoteBtn}
        onPress={() => setShowNoteModal(true)}
      >
        <Icon name="add" size={18} color="#fff" />
        <Text style={styles.addNoteText}>Add note</Text>
      </TouchableOpacity>

      {/* Saved Note Display */}
      {savedNote ? (
        <View style={styles.noteBox}>
          <Text style={styles.savedNoteText}>{savedNote}</Text>
        </View>
      ) : null}

      {/* Swipe Button */}
      <View style={styles.swipeWrapper}>
        <SwipeButton
          title="Slide to start session"
          successTitle="Session Ended"
          width={340}
          onSwipeSuccess={() => console.log("Session Ended")}
        />
      </View>

      <Modal
        visible={showNoteModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNoteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setShowNoteModal(false)}
            >
              <Icon name="close" size={22} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Add a note</Text>

            <TextInput
              placeholder="Type your note here..."
              multiline
              value={noteText}
              onChangeText={setNoteText}
              style={styles.modalInput}
            />

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmitNote}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TrainerScheduleDetail;
