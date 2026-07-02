import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const consultationTypes = [
  { label: "PDF / Brochure", value: "pdf" },
  { label: "Call Session", value: "call" },
  { label: "Email Consultation", value: "email" },
];

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
  selectedValue,
  onSelectValue,
  noteValue,
  onChangeNote,
}) => {
  const [showDropdownList, setShowDropdownList] = useState(false);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setShowDropdownList(false);
          }}
        >
          <View style={styles.overlay}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.card}>
                {iconName && (
                  <View
                    style={[
                      styles.iconCircle,
                      { borderColor: iconColor },
                    ]}
                  >
                    <Icon
                      name={iconName}
                      size={28}
                      color={iconColor}
                    />
                  </View>
                )}

                {illustration && (
                  <Image
                    source={illustration}
                    style={{
                      width: 180,
                      height: 160,
                      resizeMode: "contain",
                      alignSelf: "center",
                      marginBottom: 15,
                    }}
                  />
                )}

                <Text style={styles.title}>{title}</Text>

                <Text style={styles.desc}>{description}</Text>

                {showDropdown && (
                  <>
                    <Text style={styles.label}>
                      Consultation type
                    </Text>

                    <TouchableOpacity
                      style={styles.dropdown}
                      activeOpacity={0.8}
                      onPress={() =>
                        setShowDropdownList(!showDropdownList)
                      }
                    >
                      <Text style={styles.dropdownText}>
                        {consultationTypes.find(
                          (t) => t.value === selectedValue
                        )?.label || "Select type"}
                      </Text>

                      <Icon
                        name={
                          showDropdownList
                            ? "chevron-up"
                            : "chevron-down"
                        }
                        size={20}
                        color="#777"
                      />
                    </TouchableOpacity>

                    {showDropdownList && (
                      <View style={styles.dropdownList}>
                        {consultationTypes.map((type) => (
                          <TouchableOpacity
                            key={type.value}
                            style={styles.dropdownItem}
                            onPress={() => {
                              onSelectValue(type.value);
                              setShowDropdownList(false);
                            }}
                          >
                            <Text
                              style={styles.dropdownItemText}
                            >
                              {type.label}
                            </Text>
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
                      textAlignVertical="top"
                      value={noteValue}
                      onChangeText={onChangeNote}
                      returnKeyType="done"
                      blurOnSubmit
                    />
                  </>
                )}

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => {
                      Keyboard.dismiss();
                      onClose();
                    }}
                  >
                    <Text style={styles.cancelText}>
                      {cancelText}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => {
                      Keyboard.dismiss();
                      onConfirm?.();
                    }}
                  >
                    <Text style={styles.confirmText}>
                      {confirmText}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CommonActionModal;