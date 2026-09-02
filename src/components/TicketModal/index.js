import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { showError } from "../../utils/toast";

import styles from "./style";

const TicketModal = ({
  visible,
  onClose,
  trainerId,
  trainerName,
  onSubmit,
}) => {
  const [complaint, setComplaint] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  if (!complaint.trim()) {
    showError("Validation", "Please enter your complaint.");
    return;
  }

  try {
    setLoading(true);

    await onSubmit({
      trainer_id: trainerId,
      complaint,
    });

    setComplaint("");
  } finally {
    setLoading(false);
  }
};

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
              }}
              keyboardShouldPersistTaps="handled"
              automaticallyAdjustKeyboardInsets={true}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.modalContainer}>

                <Text style={styles.title}>Report Trainer</Text>

                <Text style={styles.subtitle}>
                  Send a complaint regarding{" "}
                  <Text style={{ fontWeight: "bold" }}>{trainerName}</Text>
                </Text>

                <Text style={styles.label}>Complaint</Text>

                <TextInput
                  style={styles.textArea}
                  placeholder="Describe your complaint..."
                  multiline
                  value={complaint}
                  onChangeText={setComplaint}
                />

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onClose}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.submitText}>Submit</Text>
                    )}
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

export default TicketModal;