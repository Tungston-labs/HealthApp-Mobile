import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../../components/Header';
import styles from './style';
import FilterModal from '../../components/FIlterModal';
import PlanCard from './PlanCard';

const WorkoutPlan = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  // Temporary static data (matches Django model)
  const plans = [
    {
      id: 1,
      plan_name: 'Swimming',
      plan_type: '3_days',
      single_price: 499,
      image: require('../../../assets/swimming1.jpeg'),
    },
    {
      id: 2,
      plan_name: 'Gym Workout',
      plan_type: '6_days',
      single_price: 999,
      image: require('../../../assets/gym.png'),
    },
    {
      id: 3,
      plan_name: 'Cycling',
      plan_type: '3_days',
      single_price: 399,
      image: require('../../../assets/cycling.png'),
    },
    {
      id: 4,
      plan_name: 'Zumba',
      plan_type: '6_days',
      single_price: 799,
      image: require('../../../assets/swimming2.png'),
    },
    {
      id: 5,
      plan_name: 'Boxing',
      plan_type: '3_days',
      single_price: 599,
      image: require('../../../assets/boxing1.jpg'),
    },
  ];

  return (
    <>
<ScrollView
  style={styles.container}
  keyboardShouldPersistTaps="handled"
>
        <Header
          username="Ajay"
          subtitle="Your workout plans"
          onNotificationPress={() => navigation.navigate('Notifications')}
        />

        <View style={styles.gridContainer}>
          {plans.map(item => (
            <PlanCard
              key={item.id}
              item={item}
              onPress={() => {
                console.log('CARD PRESSED');
                setShowModal(true);
              }}
            />
          ))}
        </View>
      </ScrollView>

      <FilterModal visible={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default WorkoutPlan;
