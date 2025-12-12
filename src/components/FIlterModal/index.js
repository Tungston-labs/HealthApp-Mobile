import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import styles from "./styles";
import CalendarPicker from "./CalendarPicker";
import { useNavigation } from "@react-navigation/native";

const FilterModal = ({ visible, onClose }) => {
  const [selectedSlot, setSelectedSlot] = useState("Mon,Wed,Fri");
  const [selectedDate, setSelectedDate] = useState("2025-12-11");
  const [selectedTime, setSelectedTime] = useState("09:45 AM");
const navigation = useNavigation();
  const timeSlots = [
    "09:45 AM",
    "10:45 AM",
    "12:45 PM",
    "02:45 PM",
    "11:45 AM",
    "03:45 PM",
    "04:45 PM",
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

            {/* SLOT SECTION */}
            <View style={styles.rowHeader}>
              <Text style={styles.sectionTitle}>Select Slot</Text>
            </View>

            <View style={styles.slotRow}>
              {["Mon,Wed,Fri", "Tue,Thu,Sat"].map((slot) => (
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
              {timeSlots.map((t) => (
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
            {/* DATE SECTION */}
            <View style={styles.rowHeader}>
              <Text style={styles.sectionTitle}>Select Date Slot</Text>
            </View>

            <CalendarPicker
              selectedDate={selectedDate}
              onSelect={(d) => setSelectedDate(d)}
            />

             <View style={styles.applyWrapper}>
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => navigation.navigate("TrainerList")} 
      >
        <Text style={styles.applyText}>Apply filter →</Text>
      </TouchableOpacity>
    </View>


      

        </View>

        {/* OUTSIDE TAP CLOSES MODAL */}
        <Pressable style={styles.backdrop} onPress={onClose} />

      </View>
    </Modal>
  );
};

export default FilterModal;
