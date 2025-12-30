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
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import PersonalDetailsCard from "../../components/PersonalDetailsCard";
import TrainingProgressSelector from "../../components/TrainingProgressSelector";
import SwipeButton from "../../components/Swipe";

const TrainerScheduleDetail = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [savedNote, setSavedNote] = useState("");
const navigation = useNavigation();

  const handleSubmitNote = () => {
    if (noteText.trim()) {
      setSavedNote(noteText);
      setNoteText("");
      setShowNoteModal(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
   <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Icon name="chevron-back" size={22} />
  </TouchableOpacity>

  <Text style={styles.headerTitle}>Schedule Detail</Text>
</View>
      <PersonalDetailsCard
        isOpen={detailsOpen}
        onToggle={() => setDetailsOpen(prev => !prev)}
      />
      <Text style={styles.mapHint}>Tap to open the map location.</Text>

      <View style={styles.locationBox}>
        <Icon name="location" size={18} color="#FF3B30" />
        <Text style={styles.locationText}>
          VP Marakar Rd, Edappally Junction, Nethaji Nagar, Edappally, Kochi,
          Ernakulam, Kerala 682024
        </Text>
      </View>
      <Text style={styles.sectionTitle}>Workout plan - GYM</Text>
      <Text style={styles.subText}>Workout type - Single</Text>
      <TrainingProgressSelector progressDay={1} progressTime="00:00" />
      <TouchableOpacity
        style={styles.addNoteBtn}
        onPress={() => setShowNoteModal(true)}
      >
        <Icon name="add" size={18} color="#fff" />
        <Text style={styles.addNoteText}>Add note</Text>
      </TouchableOpacity>
      {savedNote ? (
        <View style={styles.noteBox}>
          <Text style={styles.savedNoteText}>{savedNote}</Text>
        </View>
      ) : null}
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
