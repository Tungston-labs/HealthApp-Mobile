import React, { useState, useCallback, useEffect } from 'react';
import TrainerAssignedClientsView from './TrainerAssignedClientsView';
import { useGetAssignedClientsQuery } from '../../redux/api/trainer/scheduleApi';
import Toast from 'react-native-toast-message';

const TrainerAssignedClientsContainer = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error, refetch } =
    useGetAssignedClientsQuery({
      page,
      limit: 10,
    });

  const clients = data?.results || [];
  const hasNextPage = data?.current_page < data?.total_pages;

  const loadMore = useCallback(() => {
    if (!isFetching && hasNextPage) {
      setPage(prev => prev + 1);
    }
  }, [isFetching, hasNextPage]);

  const onRefresh = useCallback(() => {
    setPage(1);
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (error) {
      const message =
        error?.data?.message ||
        error?.error ||
        'Something went wrong. Please try again.';
      Toast.show({
        type: 'error',
        text1: 'Error loading clients',
        text2: message,
      });
    }
  }, [error]);

  return (
    <TrainerAssignedClientsView
      isLoading={isLoading}
      page={page}
      clients={clients}
      loadMore={loadMore}
      onRefresh={onRefresh}
      isFetching={isFetching}
    />
  );
};

export default TrainerAssignedClientsContainer;
