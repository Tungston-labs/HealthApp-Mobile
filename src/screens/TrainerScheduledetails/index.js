import React, { useState } from 'react';
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
import { useGetTrainerSlotBookingByIdQuery } from '../../redux/api/trainer/scheduleApi';

const TrainerScheduleDetail = () => {
  const route = useRoute();
  const { id } = route.params;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [savedNote, setSavedNote] = useState('');
  const navigation = useNavigation();

  const { data, isLoading, isFetching, error, refetch } =
    useGetTrainerSlotBookingByIdQuery(id);
  console.log(data, isLoading, isFetching, error, refetch);
  const handleSubmitNote = () => {
    if (noteText.trim()) {
      setSavedNote(noteText);
      setNoteText('');
      setShowNoteModal(false);
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
        isOpen={detailsOpen}
        onToggle={() => setDetailsOpen(prev => !prev)}
      />

       <View style={styles.swipeWrapper}>

        <ClickButton
          title="Click to Start Session"
          successTitle=" Click to End Session "
          width={340}
          onSwipeSuccess={() => console.log('Session Ended')}
        />
      </View>
      <Text style={styles.mapHint}>Tap to open the map location.</Text>

      <View style={styles.locationBox}>
        <Icon name="location" size={18} color="#FF3B30" />
        <Text style={styles.locationText}>{data?.client?.address}</Text>
      </View>
      <Text style={styles.sectionTitle}>
        Workout plan - {data?.plan?.plan_name}
      </Text>
      <Text style={styles.subText}>Workout type - {data?.plan?.plan_type}</Text>
      <TrainingProgressSelector
        progressDay={1}
        progressTime="00:00"
        time={data?.time}
      />
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
