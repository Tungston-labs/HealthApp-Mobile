import React, { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import TrainerScheduleDetailView from './TrainerScheduleDetailView';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  useAddTrainerNoteMutation,
  useGetTrainerNotesQuery,
  useGetTrainerSlotBookingByIdQuery,
} from '../../redux/api/trainer/scheduleApi';
import Toast from 'react-native-toast-message';
import { useStartSession } from '../../hooks/trainer/useStartSession';
import { useActiveSession } from '../../hooks/trainer/useActiveSession';
import { isToday, parseISO } from 'date-fns';

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
  const [addNote, { isLoading: isSaving }] = useAddTrainerNoteMutation();
  const { handleStartSession, isLoading: isSessionStarting } =
    useStartSession();
  const { activeSession, setActiveSession } = useActiveSession();

  const savedNote = notesData?.notes?.[0] || null;

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

  const openMap = address => {
    if (!address) return;

    const encoded = encodeURIComponent(address);

    const url =
      Platform.OS === 'ios'
        ? `http://maps.apple.com/?q=${encoded}`
        : `geo:0,0?q=${encoded}`;

    Linking.openURL(url).catch(() => {
      // fallback for Android
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${encoded}`,
      );
    });
  };
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
      savedNote={savedNote}
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
