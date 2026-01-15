import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import OverTimeModal from '../OverTimeModal';

const TrainingProgressCard = ({
  session,
  onEndSession,
  isEndingSession,
  overtimeShownSessionId,
  setOvertimeShownSessionId,
}) => {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);
  const [showOvertimeModal, setShowOvertimeModal] = useState(false);

  const safeStartedAt = session?.started_at
    ? Math.min(Number(session.started_at), Date.now())
    : null;

  useEffect(() => {
    if (!safeStartedAt) {
      setElapsed(0);
      return;
    }

    const updateElapsed = () => {
      const diff = Math.floor((Date.now() - safeStartedAt) / 1000);
      setElapsed(Math.max(diff, 0));
    };

    updateElapsed();
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(updateElapsed, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [safeStartedAt, session?.session_id]);

  useEffect(() => {
    if (isEndingSession) return;

    const durationMinutes = Number(session?.duration ?? 0);
    if (!durationMinutes || !session?.session_id) return;

    const durationSeconds = durationMinutes * 60;

    const alreadyShown = overtimeShownSessionId === session.session_id;

    if (elapsed >= durationSeconds && !alreadyShown) {
      setOvertimeShownSessionId(session.session_id);
      setShowOvertimeModal(true);
    }
  }, [elapsed, session?.duration, session?.session_id, isEndingSession]);

  const durationValue = Number(session?.duration ?? 0);
  const totalSeconds =
    durationValue > 0 ? durationValue * 60 : Math.max(elapsed + 1, 1);

  const progress = Math.min(Math.max(elapsed / totalSeconds, 0), 1);

  const formatTime = s => {
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const onCloseOvertimeModal = () => {
    setShowOvertimeModal(false);
  };
  return (
    <>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Training progress</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.endButton}
            onPress={onEndSession}
            activeOpacity={0.8}
            disabled={isEndingSession}
          >
            {isEndingSession ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.endButtonText}>End Session</Text>
            )}
          </TouchableOpacity>

          <View style={styles.timeRow}>
            <Icon name="timer-outline" size={16} color="#fff" />
            <Text style={styles.timeText}>{formatTime(elapsed)}</Text>
          </View>
        </View>
      </View>
      {showOvertimeModal && <OverTimeModal onClose={onCloseOvertimeModal} />}
    </>
  );
};

export default TrainingProgressCard;
