import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const LocationDisclosureModal = ({ visible, onAccept, onCancel }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Top Header Banner */}
          <View style={styles.header}>
            <Ionicons name="location-sharp" size={22} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Location Access Required</Text>
          </View>

          {/* Body Content */}
          <View style={styles.content}>
            <View style={styles.iconWrapper}>
              <Ionicons name="map-outline" size={32} color="#F40404" />
            </View>

            <Text style={styles.title}>Prominent Location Disclosure</Text>

            <Text style={styles.description}>
              Fitsapio collects location data to enable finding nearby fitness trainers & gyms, autofilling your workout session address, and calculating distance for bookings.
            </Text>

            <View style={styles.bulletBox}>
              <Text style={styles.bulletText}>
                📍 Location is accessed ONLY while using the app (in foreground). We do NOT collect your location in the background.
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.7}>
                <Text style={styles.cancelText}>Not Now</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.acceptBtn} onPress={onAccept} activeOpacity={0.8}>
                <Text style={styles.acceptText}>Agree & Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationDisclosureModal;
