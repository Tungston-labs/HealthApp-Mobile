import React, { useCallback, useEffect, useState } from 'react';
import TrainerScheduleDetailView from './TrainerScheduleDetailView';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  useAddTrainerNoteMutation,
  useEditTrainerNoteMutation,
  useGetTrainerNotesQuery,
  useGetTrainerSlotBookingByIdQuery,
} from '../../redux/api/trainer/scheduleApi';
import Toast from 'react-native-toast-message';
import { useStartSession } from '../../hooks/trainer/useStartSession';
import { useActiveSession } from '../../hooks/trainer/useActiveSession';
import { isToday, parseISO } from 'date-fns';
import { openMapByAddress } from '../../utils/trainer/openMap';

const TrainerScheduleDetailContainer = () => {
  const route = useRoute();
  const { id } = route.params;

  const navigation = useNavigation();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { data, error } = useGetTrainerSlotBookingByIdQuery(id);
  const { data: notesData } = useGetTrainerNotesQuery(id);
  const [addNote, { isLoading: isAdding }] = useAddTrainerNoteMutation();
  const [editNote, { isLoading: isEditingNote }] = useEditTrainerNoteMutation();
  const { handleStartSession, isLoading: isSessionStarting } =
    useStartSession();
  const { activeSession, setActiveSession } = useActiveSession();

  const isSaving = isAdding || isEditingNote;

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load data',
      });
    }
  }, [error]);

  const openAddNote = () => {
    setNoteText('');
    setIsEditing(false);
    setShowNoteModal(true);
  };

  const openEditNote = () => {
    setNoteText(notesData?.note || '');
    setIsEditing(true);
    setShowNoteModal(true);
  };

  const handleSubmitNote = async () => {
    if (!noteText.trim()) return;

    try {
      if (isEditing) {
        await editNote({ id, note: noteText }).unwrap();
      } else {
        await addNote({ id, note: noteText }).unwrap();
      }

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

  const canStartToday = !!data?.date && isToday(parseISO(data.date));
  const handleStart = async () => {
    if (isSessionStarting || !canStartToday) return;

    if (activeSession) {
      Toast.show({
        type: 'info',
        text1: 'A session is already active',
      });
      return;
    }

    const session = await handleStartSession({ id });

    if (!session) return;

    setActiveSession(session);

    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'TrainerNavigator',
          params: { screen: 'TrainerHome' },
        },
      ],
    });
  };

  const onBackPress = () => {
    navigation.navigate('TrainerNavigator', { screen: 'TrainerHome' });
  };

  const openMap = useCallback(address => {
    openMapByAddress(address);
  }, []);

  return (
    <TrainerScheduleDetailView
      data={data}
      detailsOpen={detailsOpen}
      setDetailsOpen={setDetailsOpen}
      isSessionStarting={isSessionStarting}
      handleStart={handleStart}
      activeSession={activeSession}
      canStartToday={canStartToday}
      openMap={openMap}
      openAddNote={openAddNote}
      savedNote={notesData?.note}
      openEditNote={openEditNote}
      showNoteModal={showNoteModal}
      setShowNoteModal={setShowNoteModal}
      isEditing={isEditing}
      noteText={noteText}
      setNoteText={setNoteText}
      handleSubmitNote={handleSubmitNote}
      isSaving={isSaving}
      onBackPress={onBackPress}
    />
  );
};

export default TrainerScheduleDetailContainer;
