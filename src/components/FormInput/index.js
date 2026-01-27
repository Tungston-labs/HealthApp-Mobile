
import React from 'react';
import { View, TextInput } from 'react-native';
import { editProfileStyles, COLORS } from '../ProfileHeader/styles';

const FormInput = ({ placeholder, value, onChangeText, keyboardType, style = {} }) => {
  return (
    <View style={[editProfileStyles.formGroup, style]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
          paddingVertical: 10,
          fontSize: 16,
          color: COLORS.primary,
        }}
        placeholderTextColor={COLORS.border}
      />
    </View>
  );
};

export default FormInput;