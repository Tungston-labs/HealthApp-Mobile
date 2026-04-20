import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './style';

const PasswordField = ({
  label,
  placeholder,
  value,
  secure,
  onToggle,
  onChangeText,
}) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.inputBoxRow}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#C9C5C2"
        secureTextEntry={secure}
        style={styles.rowInputControl}
      />
      <TouchableOpacity style={styles.trailingIconButton} onPress={onToggle}>
        <Ionicons
          name={secure ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color="#B0AAA7"
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default function CreateAccountStepThree({
  form,
  onChangeField,
  onPickCertificates,
}) {
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const certificateText = form.images.length
    ? `${form.images.length} certificate${form.images.length > 1 ? 's' : ''} selected`
    : 'Click to upload or drag and drop';

  return (
    <View>
      <PasswordField
        label="Password"
        placeholder="Enter Password"
        value={form.password}
        secure={securePassword}
        onToggle={() => setSecurePassword(prev => !prev)}
        onChangeText={value => onChangeField('password', value)}
      />

      <PasswordField
        label="Confirm Password"
        placeholder="Enter Confirm Password"
        value={form.confirmPassword}
        secure={secureConfirmPassword}
        onToggle={() => setSecureConfirmPassword(prev => !prev)}
        onChangeText={value => onChangeField('confirmPassword', value)}
      />

      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => onChangeField('acceptTerms', !form.acceptTerms)}
        activeOpacity={0.8}
      >
        <View style={[styles.checkbox, form.acceptTerms && styles.checkboxChecked]}>
          {form.acceptTerms ? (
            <Ionicons name="checkmark" size={12} color="#FFFFFF" />
          ) : null}
        </View>
        <Text style={styles.termsText}>
          By continuing you accept our <Text style={styles.linkText}>Privacy Policy</Text>{' '}
          and <Text style={styles.linkText}>Term of Use</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.uploadWrapper}>
        <Text style={styles.uploadTitle}>Certifications (PDF or JPG)</Text>
        <TouchableOpacity style={styles.uploadDropZone} onPress={onPickCertificates}>
          <Ionicons name="cloud-upload-outline" size={34} color="#111111" />
          <Text style={styles.uploadDropText}>{certificateText}</Text>
        </TouchableOpacity>
        {form.images.length ? (
          <Text style={styles.helperSuccessText}>Tap the box again to add more files</Text>
        ) : null}
      </View>
    </View>
  );
}
