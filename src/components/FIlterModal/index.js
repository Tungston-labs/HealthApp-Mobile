import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import styles from './styles';
import CalendarPicker from './CalendarPicker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { fetchAvailableTrainersThunk } from '../../redux/slices/trainerPlanSlice';

const FilterModal = ({ visible, onClose, planId }) => {
  const [selectedSlot, setSelectedSlot] = useState('Mon,Wed,Fri');
  const [selectedDate, setSelectedDate] = useState('2025-12-11');
  const [selectedTime, setSelectedTime] = useState('09:45 AM');
  const dispatch = useDispatch();
  const handleApply = () => {
    const payload = {
      plan_id: planId,
      slot_days: selectedSlot.split(',').map(d => d.toLowerCase()),
      time: selectedTime.replace(' AM', '').replace(' PM', ''),
      start_date: selectedDate,
    };

    dispatch(fetchAvailableTrainersThunk(payload));
    onClose();
    navigation.navigate('TrainerList');
  };
  const navigation = useNavigation();
  const timeSlots = [
    '09:45 AM',
    '10:45 AM',
    '12:45 PM',
    '02:45 PM',
    '11:45 AM',
    '03:45 PM',
    '04:45 PM',
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        {/* MODAL BOX */}
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* CLOSE BUTTON */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
            {/* DATE SECTION */}
            <View style={styles.rowHeader}>
              <Text style={styles.sectionTitle}>Select Date Slot</Text>
            </View>

            <CalendarPicker
              selectedDate={selectedDate}
              onSelect={d => setSelectedDate(d)}
            />
            {/* SLOT SECTION */}
            <View style={styles.rowHeader}>
              <Text style={styles.sectionTitle}>Select Slot</Text>
            </View>

            <View style={styles.slotRow}>
              {['Mon,Wed,Fri', 'Tue,Thu,Sat'].map(slot => (
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

            {/* TIME SECTION */}
            <View style={styles.rowHeader}>
              <Text style={styles.sectionTitle}>Select Time Slot</Text>
            </View>

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
          </ScrollView>

          <View style={styles.applyWrapper}>
            <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
              <Text style={styles.applyText}>Apply filter →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
