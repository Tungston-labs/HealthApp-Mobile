import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateRegistration } from '../../redux/slices/registrationSlice';
import styles from './style';
import { getCurrentLocation } from '../../utils/location';
import { reverseGeocode } from '../../utils/reverseGeocode';

export default function SignupDetailsScreenUser() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const registration = useSelector(state => state.registration);

  const [showLocationFields, setShowLocationFields] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [location, setLocation] = useState('');
  const handleChange = field => value => {
    dispatch(updateRegistration({ [field]: value }));
  };

  const handleContinue = () => {
    const { name, email, phno, password } = registration;

    if (!name || !email || !phno || !password) {
      Alert.alert('Missing details', 'Please fill all required fields');
      return;
    }

    navigation.navigate('MainWizardScreen');
  };
  const handleUseLocation = async () => {
    try {
      const coords = await getCurrentLocation();
      const address = await reverseGeocode(coords.latitude, coords.longitude);

      setLocation(address);

      dispatch(
        updateRegistration({
          address: address,
        }),
      );

      Alert.alert('Success', '📍 Location fetched successfully');
      console.log(' Location:', address);
    } catch (err) {
      console.log(' Location error:', err);
      Alert.alert('Error', 'Unable to fetch location. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingBottom: 120,
        }}
      >
        <Text style={styles.welcomeText}>Welcome to health app</Text>
        <Text style={styles.subtitle}>Enter basic details</Text>

        {/* NAME */}
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={registration.name}
          onChangeText={handleChange('name')}
        />

        {/* EMAIL */}
        <View style={styles.inputRow}>
          <Ionicons name="mail-outline" size={18} color="#777" />
          <TextInput
            style={styles.inputField}
            placeholder="Enter Email"
            value={registration.email}
            keyboardType="email-address"
            onChangeText={handleChange('email')}
          />
        </View>

        {/* PHONE */}
        <View style={styles.inputRow}>
          <Ionicons name="call-outline" size={18} color="#777" />
          <TextInput
            style={styles.inputField}
            placeholder="Phone"
            value={registration.phno}
            keyboardType="phone-pad"
            onChangeText={handleChange('phno')}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputRow}>
          <Ionicons name="lock-closed-outline" size={18} color="#777" />
          <TextInput
            style={styles.inputField}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={registration.password}
            onChangeText={handleChange('password')}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        {/* LOCATION TOGGLE */}
        <View style={styles.locationRow}>
          <View style={styles.locationLeft}>
            <Ionicons name="location-outline" size={20} color="#777" />
            <TouchableOpacity onPress={handleUseLocation}>
            <Text style={styles.locationText}>Use my location</Text>

            </TouchableOpacity>
          </View>

          {showLocationFields && (
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => setShowLocationFields(false)}
            >
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* LOCATION FIELDS */}
        {showLocationFields && (
          <>
            <View style={styles.locationInputsRow}>
              <TextInput
                style={[styles.input, styles.smallInput]}
                placeholder="Pincode"
                keyboardType="numeric"
                onChangeText={handleChange('pincode')}
              />

              <TextInput
                style={[styles.input, styles.smallInput]}
                placeholder="City/Town"
                onChangeText={handleChange('city')}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Landmark"
              onChangeText={handleChange('landmark')}
            />

            <TextInput
              style={styles.input}
              placeholder="Address"
              value={registration.address}
              onChangeText={handleChange('address')}
            />
          </>
        )}

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backLogin}>Back to Log in</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* CONTINUE */}
      <View style={styles.continueFixed}>
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#fff"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
