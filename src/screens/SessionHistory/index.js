import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import SessionCard from "../../components/SessionCard";
import HeaderWithBack from "../../components/HeaderWithBack";
import {
  getTrainerHistory,
  resetTrainerHistory,
} from "../../redux/slices/trainerHistorySlice";
import style from "./styles";

const SessionHistory = () => {
  const dispatch = useDispatch();

  const {
    sessions,
    loading,
    currentPage,
    totalPages,
  } = useSelector(state => state.trainerHistory);
  useEffect(() => {
  console.log("📦 REDUX SESSIONS:", sessions);
}, [sessions]);

  /* 🔹 FIRST LOAD */
  useEffect(() => {
    dispatch(resetTrainerHistory());
    dispatch(getTrainerHistory(1));
  }, []);

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
    <View style={style.container}>
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
          contentContainerStyle={style.cardWrapper}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            loading ? <ActivityIndicator style={{ margin: 20 }} /> : null
          }
          ListEmptyComponent={
            !loading && (
              <Text style={{ textAlign: "center", marginTop: 40 }}>
                No session history found
              </Text>
            )
          }
        />

      )}
    </View>
  );
};

export default SessionHistory;
