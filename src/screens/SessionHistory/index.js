import React, { useEffect } from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderWithBack from "../../components/HeaderWithBack";
import HistoryCard from "../../components/Historycard";
import styles from "./styles";
import { fetchCompletedSessionsThunk } from "../../redux/slices/SessionHistorySlice";
import EmptyState from "../../components/EmptyState";

const SessionHistory = () => {
  const dispatch = useDispatch();

  const { loading, isLoggedIn, user, error } = useSelector(
    (state) => state.auth || {
      loading: false,
      isLoggedIn: false,
      error: null,
      user: null,
    }
  );

  const { sessions } = useSelector((state) => state.completedSessions);

  const hasPlan = user?.session;

  useEffect(() => {
    if (hasPlan) {
      dispatch(fetchCompletedSessionsThunk());
    }
  }, [hasPlan, dispatch]);

  if (!hasPlan) {
    return (
      <EmptyState
        image={require("../../../assets/emptystate.png")}
        title="No Session History"
        subtitle="Your completed sessions will appear here once you book a plan."
      />
    );
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack title="Session History" subtitle="Session Details" />

      {loading && <ActivityIndicator size="large" />}

      {error && <Text>{error}</Text>}

      {!loading && !error && (
        <ScrollView
          contentContainerStyle={styles.cardWrapper}
          showsVerticalScrollIndicator={false}
        >
          {sessions?.length > 0 ? (
            sessions.map((item) => (
              <HistoryCard key={item.session_id} item={item} />
            ))
          ) : (
            <EmptyState
              image={require("../../../assets/emptystate.png")}
              title="No Completed Sessions"
              subtitle="You haven't completed any sessions yet."
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default SessionHistory;
