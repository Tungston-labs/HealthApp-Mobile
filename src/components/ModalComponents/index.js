import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
const CommonActionModal = ({
  visible,
  onClose,
  onConfirm,
  iconName,
  iconColor,
  title,
  description,
  cancelText,
  illustration,
  confirmText,

  showDropdown = false,
  showNote = false,
}) => {
  const [showDropdownList, setShowDropdownList] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [note, setNote] = useState("");

  const consultationTypes = ["Diet plan", "Weekly review", "Consultation call"];

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>

          {iconName && (
            <View style={[styles.iconCircle, { borderColor: iconColor }]}>
              <Icon name={iconName} size={28} color={iconColor} />
            </View>
          )}

          {illustration && (
            <Image
              source={illustration}
              style={{
                width: 180,
                height: 160,
                resizeMode: "contain",
              }}
            />
          )}


          <Text style={styles.title}>{title}</Text>

          <Text style={styles.desc}>{description}</Text>

          {showDropdown && (
            <>
              <Text style={styles.label}>Consultation type</Text>

              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowDropdownList(!showDropdownList)}
              >
                <Text style={styles.dropdownText}>
                  {selectedType || "Select type"}
                </Text>
                <Icon name="chevron-down" size={20} color="#777" />
              </TouchableOpacity>

              {showDropdownList && (
                <View style={styles.dropdownList}>
                  {consultationTypes.map((type, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => {
                        setSelectedType(type);
                        setShowDropdownList(false);
                      }}
                      style={styles.dropdownItem}
                    >
                      <Text style={styles.dropdownItemText}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          )}

          {showNote && (
            <>
              <Text style={styles.label}>Note</Text>

              <TextInput
                style={styles.noteBox}
                placeholder="Enter note"
                placeholderTextColor="#9C9C9C"
                multiline
                value={note}
                onChangeText={setNote}
              />
            </>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => onConfirm(selectedType, note)}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};


export default CommonActionModal;
