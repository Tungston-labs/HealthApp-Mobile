import React, { useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import HeaderWithBack from "../../components/HeaderWithBack";
import HistoryCard from "../../components/Historycard";
import EmptyState from "../../components/EmptyState";
import styles from "./styles";

import { fetchCompletedSessionsThunk } from "../../redux/slices/SessionHistorySlice";

const SessionHistory = ({ navigation }) => {
  const dispatch = useDispatch();

  /* 🔹 AUTH */
  const { loading: authLoading, user, error: authError } = useSelector(
    (state) => state.auth || {}
  );

  /* 🔹 SESSION STATE */
  const {
    sessions = [],
    loading,
    error,
  } = useSelector((state) => state.completedSessions || {});

  const hasPlan = user?.session;

  /* 🔹 INITIAL FETCH */
  useEffect(() => {
    if (hasPlan) {
      dispatch(fetchCompletedSessionsThunk());
    }
  }, [hasPlan, dispatch]);

  /* 🔹 SAFETY */
  const safeSessions = Array.isArray(sessions) ? sessions : [];

  /* 🔹 NO PLAN */
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
      <HeaderWithBack
        title="Session History"
        subtitle="Session Details"
        onBackPress={() => navigation?.goBack()}
      />

      {/* 🔹 INITIAL LOADING */}
      {loading && safeSessions.length === 0 ? (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} />
      ) : error ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          {typeof error === "string" ? error : error?.detail}
        </Text>
      ) : (
        <FlatList
          data={safeSessions}
          keyExtractor={(item, index) =>
            item?.session_id ? String(item.session_id) : String(index)
          }
          renderItem={({ item }) => <HistoryCard item={item} />}
          contentContainerStyle={styles.cardWrapper}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              image={require("../../../assets/emptystate.png")}
              title="No Completed Sessions"
              subtitle="You haven't completed any sessions yet."
            />
          }
        />
      )}
    </View>
  );
};

export default SessionHistory;
