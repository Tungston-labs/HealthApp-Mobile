import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style";
import SessionCard from "../../components/SessionCard";
import HeaderWithBack from "../../components/HeaderWithBack";

import {
  getTrainerHistory,
  resetTrainerHistory,
} from "../../redux/slices/trainerHistorySlice";

const SessionHistory = () => {
  const dispatch = useDispatch();

  const {
    sessions,
    loading,
    currentPage,
    totalPages,
  } = useSelector(state => state.trainerHistory);

  useEffect(() => {
    dispatch(resetTrainerHistory());
    dispatch(getTrainerHistory(1));
  }, [dispatch]);


  const loadMore = () => {
    if (!loading && currentPage < totalPages) {
      dispatch(getTrainerHistory(currentPage + 1));
    }
  };

  const renderItem = ({ item }) => {
    console.log("🟢 Rendering session:", item.id);

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
      <HeaderWithBack title="Session History" subtitle="Session Details" />

      {loading && sessions.length === 0 ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.cardWrapper}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            loading ? <ActivityIndicator style={{ margin: 20 }} /> : null
          }
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 50 }}>
              No session history found
            </Text>
          }
        />
      )}
    </View>
  );
};

export default SessionHistory;
