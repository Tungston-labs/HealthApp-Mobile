import React, { useState } from 'react';
import {
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './style';

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
const FITNESS_OPTIONS = ['Cycling', 'Gym', 'Zumba', 'Swimming', 'Boxing'];

const formatDisplayDate = value => {
  if (!value) {
    return 'dd-mm-yyyy';
  }

  const [year, month, day] = value.split('-');
  if (!year || !month || !day) {
    return value;
  }

  return `${day}-${month}-${year}`;
};

const formatStorageDate = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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

export default function CreateAccountStepOne({
  form,
  onBack,
  onChangeField,
  onPickProfileImage,
  onPickAadhaarImage,
}) {
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isFitnessOpen, setIsFitnessOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (_, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      onChangeField('dob', formatStorageDate(selectedDate));
    }
  };

  return (
    <View>
      <View style={styles.heroHeader}>
        <TouchableOpacity style={styles.backIconButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={28} color="#161616" />
        </TouchableOpacity>
        <Text style={styles.heroTitle}>Sign up !</Text>
      </View>

      <Text style={styles.heroSubtitle}>Create account by filling the form below .</Text>

      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.profileButton} onPress={onPickProfileImage}>
          {form.profileImage?.uri ? (
            <Image source={{ uri: form.profileImage.uri }} style={styles.profileImage} />
          ) : (
            <Ionicons name="camera-outline" size={28} color="#7A72FF" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Enter Name</Text>
        <View style={styles.inputBox}>
          <TextInput
            value={form.name}
            onChangeText={value => onChangeField('name', value)}
            placeholder="Enter Full Name"
            placeholderTextColor="#C9C5C2"
            style={styles.inputControl}
          />
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Enter Email</Text>
        <View style={styles.inputBox}>
          <TextInput
            value={form.email}
            onChangeText={value => onChangeField('email', value)}
            placeholder="Enter Email"
            placeholderTextColor="#C9C5C2"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputControl}
          />
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Phone Number</Text>
        <View style={styles.inputBox}>
          <TextInput
            value={form.phno}
            onChangeText={value => onChangeField('phno', value)}
            placeholder="Enter  Phone Number"
            placeholderTextColor="#C9C5C2"
            keyboardType="number-pad"
            style={styles.inputControl}
            maxLength={10}
          />
        </View>
      </View>

      <SelectField
        label="Gender"
        value={form.genderValue}
        placeholder="Select Gender"
        options={GENDER_OPTIONS}
        isOpen={isGenderOpen}
        onToggle={() => {
          setIsFitnessOpen(false);
          setIsGenderOpen(prev => !prev);
        }}
        onSelect={value => {
          onChangeField('genderValue', value);
          setIsGenderOpen(false);
        }}
      />

      <SelectField
        label="Specialized Fitness Area"
        value={form.expertiseValue}
        placeholder="Select Specialized Fitness Area"
        options={FITNESS_OPTIONS}
        isOpen={isFitnessOpen}
        onToggle={() => {
          setIsGenderOpen(false);
          setIsFitnessOpen(prev => !prev);
        }}
        onSelect={value => {
          onChangeField('expertiseValue', value);
          setIsFitnessOpen(false);
        }}
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Date Of Birth</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => setShowDatePicker(true)}>
          <Text style={[styles.inputDisplayText, form.dob && styles.inputDisplayTextActive]}>
            {formatDisplayDate(form.dob)}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Aadhaar Number</Text>
        <View style={styles.inputBoxRow}>
          <TextInput
            value={form.aadhaar}
            onChangeText={value => onChangeField('aadhaar', value)}
            placeholder="Enter Aadhaar Number"
            placeholderTextColor="#C9C5C2"
            keyboardType="number-pad"
            style={styles.rowInputControl}
            maxLength={12}
          />
          <TouchableOpacity style={styles.trailingIconButton} onPress={onPickAadhaarImage}>
            <Ionicons
              name="cloud-upload-outline"
              size={20}
              color={form.aadhaarImage?.uri ? '#7A72FF' : '#BDB6B2'}
            />
          </TouchableOpacity>
        </View>
        {form.aadhaarImage?.uri ? (
          <Text style={styles.helperSuccessText}>Aadhaar image added</Text>
        ) : null}
      </View>

      {showDatePicker ? (
        <DateTimePicker
          value={form.dob ? new Date(form.dob) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onChange={handleDateChange}
        />
      ) : null}
    </View>
  );
}
