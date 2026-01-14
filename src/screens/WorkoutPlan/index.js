import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import FilterModal from '../../components/FIlterModal';
import PlanCard from '../../components/PlanCard';
import Skeleton from '../../components/Skelton';
import { fetchPlansThunk } from '../../redux/slices/planSlice';
import styles from './style';

const WorkoutPlan = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const { plans, loading, error } = useSelector(state => state.planList);
  const user = useSelector(state => state.auth?.user);

  useEffect(() => {
    dispatch(fetchPlansThunk());
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        username={user?.name || 'User'}
        subtitle="Your workout plans"
        onNotificationPress={() => navigation.navigate('Notifications')}
      />

      {loading ? (
        <FlatList
          data={Array.from({ length: 6 })}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.gridContainer}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <Skeleton height={220} borderRadius={16} />
          )}
        />
      ) : (
        <FlatList
          data={plans}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.gridContainer}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !loading && (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>
                No plans available
              </Text>
            )
          }
          renderItem={({ item }) => (
            <PlanCard
              item={item}
              onPress={() => {
                setSelectedPlanId(item.id);
                setShowModal(true);
              }}
            />
          )}
        />
      )}

      {error && <Text>{JSON.stringify(error)}</Text>}

      <FilterModal
        visible={showModal}
        planId={selectedPlanId}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
};

export default WorkoutPlan;
