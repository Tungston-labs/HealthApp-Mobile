import React, { useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import SessionCard from "../../components/SessionCard";
import HeaderWithBack from "../../components/HeaderWithBack";
import HistoryCard from "../../components/Historycard";
import EmptyState from "../../components/EmptyState";
import styles from "./styles";

import { fetchCompletedSessionsThunk } from "../../redux/slices/SessionHistorySlice";
import { getTrainerHistory } from "../../redux/slices/trainerHistorySlice";

const SessionHistory = () => {
  const dispatch = useDispatch();

  const { loading, user } = useSelector(
    (state) => state.auth || {}
  );

  const {
    sessions = [],
    currentPage = 1,
    totalPages = 1,
  } = useSelector((state) => state.completedSessions || {});

  // backend session flag
  const hasPlan = user?.session;

  useEffect(() => {
    if (hasPlan) {
      dispatch(fetchCompletedSessionsThunk());
    }
  }, [hasPlan, dispatch]);

  // 🔹 NO PLAN
  if (!hasPlan) {
    return (
      <EmptyState
        image={require("../../../assets/emptystate.png")}
        title="No Session History"
        subtitle="Your completed sessions will appear here once you book a plan."
      />
    );
  }

  /* 🔹 LOAD MORE (pagination) */
  const loadMore = () => {
    if (!loading && currentPage < totalPages) {
      dispatch(getTrainerHistory(currentPage + 1));
    }
  };

  /* 🔹 RENDER EACH SESSION */
  const renderItem = ({ item }) => {
    console.log("🟢 RENDERING SESSION ID:", item.id);

    return (
      <SessionCard
        clientName={item.client?.name}
        address={item.client?.address}
        sessionDate={item.date}
        timeLabel={item.time_label}
        status={item.status}
        sessionCount={`${item.session_number}/${item.total_sessions}`}
        duration={item.section_timing?.label}
        profilePic={item.client?.profile_pic_url}
      />
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithBack
        title="Session History"
        subtitle="Session Details"
      />

      {loading && sessions.length === 0 ? (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.cardWrapper}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          ListEmptyComponent={
            <EmptyState
              image={require("../../../assets/emptystate.png")}
              title="No Completed Sessions"
              subtitle="You haven't completed any sessions yet."
            />
          }
          ListFooterComponent={
            loading ? (
              <ActivityIndicator style={{ marginVertical: 20 }} />
            ) : null
          }
        />
      )}
    </View>
  );
};

export default SessionHistory;
