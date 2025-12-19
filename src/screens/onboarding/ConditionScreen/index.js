import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { updateRegistration } from '../../../redux/slices/registrationSlice';
export default function ConditionScreen() {
  const dispatch = useDispatch();
  const CONDITION_OPTIONS = [
    { label: 'Other', value: 'other' },
    { label: 'Arthritis / Joint Stiffness', value: 'arthritis' }, // optional
    { label: 'Asthma / Breathing Difficulty', value: 'asthma' },
    { label: 'High Blood Pressure', value: 'bp' },
    { label: 'Diabetes', value: 'diabetes' },
    { label: 'Obesity / Overweight', value: 'obesity' }, // optional
  ];

  const selected = useSelector(state => state.registration.health_issues || []);

  const toggleCondition = value => {
    const updated = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value];

    dispatch(updateRegistration({ health_issues: updated }));
  };

  const renderItem = ({ item }) => {
    const isSelected = selected.includes(item.value);

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardActive]}
        onPress={() => toggleCondition(item.value)}
        activeOpacity={0.8}
      >
        <Text style={styles.label}>{item.label}</Text>

        <View style={styles.radioOuter}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CONDITION_OPTIONS}
        renderItem={renderItem}
        keyExtractor={item => item.value}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
