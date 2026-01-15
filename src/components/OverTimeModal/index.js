import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const OverTimeModal = ({ onClose }) => {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Overtime</Text>
        <Text style={styles.modalText}>
          You are now in overtime. The session will continue until you end it
          manually.
        </Text>

        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OverTimeModal;
