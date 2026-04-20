import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './style';

const EXPERIENCE_OPTIONS = Array.from({ length: 26 }, (_, index) => String(index));
const SESSION_TIMING_OPTIONS = ['15', '20', '30', '45', '60'];

const SelectField = ({
  label,
  value,
  placeholder,
  options,
  isOpen,
  onToggle,
  onSelect,
}) => (
  <View style={[styles.fieldGroup, isOpen && styles.fieldGroupRaised]}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TouchableOpacity style={styles.selectBox} onPress={onToggle}>
      <Text style={[styles.selectText, value && styles.selectTextActive]}>
        {value || placeholder}
      </Text>
      <Ionicons
        name={isOpen ? 'chevron-up' : 'chevron-down'}
        size={18}
        color="#7A72FF"
      />
    </TouchableOpacity>

    {isOpen ? (
      <View style={styles.dropdownList}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={styles.dropdownItem}
            onPress={() => onSelect(option)}
          >
            <Text style={styles.dropdownItemText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ) : null}
  </View>
);

export default function CreateAccountStepTwo({ form, onChangeField, onUseLocation }) {
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isSessionTimingOpen, setIsSessionTimingOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.locationButton} onPress={onUseLocation}>
        <Text style={styles.locationButtonText}>Use My Location</Text>
      </TouchableOpacity>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Enter Pincode</Text>
        <View style={styles.inputBox}>
          <TextInput
            value={form.pincode}
            onChangeText={value => onChangeField('pincode', value)}
            placeholder="Enter Pincode"
            placeholderTextColor="#C9C5C2"
            keyboardType="number-pad"
            style={styles.inputControl}
            maxLength={6}
          />
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>City/Town</Text>
        <View style={styles.inputBox}>
          <TextInput
            value={form.city}
            onChangeText={value => onChangeField('city', value)}
            placeholder="City/Town"
            placeholderTextColor="#C9C5C2"
            style={styles.inputControl}
          />
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Landmark</Text>
        <View style={styles.inputBox}>
          <TextInput
            value={form.landmark}
            onChangeText={value => onChangeField('landmark', value)}
            placeholder="Landmark"
            placeholderTextColor="#C9C5C2"
            style={styles.inputControl}
          />
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Address</Text>
        <View style={[styles.inputBox, styles.multilineBox]}>
          <TextInput
            value={form.address}
            onChangeText={value => onChangeField('address', value)}
            placeholder="Address"
            placeholderTextColor="#C9C5C2"
            multiline
            textAlignVertical="top"
            style={[styles.inputControl, styles.multilineInputControl]}
          />
        </View>
      </View>

      <SelectField
        label="Years of Experience"
        value={form.experience}
        placeholder="Select Years Of Experience"
        options={EXPERIENCE_OPTIONS}
        isOpen={isExperienceOpen}
        onToggle={() => {
          setIsSessionTimingOpen(false);
          setIsExperienceOpen(prev => !prev);
        }}
        onSelect={value => {
          onChangeField('experience', value);
          setIsExperienceOpen(false);
        }}
      />

      <SelectField
        label="Session Duration"
        value={form.sectionTiming ? `${form.sectionTiming} min` : ''}
        placeholder="Select Session Duration"
        options={SESSION_TIMING_OPTIONS.map(option => `${option} min`)}
        isOpen={isSessionTimingOpen}
        onToggle={() => {
          setIsExperienceOpen(false);
          setIsSessionTimingOpen(prev => !prev);
        }}
        onSelect={value => {
          onChangeField('sectionTiming', value.replace(' min', ''));
          setIsSessionTimingOpen(false);
        }}
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Session Price</Text>
        <View style={styles.inputBox}>
          <TextInput
            value={form.fee}
            onChangeText={value => onChangeField('fee', value)}
            placeholder="Enter Session Price"
            placeholderTextColor="#C9C5C2"
            keyboardType="number-pad"
            style={styles.inputControl}
          />
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Number Of Session</Text>
        <View style={styles.inputBox}>
          <TextInput
            value={form.sessions}
            onChangeText={value => onChangeField('sessions', value)}
            placeholder="Enter Number Of Session"
            placeholderTextColor="#C9C5C2"
            keyboardType="number-pad"
            style={styles.inputControl}
          />
        </View>
      </View>
    </View>
  );
}
