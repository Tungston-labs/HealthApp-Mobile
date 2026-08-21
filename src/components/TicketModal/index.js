import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
      <View style={styles.overlay}>
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
      </View>
    </Modal>
  );
};

export default TicketModal;