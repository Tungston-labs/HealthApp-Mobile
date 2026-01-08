import React, { useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './style';
import Header from '../../components/Header';
import AssignedClientCard from '../../components/AssignedClientCard';
import Skeleton from '../../components/Skelton';

const TrainerAssignedClientsView = ({
  isLoading,
  page,
  clients,
  loadMore,
  onRefresh,
  isFetching,
}) => {
  const renderItem = useCallback(
    ({ item }) => <AssignedClientCard data={item} />,
    [],
  );
  return (
    <View style={styles.container}>
      <Header username="John" subtitle="Gym" bmiValue="22.5" />

      <Text style={styles.sectionTitle}>All Assigned Clients</Text>

      {isLoading && page === 1 ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} height={70} borderRadius={15} />
        ))
      ) : (
        <FlatList
          data={clients}
          keyExtractor={item => item.client_id.toString()}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.listWrapper,
            clients?.length === 0 && { flexGrow: 1 },
          ]}
          onEndReached={loadMore}
          onEndReachedThreshold={0.6}
          onRefresh={onRefresh}
          refreshing={isLoading && page === 1}
          ListFooterComponent={
            isFetching && page > 1 ? (
              <Skeleton height={70} borderRadius={15} />
            ) : null
          }
          ListEmptyComponent={
            !isLoading && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>
                  You don’t have any assigned clients yet.
                </Text>
                <Text style={styles.emptySubText}>
                  New clients will appear here once they’re assigned to you.
                </Text>
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default TrainerAssignedClientsView;
