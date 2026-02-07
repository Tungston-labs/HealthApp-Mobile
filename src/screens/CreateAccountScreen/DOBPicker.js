import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";

const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split("T")[0]; 
};

const DOBPicker = ({ value, onChange }) => {
  const [show, setShow] = useState(false);

  const handleChange = (event, selectedDate) => {
    if (Platform.OS === "android") setShow(false);

    if (selectedDate) {
      onChange(formatDate(selectedDate));
    }
  };

  return (
    <View>
      {/* INPUT ROW */}
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Ionicons name="calendar-outline" size={20} color="#666" />
        <Text style={{ marginLeft: 10, color: value ? "#000" : "#888" }}>
          {value || "Date of Birth"}
        </Text>
      </TouchableOpacity>

      {/* DATE PICKER */}
      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          maximumDate={new Date()}
          onChange={handleChange}
          {...(Platform.OS === "ios" && {
            themeVariant: "light", 
            textColor: "#000",    
          })}
        />
      )}
    </View>
  );
};

export default DOBPicker;
