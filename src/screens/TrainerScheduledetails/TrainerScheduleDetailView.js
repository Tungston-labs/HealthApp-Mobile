import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import PersonalDetailsCard from '../../components/PersonalDetailsCard';

const TrainerScheduleDetailView = ({
  data,
  detailsOpen,
  setDetailsOpen,
  isSessionStarting,
  handleStart,
  activeSession,
  canStartToday,
  openMap,
  openAddNote,
  savedNote,
  openEditNote,
  showNoteModal,
  setShowNoteModal,
  isEditing,
  noteText,
  setNoteText,
  handleSubmitNote,
  isSaving,
  onBackPress,
  isDataLoading,
  hideButton=false
}) => {
  console.log({hideButton})
  const isSubmitDisabled =
    isSaving || !noteText.trim() || (isEditing && noteText === savedNote);
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

      <TouchableOpacity
        style={[
          styles.startSessionBtn,
          (activeSession || isSessionStarting || !canStartToday) && {
            opacity: 0.6,
          },
        ]}
        onPress={handleStart}
        disabled={Boolean(activeSession || isSessionStarting || !canStartToday)}
      >
        {isSessionStarting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.startSessionText}>Click to Start Session</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.mapHint}>Tap to open the map location.</Text>

      <TouchableOpacity
        style={styles.locationBox}
        onPress={() => openMap(data?.client?.address)}
      >
        <Icon name="location" size={18} color="#FF3B30" />
        <Text style={styles.locationText}>{data?.client?.address}</Text>
      </TouchableOpacity>

      {!savedNote && (
        <TouchableOpacity style={styles.addNoteBtn} onPress={openAddNote}>
          <Icon name="add" size={18} color="#fff" />
          <Text style={styles.addNoteText}>Add note</Text>
        </TouchableOpacity>
      )}

      {savedNote && (
        <View style={styles.noteBox}>
          <Text style={styles.savedNoteText}>{savedNote}</Text>

          <TouchableOpacity
            onPress={openEditNote}
            style={{ alignSelf: 'flex-end', marginTop: 8 }}
          >
            <Icon name="create-outline" size={20} color="#6C63FF" />
          </TouchableOpacity>
        </View>
      )}

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
              scrollEnabled
              value={noteText}
              maxLength={1000}
              onChangeText={setNoteText}
              style={styles.modalInput}
            />
            <TouchableOpacity
              style={[styles.submitBtn, isSubmitDisabled && { opacity: 0.6 }]}
              onPress={handleSubmitNote}
              disabled={isSubmitDisabled}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitText}>
                  {isEditing ? 'Save' : 'Submit'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TrainerScheduleDetailView;

