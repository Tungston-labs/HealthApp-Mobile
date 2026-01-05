import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const TrainingProgressCard = ({ session,onEndSession }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - session.started_at) / 1000);
      setElapsed(Math.max(diff, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [session.started_at]);

  const totalSeconds = Math.max(Number(session.duration) * 60, 1);
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
          <Text style={styles.title}>Training progress</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(Math.max(progress, 0), 1) * 100}%` },
          ]}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.endButton}
          onPress={onEndSession}
          activeOpacity={0.8}
        >
          <Text style={styles.endButtonText}>End Session</Text>
        </TouchableOpacity>

        <View style={styles.timeRow}>
          <Icon name="timer-outline" size={16} color="#fff" />
          <Text style={styles.timeText}>{formatTime(elapsed)}</Text>
        </View>
      </View>
    </View>
  );
};

export default TrainingProgressCard;
