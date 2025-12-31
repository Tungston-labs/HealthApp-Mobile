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
import SwipeButton from '../../components/Swipe';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  useAddTrainerNoteMutation,
  useGetTrainerNotesQuery,
  useGetTrainerSlotBookingByIdQuery,
} from '../../redux/api/trainer/scheduleApi';
import Toast from 'react-native-toast-message';

const TrainerScheduleDetail = () => {
  const route = useRoute();
  const { id } = route.params;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState('');
  const navigation = useNavigation();

  const { data, isLoading, isFetching, error, refetch } =
    useGetTrainerSlotBookingByIdQuery(id);

  const [addNote, { isLoading: isSaving }] = useAddTrainerNoteMutation();

  const {
    data: notesData,
    refetch: refetchNotes,
    isLoading: notesloading,
    isFetching: notesFetching,
    error: notesError,
  } = useGetTrainerNotesQuery(id);

  console.log(notesData, notesloading, notesFetching, notesError);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load data',
        text2: error?.data?.message || 'Unable to fetch schedule',
      });
    }
  }, [error]);

  const handleSubmitNote = async () => {
    if (!noteText.trim()) return;

    try {
      await addNote({ id, note: noteText }).unwrap();

      setNoteText('');
      setShowNoteModal(false);
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Failed to save note',
        text2: err?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  const onBackPress = () => {
    navigation.navigate('TrainerNavigator', { screen: 'TrainerHome' });
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
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
      <Text style={styles.mapHint}>Tap to open the map location.</Text>

      <View style={styles.locationBox}>
        <Icon name="location" size={18} color="#FF3B30" />
        <Text style={styles.locationText}>{data?.client?.address}</Text>
      </View>

      {/* Workout Plan */}
      <Text style={styles.sectionTitle}>
        Workout plan - {data?.plan?.plan_name}
      </Text>
      <Text style={styles.subText}>Workout type - {data?.plan?.plan_type}</Text>

      {/* Training Progress */}
      <TrainingProgressSelector
        progressDay={data?.day_label || 'Day 1'}
        progressTime="00:00"
        time={data?.time}
      />

      {/* Add Note Button */}
      <TouchableOpacity
        style={styles.addNoteBtn}
        onPress={() => setShowNoteModal(true)}
      >
        <Icon name="add" size={18} color="#fff" />
        <Text style={styles.addNoteText}>Add note</Text>
      </TouchableOpacity>
      {/* {notesData?.length > 0 && (
        <View style={styles.noteBox}>
          {notesData.map((item, idx) => (
            <Text key={idx} style={styles.savedNoteText}>
              {item?.notes}
            </Text>
          ))}
        </View>
      )} */}
      {notesData && (
        <View style={styles.noteBox}>
            <Text style={styles.savedNoteText}>
              {notesData?.notes}
            </Text>
        </View>
      )}

      <View style={styles.swipeWrapper}>
        <SwipeButton
          title="Slide to start session"
          successTitle="Session Ended"
          width={340}
          onSwipeSuccess={() => console.log('Session Ended')}
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
              style={[styles.submitBtn, isSaving && { opacity: 0.6 }]}
              onPress={handleSubmitNote}
              disabled={isSaving}
            >
              <Text style={styles.submitText}>
                {isSaving ? 'Saving...' : 'Submit'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TrainerScheduleDetail;
