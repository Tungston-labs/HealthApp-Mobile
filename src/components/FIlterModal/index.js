import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import CalendarPicker from './CalendarPicker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMobProfileThunk } from '../../redux/slices/mobProfileSlice';
import { fetchAvailableTrainersThunk } from '../../redux/slices/trainerPlanSlice';

const FilterModal = ({ visible, onClose, planId, selectedPlanSlot }) => {

  const [selectedSlot, setSelectedSlot] = useState('Mon,Tue,Wed,Thu,Fri,Sat');
  const [selectedDate, setSelectedDate] = useState('2026-01-03');
  const [selectedTime, setSelectedTime] = useState('09:00 AM');

  const slotOptions = ['Mon,Wed,Fri', 'Tue,Thu,Sat'];

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector(state => state.trainer.loading);
  const user = useSelector(state => state.auth?.user);
  const profile = useSelector(state => state.mobProfile?.profile);

  // Require explicit latitude & longitude — backend checks these fields
  const hasUserLocation = !!(
    (profile && profile.latitude && profile.longitude) ||
    (user && user.latitude && user.longitude)
  );

  useEffect(() => {
    if (!visible) return;
    // refresh mobile profile when opening modal to ensure latest lat/lng
    dispatch(fetchMobProfileThunk());

    if (selectedPlanSlot === '3_days') {
      setSelectedSlot('Mon,Wed,Fri');
    } else {
      setSelectedSlot('Mon,Tue,Wed,Thu,Fri,Sat');
    }
  }, [visible, selectedPlanSlot]);

  const convertTo24Hour = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  const handleApply = async () => {
    if (loading) return;
    if (!hasUserLocation) {
      Alert.alert(
        'Location Required',
        'Please update your profile with an address or location before searching for trainers.'
      );
      return;
    }

    try {
      const payload = {
        plan_id: planId,
        slot_days: selectedSlot.split(',').map(d => d.toLowerCase()),
        time: convertTo24Hour(selectedTime),
        start_date: selectedDate,
      };

      console.log('🔥 FINAL PAYLOAD:', payload);

      await dispatch(fetchAvailableTrainersThunk(payload)).unwrap();

      onClose();
      navigation.navigate('TrainerList', {
        isFiltered: true,
        mode: 'book',
        planId,
      });

    } catch (err) {
      console.log(err);
    }
  };

  const timeSlots = [
    '09:00 AM',
    '09:45 AM',
    '10:45 AM',
    '11:45 AM',
    '12:45 PM',
    '02:45 PM',
    '03:45 PM',
    '04:45 PM',
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>
              Please select date
            </Text>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          <CalendarPicker
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />
          <View style={styles.inputUnderline} />

          <Text style={styles.sectionTitle}>Select Slot</Text>

          <View style={styles.slotRow}>
            {slotOptions.map(slot => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.slotBtn,
                  selectedSlot === slot && styles.activeSlot,
                ]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Text
                  style={
                    selectedSlot === slot
                      ? styles.activeSlotText
                      : styles.inactiveSlotText
                  }
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputUnderline} />

          {/* Time Selector */}
          <Text style={styles.sectionTitle}>Select Time Slot</Text>
          <View style={styles.timeSlotGrid}>
            {timeSlots.map(t => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.timeBtn,
                  selectedTime === t && styles.activeTimeBtn,
                ]}
                onPress={() => setSelectedTime(t)}
              >
                <Text
                  style={
                    selectedTime === t
                      ? styles.activeTimeText
                      : styles.inactiveTimeText
                  }
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.applyWrapper}>
            <TouchableOpacity
              style={[styles.applyBtn, loading && { opacity: 0.5 }]}
              disabled={loading}
              onPress={handleApply}
            >
              <Text style={styles.applyText}>
                {loading ? 'Loading...' : 'View Available Trainers →'}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
