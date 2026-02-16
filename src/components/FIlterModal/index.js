import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import CalendarPicker from './CalendarPicker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import { fetchAvailableTrainersThunk } from '../../redux/slices/trainerPlanSlice';

const FilterModal = ({ visible, onClose, planId, selectedPlanSlot }) => {
  // Default values similar to Postman request
  const [selectedSlot, setSelectedSlot] = useState('Mon,Tue,Wed,Thu,Fri,Sat');
  const [selectedDate, setSelectedDate] = useState('2026-01-03');
  const [selectedTime, setSelectedTime] = useState('09:00 AM');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector(state => state.trainer.loading);

  // Auto slot selection based on plan type
  useEffect(() => {
    if (!visible) return;

    if (selectedPlanSlot === '3_days') {
      setSelectedSlot('Mon,Wed,Fri');
    } else {
      setSelectedSlot('Mon,Tue,Wed,Thu,Fri,Sat');
    }
  }, [visible, selectedPlanSlot]);

  // Convert time to 24-hour format for backend
  const convertTo24Hour = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  // Apply filter (no GPS)

  const handleApply = async () => {
    if (loading) return;   // 🔥 BLOCK DOUBLE PRESS

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




  // Predefined time slots
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
          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* Date Selector */}
          <Text style={styles.sectionTitle}>Select Date Slot</Text>
          <CalendarPicker
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />
          <View style={styles.inputUnderline} />

          {/* Slot Selector */}
          <Text style={styles.sectionTitle}>Select Slot</Text>
          <View style={styles.slotRow}>
            {selectedSlot === 'Mon,Tue,Wed,Thu,Fri,Sat' ? (
              <TouchableOpacity style={[styles.slotBtn, styles.activeSlot]}>
                <Text style={styles.activeSlotText}>Mon–Sat</Text>
              </TouchableOpacity>
            ) : (
              ['Mon,Wed,Fri', 'Tue,Thu,Sat'].map(slot => (
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
              ))
            )}
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

          {/* Apply Filter Button */}
          <View style={styles.applyWrapper}>
            <TouchableOpacity
              style={[styles.applyBtn, loading && { opacity: 0.5 }]}
              disabled={loading}
              onPress={handleApply}
            >
              <Text style={styles.applyText}>
                {loading ? 'Loading...' : 'Apply filter →'}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
