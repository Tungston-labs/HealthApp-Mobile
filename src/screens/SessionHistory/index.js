import React, { useEffect } from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderWithBack from "../../components/HeaderWithBack";
import HistoryCard from "../../components/Historycard";
import styles from "./styles";
import { fetchCompletedSessionsThunk } from "../../redux/slices/SessionHistorySlice";

const SessionHistory = () => {
  const dispatch = useDispatch();

  const { sessions, loading, error } = useSelector(
    (state) => state.completedSessions
  );

  useEffect(() => {
    dispatch(fetchCompletedSessionsThunk());
  }, []);

  return (
    <View style={styles.container}>
      <HeaderWithBack title="Session History" subtitle="Session Details" />

      {loading && <ActivityIndicator size="large" />}
      {error && <Text>{error}</Text>}

      {!loading && (
        <ScrollView
          contentContainerStyle={styles.cardWrapper}
          showsVerticalScrollIndicator={false}
        >
          {sessions?.length > 0 ? (
            sessions.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))
          ) : (
            <Text>No completed sessions found</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default SessionHistory;
