import React, { useState, useMemo } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CalendarModal = ({ visible, onClose, onConfirm }) => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = useMemo(() => {
    const days = [];

    // empty slots before month start
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [currentMonth, currentYear]);

  const changeMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((y) => y - 1);
      } else {
        setCurrentMonth((m) => m - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((y) => y + 1);
      } else {
        setCurrentMonth((m) => m + 1);
      }
    }
  };

  const isSelected = (day) =>
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === currentMonth &&
    selectedDate.getFullYear() === currentYear;

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>

          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => changeMonth("prev")}>
              <Icon name="chevron-back" size={22} color="#7B77FF" />
            </TouchableOpacity>

            <Text style={styles.month}>
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </Text>

            <TouchableOpacity onPress={() => changeMonth("next")}>
              <Icon name="chevron-forward" size={22} color="#7B77FF" />
            </TouchableOpacity>
          </View>

          {/* WEEK DAYS */}
          <View style={styles.weekRow}>
            {WEEK_DAYS.map((day) => (
              <Text key={day} style={styles.weekText}>
                {day}
              </Text>
            ))}
          </View>

          {/* DAYS GRID */}
          <View style={styles.daysGrid}>
            {calendarDays.map((day, index) => {
              if (!day) {
                return <View key={index} style={styles.dayCell} />;
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayCell,
                    isSelected(day) && styles.selectedDay,
                  ]}
                  onPress={() =>
                    setSelectedDate(
                      new Date(currentYear, currentMonth, day)
                    )
                  }
                >
                  <Text
                    style={[
                      styles.dayText,
                      isSelected(day) && styles.selectedDayText,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ACTIONS */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.setDate}
              onPress={() => {
                onConfirm?.(selectedDate);
                onClose();
              }}
            >
              <Text style={styles.setDateText}>Set date</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;
