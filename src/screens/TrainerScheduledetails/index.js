import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import PersonalDetailsCard from '../../components/PersonalDetailsCard';
import TrainingProgressSelector from '../../components/TrainingProgressSelector';
import ClickButton from '../../components/Swipe';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  useAddTrainerNoteMutation,
  useGetTrainerNotesQuery,
  useGetTrainerSlotBookingByIdQuery,
  useStartTrainerSessionMutation,
} from '../../redux/api/trainer/scheduleApi';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrainerScheduleDetail = () => {
  const route = useRoute();
  const { id } = route.params;

  const navigation = useNavigation();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { data, error } = useGetTrainerSlotBookingByIdQuery(id);
  const { data: notesData } = useGetTrainerNotesQuery(id);
  const [addNote, { isLoading: isSaving }] = useAddTrainerNoteMutation();
  const [startSession] = useStartTrainerSessionMutation();

  // ✅ Allow only ONE note
  const savedNote = notesData?.notes?.[0] || null;

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load data',
      });
    }
  }, [error]);

  // ✅ Add note
  const openAddNote = () => {
    setNoteText('');
    setIsEditing(false);
    setShowNoteModal(true);
  };

  // ✅ Edit note
  const openEditNote = () => {
    setNoteText(savedNote?.note || '');
    setIsEditing(true);
    setShowNoteModal(true);
  };

  const handleSubmitNote = async () => {
    if (!noteText.trim()) return;

    try {
      await addNote({ id, note: noteText }).unwrap();

      setShowNoteModal(false);
      setNoteText('');
      setIsEditing(false);

      Toast.show({
        type: 'success',
        text1: isEditing ? 'Note updated' : 'Note added',
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to save note',
      });
    }
  };

  const handleStartSession = async () => {
    try {
      await startSession(id).unwrap();
      await AsyncStorage.setItem(
        'active_session',
        JSON.stringify({
          session_id: id,
          started_at: Date.now(),
          duration: data?.training_time?.duration_minutes || 0,
        }),
      );

      Toast.show({ type: 'success', text1: 'Session Started' });
    } catch {
      Toast.show({ type: 'error', text1: 'Failed to start session' });
    }
  };

  const onBackPress = () => {
    navigation.navigate('TrainerNavigator', { screen: 'TrainerHome' });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress}>
          <Icon name="chevron-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Detail</Text>
      </View>

      <PersonalDetailsCard
        data={data?.client}
        time={data?.time}
        progress={{
          count: data?.total_sessions || 0,
          total: data?.session_number || 0,
        }}
        startDate={data?.date}
        endDate={data?.last_date}
        isOpen={detailsOpen}
        onToggle={() => setDetailsOpen(prev => !prev)}
      />

      <View style={styles.swipeWrapper}>
        <ClickButton
          title="Start Session"
          successTitle=" Click to End Session "
          width={250}
          onPress={handleStartSession}
        />
      </View>

      <Text style={styles.mapHint}>Tap to open the map location.</Text>

      <View style={styles.locationBox}>
        <Icon name="location" size={18} color="#FF3B30" />
        <Text style={styles.locationText}>{data?.client?.address}</Text>
      </View>

      {/* ✅ Add Note Button */}
      {!savedNote && (
        <TouchableOpacity style={styles.addNoteBtn} onPress={openAddNote}>
          <Icon name="add" size={18} color="#fff" />
          <Text style={styles.addNoteText}>Add note</Text>
        </TouchableOpacity>
      )}

      {/* ✅ Saved Note with Edit */}
      {savedNote && (
        <View style={styles.noteBox}>
          <Text style={styles.savedNoteText}>{savedNote.note}</Text>

          <TouchableOpacity
            onPress={openEditNote}
            style={{ alignSelf: 'flex-end', marginTop: 8 }}
          >
            <Text style={{ color: '#6C63FF', fontWeight: '600' }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ✅ SAME MODAL for Add & Edit */}
      <Modal visible={showNoteModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setShowNoteModal(false)}
            >
              <Icon name="close" size={22} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              {isEditing ? 'Edit note' : 'Add a note'}
            </Text>

            <TextInput
              placeholder="Type your note here..."
              multiline
              value={noteText}
              onChangeText={setNoteText}
              style={styles.modalInput}
            />

            <TouchableOpacity
              style={[styles.submitBtn, isSaving && { opacity: 0.6 }]}
              onPress={handleSubmitNote}
              disabled={isSaving}
            >
              <Text style={styles.submitText}>
                {isEditing ? 'Save' : 'Submit'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TrainerScheduleDetail;
