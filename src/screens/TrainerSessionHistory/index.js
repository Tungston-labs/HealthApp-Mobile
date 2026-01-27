import React, { useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import SessionCard from "../../components/SessionCard";
import HeaderWithBack from "../../components/HeaderWithBack";
import Skeleton from "../../components/Skelton"; 
import {
  getTrainerHistory,
  resetTrainerHistory,
} from "../../redux/slices/trainerHistorySlice";

const SessionHistory = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("TrainerScheduleDetail", {
          id: item.id,
          hideButton: true,
        })
      }
    >
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
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderWithBack title="Session History" subtitle="Session Details" />

     
      {loading && currentPage === 1 ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} height={100} borderRadius={15} />
        ))
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
            loading && currentPage > 1 ? (
              <Skeleton height={100} borderRadius={15} />
            ) : null
          }
          ListEmptyComponent={
            !loading && (
              <Text style={{ textAlign: "center", marginTop: 50 }}>
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
