import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const FilterModal = ({ visible, onClose }) => {

  const [selectedSlot, setSelectedSlot] = useState("Mon,Wed,Fri");
  const [selectedTime, setSelectedTime] = useState("09:45 AM");
  const [selectedDay, setSelectedDay] = useState("11");
  const [selectedMonth, setSelectedMonth] = useState("December");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [openSlot, setOpenSlot] = useState(true);
  const [openTime, setOpenTime] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const timeSlots = [
    "09:45 AM",
    "10:45 AM",
    "12:45 PM",
    "02:45 PM",
    "11:45 AM",
    "03:45 PM",
    "04:45 PM",
  ];

  const days = ["09", "10", "11", "12", "13"];
  const months = ["October", "November", "December", "January", "February"];
  const years = ["1999", "2000", "2025", "2002", "2003"];

  return (
    <Modal visible={visible} transparent animationType="slide">

      <Pressable style={styles.overlay} onPress={onClose}>

        <Pressable style={styles.container} onPress={() => {}}>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rowHeader}
            onPress={() => setOpenSlot(!openSlot)}
          >
            <Text style={styles.sectionTitle}>Select slot</Text>
            <Ionicons
              name={openSlot ? "chevron-up-outline" : "chevron-down-outline"}
              size={20}
            />
          </TouchableOpacity>

          {openSlot && (
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
          )}

          <TouchableOpacity
            style={styles.rowHeader}
            onPress={() => setOpenTime(!openTime)}
          >
            <Text style={styles.sectionTitle}>Select Time slot</Text>
            <Ionicons
              name={openTime ? "chevron-up-outline" : "chevron-down-outline"}
              size={20}
            />
          </TouchableOpacity>

          {openTime && (
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
          )}

          <TouchableOpacity
            style={styles.rowHeader}
            onPress={() => setOpenDate(!openDate)}
          >
            <Text style={styles.sectionTitle}>Select Date slot</Text>
            <Ionicons
              name={openDate ? "chevron-up-outline" : "chevron-down-outline"}
              size={20}
            />
          </TouchableOpacity>

          {openDate && (
            <View style={styles.dateBox}>

              <View style={styles.dateColumn}>
                {days.map((d) => (
                  <TouchableOpacity key={d} onPress={() => setSelectedDay(d)}>
                    <Text
                      style={
                        selectedDay === d
                          ? styles.dateItemBold
                          : styles.dateItem
                      }
                    >
                      {d}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.dateColumn}>
                {months.map((m) => (
                  <TouchableOpacity key={m} onPress={() => setSelectedMonth(m)}>
                    <Text
                      style={
                        selectedMonth === m
                          ? styles.dateItemBold
                          : styles.dateItem
                      }
                    >
                      {m}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.dateColumn}>
                {years.map((y) => (
                  <TouchableOpacity key={y} onPress={() => setSelectedYear(y)}>
                    <Text
                      style={
                        selectedYear === y
                          ? styles.dateItemBold
                          : styles.dateItem
                      }
                    >
                      {y}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

            </View>
          )}

          <TouchableOpacity style={styles.applyBtn}>
            <Text style={styles.applyText}>Apply filter →</Text>
          </TouchableOpacity>

        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FilterModal;
