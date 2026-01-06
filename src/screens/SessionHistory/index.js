import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderWithBack from "../../components/HeaderWithBack";
import HistoryCard from "../../components/Historycard";
import styles from "./styles";
import { getTrainerHistory } from "../../redux/slices/trainerHistorySlice";

const SessionHistory = () => {
  const dispatch = useDispatch();

  const {
    sessions,
    loading,
    currentPage,
    totalPages,
  } = useSelector((state) => state.trainerHistory);

  useEffect(() => {
    dispatch(getTrainerHistory(1));
  }, []);

  const loadMore = () => {
    if (!loading && currentPage < totalPages) {
      dispatch(getTrainerHistory(currentPage + 1));
    }
  };

  const renderFooter = () =>
    loading ? <ActivityIndicator size="small" /> : null;
  console.log("TrainerHistory State:", {
  sessions,
  loading,
  currentPage,
  totalPages,
});


  return (
    <View style={styles.container}>
      <HeaderWithBack title="Session History" subtitle="Session Details" />

      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HistoryCard item={item} />}
        contentContainerStyle={styles.cardWrapper}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default SessionHistory;
