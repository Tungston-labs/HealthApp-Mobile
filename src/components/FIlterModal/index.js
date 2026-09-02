import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { showError } from '../../utils/toast';
import styles from './styles';
import CalendarPicker from './CalendarPicker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableTrainersThunk } from '../../redux/slices/trainerPlanSlice';
import { normalizeSlotDays, normalizeTime24 } from '../../services/trainerServices';
import { getCurrentLocation, checkLocationPermission, requestLocationPermission } from '../../utils/location';

import LocationDisclosureModal from '../LocationDisclosureModal';

const getTodayDate = () => {
  const today = new Date();

  return `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(
    today.getDate()
  ).padStart(2, "0")}`;
};

const normalizeCoordinates = (...sources) => {
  for (const source of sources) {
    const rawLatitude = source?.latitude;
    const rawLongitude = source?.longitude;

    if (
      rawLatitude === null ||
      rawLatitude === undefined ||
      rawLatitude === '' ||
      rawLongitude === null ||
      rawLongitude === undefined ||
      rawLongitude === ''
    ) {
      continue;
    }

    const latitude = Number(rawLatitude);
    const longitude = Number(rawLongitude);

    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      return {
        latitude: Number(latitude.toFixed(6)),
        longitude: Number(longitude.toFixed(6)),
      };
    }
  }

  return null;
};

const FilterModal = ({ visible, onClose, planId, selectedPlanSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState('Mon,Tue,Wed,Thu,Fri,Sat');
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [resolvingLocation, setResolvingLocation] = useState(false);
  const [attemptedLocationLookup, setAttemptedLocationLookup] = useState(false);
  const [showDisclosureModal, setShowDisclosureModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector(state => state.trainer.loading);
  const user = useSelector(state => state.auth.user);
  const profile = useSelector(state => state.mobProfile.profile);

  const storedLocation = useMemo(
    () =>
      normalizeCoordinates(
        profile,
        user,
        user?.client,
        user?.profile,
      ),
    [profile, user],
  );

  const fetchDeviceLocation = useCallback(async () => {
    try {
      setResolvingLocation(true);
      const coords = await getCurrentLocation();
      const location = normalizeCoordinates(coords);

      if (!location) {
        throw new Error('Invalid location coordinates');
      }

      setCurrentLocation(location);
      return location;
    } catch (err) {
      console.log('Unable to resolve trainer search location:', err);
      return null;
    } finally {
      setResolvingLocation(false);
    }
  }, []);

  const triggerLocationWithDisclosure = useCallback(async (action) => {
    const hasPermission = await checkLocationPermission();
    if (hasPermission) {
      return action();
    }
    setPendingAction(() => action);
    setShowDisclosureModal(true);
  }, []);

  const handleAcceptDisclosure = async () => {
    setShowDisclosureModal(false);
    const granted = await requestLocationPermission();
    if (granted && pendingAction) {
      pendingAction();
    }
    setPendingAction(null);
  };

  const handleCancelDisclosure = () => {
    setShowDisclosureModal(false);
    setPendingAction(null);
  };

  const resolveSearchLocation = useCallback(async ({ showAlert = false } = {}) => {
    if (currentLocation) {
      return currentLocation;
    }

    const hasPermission = await checkLocationPermission();
    if (hasPermission) {
      const liveLocation = await fetchDeviceLocation();
      if (liveLocation) {
        return liveLocation;
      }
    }

    if (storedLocation) {
      return storedLocation;
    }

    if (showAlert) {
      showError(
        'Location Required',
        'Please allow location access so we can find available trainers near you.'
      );
    }

    return null;
  }, [currentLocation, fetchDeviceLocation, storedLocation]);

  const refreshDeviceLocation = useCallback(async () => {
    const hasPermission = await checkLocationPermission();
    if (!hasPermission) {
      if (storedLocation) return storedLocation;
      return null;
    }
    const liveLocation = await fetchDeviceLocation();

    if (!liveLocation && storedLocation) {
      return storedLocation;
    }

    return liveLocation;
  }, [fetchDeviceLocation, storedLocation]);

useEffect(() => {
  if (!visible) return;

  setSelectedDate(getTodayDate());
  setCurrentLocation(null);
  setAttemptedLocationLookup(false);

  if (selectedPlanSlot === "3_days") {
    setSelectedSlot("Mon,Wed,Fri");
  } else {
    setSelectedSlot("Mon,Tue,Wed,Thu,Fri,Sat");
  }
}, [visible, selectedPlanSlot]);

useEffect(() => {
  if (
    !visible ||
    currentLocation ||
    resolvingLocation ||
    attemptedLocationLookup
  ) {
    return;
  }

  setAttemptedLocationLookup(true);
  refreshDeviceLocation();
}, [
  visible,
  currentLocation,
  resolvingLocation,
  attemptedLocationLookup,
  refreshDeviceLocation,
]);


useEffect(() => {
  console.log("TODAY:", getTodayDate());
  console.log("SELECTED DATE:", selectedDate);
}, [visible, selectedDate]);
  const convertTo24Hour = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  const handleApply = async () => {
    if (loading || resolvingLocation) return;

    const location = await resolveSearchLocation({ showAlert: true });

    console.log("Trainer Search Location:", location);

    if (!location) {
      return;
    }

    try {
      const payload = {
        plan_id: planId,
        slot_days: normalizeSlotDays(selectedSlot),
        time: normalizeTime24(selectedTime),
        start_date: selectedDate,
        latitude: location.latitude,
        longitude: location.longitude,
      };


      console.log('🔥 FINAL PAYLOAD:', payload);

      await dispatch(fetchAvailableTrainersThunk(payload)).unwrap();

      // Close modal and indicate success so parent can react
      onClose(true);

      navigation.navigate('TrainerList', {
        isFiltered: true,
        mode: 'book',
        planId,
      });

    } catch (err) {
      console.log('Fetch available trainers error:', err);

      const message =
        typeof err === 'string'
          ? err
          : err?.message || (err && JSON.stringify(err)) || 'Failed to fetch trainers';

      showError('Unable to load trainers', message);
    }
  };

  const timeSlots = [
    '09:00 AM',
    '09:45 AM',
    '10:45 AM',
    '11:45 AM',
    '12:45 PM',
    '02:45 PM',
    '03:45 PM',
    '04:45 PM',
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>
              Please select date
            </Text>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
         
<CalendarPicker
  key={selectedDate}
  selectedDate={selectedDate}
  onSelect={setSelectedDate}
/>
          <View style={styles.inputUnderline} />

          <Text style={styles.sectionTitle}>Select Slot</Text>

          <View style={styles.slotRow}>
            {['Mon,Wed,Fri', 'Tue,Thu,Sat'].map(slot => (
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

          <View style={styles.inputUnderline} />

          {/* Time Selector */}
          <Text style={styles.sectionTitle}>Select Time Slot</Text>
          <View style={styles.timeSlotGrid}>
            {timeSlots.map(t => (
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

          <View style={styles.applyWrapper}>
            <TouchableOpacity
              style={[styles.applyBtn, (loading || resolvingLocation) && { opacity: 0.5 }]}
              disabled={loading || resolvingLocation}
              onPress={handleApply}
            >
              <Text style={styles.applyText}>
                {loading || resolvingLocation ? 'Loading...' : 'View Available Trainers →'}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
      <LocationDisclosureModal
        visible={showDisclosureModal}
        onAccept={handleAcceptDisclosure}
        onCancel={handleCancelDisclosure}
      />
    </Modal>
  );
};


export default FilterModal;
