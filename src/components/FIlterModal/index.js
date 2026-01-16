// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import styles from './styles';
// import CalendarPicker from './CalendarPicker';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { fetchAvailableTrainersThunk } from '../../redux/slices/trainerPlanSlice';

// const FilterModal = ({ visible, onClose, planId,selectedPlanSlot }) => {
//   const [selectedSlot, setSelectedSlot] = useState('Mon,Wed,Fri');
//   const [selectedDate, setSelectedDate] = useState('2025-12-11');
//   const [selectedTime, setSelectedTime] = useState('09:45 AM');

//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   // Convert 12-hour time to 24-hour (HH:MM)
//   const convertTo24Hour = (timeStr) => {
//     const [time, modifier] = timeStr.split(' ');
//     let [hours, minutes] = time.split(':').map(Number);
//     if (modifier === 'PM' && hours < 12) hours += 12;
//     if (modifier === 'AM' && hours === 12) hours = 0;
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//   };

//   const handleApply = () => {
//     const payload = {
//       plan_id: planId,
//       slot_days: selectedSlot.split(',').map(d => d.toLowerCase()),
//       time: convertTo24Hour(selectedTime),
//       start_date: selectedDate,
//     };

//     dispatch(fetchAvailableTrainersThunk(payload))
//       .unwrap()
//       .then(() => {
//         onClose();
//         // ✅ Navigate to ClientListScreen via its tab name
//         navigation.navigate('TrainerList', { isFiltered: true, planId });
//       })
//       .catch(err => console.log('Fetch trainers error:', err));
//   };


//   const timeSlots = ['09:45 AM', '10:45 AM', '12:45 PM', '02:45 PM', '11:45 AM', '03:45 PM', '04:45 PM'];

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.overlay}>
//         <View style={styles.container}>
//           <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
//             <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
//               <Text style={styles.closeText}>✕</Text>
//             </TouchableOpacity>

//             {/* DATE */}
//             <Text style={styles.sectionTitle}>Select Date Slot</Text>
//             <CalendarPicker selectedDate={selectedDate} onSelect={d => setSelectedDate(d)} />
//             <View style={styles.inputUnderline} />
//             <Text style={styles.sectionTitle}>Select Slot</Text>

//             <View style={styles.slotRow}>
//               {selectedSlot === 'Mon,Tue,Wed,Thu,Fri,Sat' ? (
//                 /* ✅ 6 DAYS PLAN → SINGLE BUTTON */
//                 <TouchableOpacity
//                   style={[styles.slotBtn, styles.activeSlot]}
//                   onPress={() => setSelectedSlot('Mon,Tue,Wed,Thu,Fri,Sat')}
//                 >
//                   <Text style={styles.activeSlotText}>
//                     Mon–Sat
//                   </Text>
//                 </TouchableOpacity>
//               ) : (
//                 /* ✅ NORMAL PLANS → TWO BUTTONS */
//                 ['Mon,Wed,Fri', 'Tue,Thu,Sat'].map(slot => (
//                   <TouchableOpacity
//                     key={slot}
//                     style={[styles.slotBtn, selectedSlot === slot && styles.activeSlot]}
//                     onPress={() => setSelectedSlot(slot)}
//                   >
//                     <Text
//                       style={
//                         selectedSlot === slot
//                           ? styles.activeSlotText
//                           : styles.inactiveSlotText
//                       }
//                     >
//                       {slot}
//                     </Text>
//                   </TouchableOpacity>
//                 ))
//               )}
//             </View>

//             <View style={styles.inputUnderline} />
//             <Text style={styles.sectionTitle}>Select Time Slot</Text>
//             <View style={styles.timeSlotGrid}>
//               {timeSlots.map(t => (
//                 <TouchableOpacity
//                   key={t}
//                   style={[styles.timeBtn, selectedTime === t && styles.activeTimeBtn]}
//                   onPress={() => setSelectedTime(t)}
//                 >
//                   <Text style={selectedTime === t ? styles.activeTimeText : styles.inactiveTimeText}>
//                     {t}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//             <View style={styles.applyWrapper}>
//               <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
//                 <Text style={styles.applyText}>Apply filter →</Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>

//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default FilterModal;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import CalendarPicker from './CalendarPicker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { fetchAvailableTrainersThunk } from '../../redux/slices/trainerPlanSlice';

const FilterModal = ({ visible, onClose, planId, selectedPlanSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState('Mon,Wed,Fri');
  const [selectedDate, setSelectedDate] = useState('2025-12-11');
  const [selectedTime, setSelectedTime] = useState('09:45 AM');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // ✅ AUTO SLOT SELECTION BASED ON PLAN
  useEffect(() => {
    if (!visible) return;

    if (selectedPlanSlot === "3_days") {
      setSelectedSlot('Mon,Wed,Fri');
    } else {
      setSelectedSlot('Mon,Tue,Wed,Thu,Fri,Sat');
    }
  }, [visible, selectedPlanSlot]);

  // Convert 12-hour time to 24-hour (HH:MM)
  const convertTo24Hour = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  const handleApply = () => {
    const payload = {
      plan_id: planId,
      slot_days: selectedSlot.split(',').map(d => d.toLowerCase()),
      time: convertTo24Hour(selectedTime),
      start_date: selectedDate,
    };

    dispatch(fetchAvailableTrainersThunk(payload))
      .unwrap()
      .then(() => {
        onClose();
        navigation.navigate('TrainerList', { isFiltered: true, planId });
      })
      .catch(err => console.log('Fetch trainers error:', err));
  };

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
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Select Date Slot</Text>
            <CalendarPicker
              selectedDate={selectedDate}
              onSelect={d => setSelectedDate(d)}
            />

            <View style={styles.inputUnderline} />
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
              <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                <Text style={styles.applyText}>Apply filter →</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
