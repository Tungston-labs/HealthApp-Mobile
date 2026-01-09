import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ScheduleCard = ({
  time,
  name,
  image,
  weight,
  height,
  onPress,
  onStart,
  loading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress?.()}
      style={styles.wrapper}
    >
      <View style={styles.timelineDot} />
      <View style={styles.card}>
        <Text style={styles.time}>{time}</Text>

        <Image source={{uri:image}} style={styles.avatar} />

        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Icon name="weight-lifter" size={16} color="#666" />
              <Text style={styles.metaText}>{weight} KG</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="human-male-height" size={16} color="#666" />
              <Text style={styles.metaText}>{height}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => onStart?.()}
            disabled={disabled || loading}
            style={[
              styles.startBtn,
              (disabled || loading) && styles.startBtnDisabled,
            ]}
          >
            {loading ? (
              <Text style={styles.startText}>Starting...</Text>
            ) : (
              <>
                <Text style={styles.startText}>Start</Text>
                <Icon name="play" size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleCard;
