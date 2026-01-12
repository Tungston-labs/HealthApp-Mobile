import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import SessionCard from "../../components/SessionCard";
import HeaderWithBack from "../../components/HeaderWithBack";
import HistoryCard from "../../components/Historycard";
import styles from "./styles";
import { fetchCompletedSessionsThunk } from "../../redux/slices/SessionHistorySlice";
import EmptyState from "../../components/EmptyState";
import { getTrainerHistory } from "../../redux/slices/trainerHistorySlice";

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

  // Get completed sessions from your redux slice
  const { sessions } = useSelector((state) => state.completedSessions);

  // Use the session boolean from backend
  const hasPlan = user?.session;

  useEffect(() => {
    if (hasPlan) {
      dispatch(fetchCompletedSessionsThunk());
    }
  }, [hasPlan, dispatch]);

  // If user has no plan/session, show outer empty state
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
    console.log("djshfjsnfjksfk");
    
    if (!loading && currentPage < totalPages) {
      console.log("gfjhsgfhjsfhjs");
      
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
