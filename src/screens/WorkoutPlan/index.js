import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import styles from './style';
import FilterModal from '../../components/FIlterModal';
import PlanCard from './PlanCard';
import { fetchPlansThunk } from '../../redux/slices/planSlice';
import { Text } from 'react-native-svg';

const WorkoutPlan = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const { plans, loading, error } = useSelector(state => state.planList);
  const user = useSelector(state => state.auth?.user);
  useEffect(() => {
    dispatch(fetchPlansThunk());
  }, []);

  console.log("PLANS 👉", plans);

  return (
    <>
      <ScrollView style={styles.container}>
        <Header
          username={user?.name || 'User'}
          subtitle="Your workout plans"
          onNotificationPress={() => navigation.navigate('Notifications')}
        />

        {loading && <ActivityIndicator size="large" />}
        {error && <Text>{JSON.stringify(error)}</Text>}

        <View style={styles.gridContainer}>
          {plans.length === 0 && !loading && (
            <Text>No plans available</Text>
          )}

          {plans.map(item => (
            <PlanCard
              key={item.id}
              item={item}
              onPress={() => {
                setSelectedPlanId(item.id);
                setShowModal(true);
              }}
            />
          ))}

        </View>
      </ScrollView>

      <FilterModal
        visible={showModal}
        planId={selectedPlanId}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default WorkoutPlan;
