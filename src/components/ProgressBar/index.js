import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const TrainingProgressCard = ({ session }) => {
   const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - session.started_at) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [session.started_at]);

  const totalSeconds = Number(session.duration) * 60;
  const progress = Math.min(elapsed / totalSeconds, 1);

  const formatTime = s => {
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.dot} />
          <Text style={styles.title}>Training progress</Text>
        </View>

        <View style={styles.dayBadge}>
          <Text style={styles.dayText}>Active</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressActive, { flex: progress }]} />
        <View style={[styles.progressInactive, { flex: 1 - progress }]} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.startedText}>Started</Text>

        <View style={styles.timeRow}>
          <Icon name="time-outline" size={16} color="#B0B0B0" />
          <Text style={styles.timeText}>
            {formatTime(elapsed)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TrainingProgressCard;
