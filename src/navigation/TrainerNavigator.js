import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrainerBottomNav from '../components/TrainerBottomNav';
import TrainerSessionHistory from '../screens/TrainerSessionHistory';
import ProfileScreenTrainer from '../screens/TrainerProfile';
import TrainerHomeContainer from '../screens/TrainerHome';
import TrainerAssignedClientsContainer from '../screens/TrainerAssignedClients';

const Tab = createBottomTabNavigator();

const TrainerNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TrainerBottomNav {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="TrainerHome" component={TrainerHomeContainer} />
      <Tab.Screen
        name="TrainerAssignedClients"
        component={TrainerAssignedClientsContainer}
      />
      <Tab.Screen name="Session" component={TrainerSessionHistory} />
      <Tab.Screen
        name="ProfileScreenTrainer"
        component={ProfileScreenTrainer}
      />
    </Tab.Navigator>
  );
};

export default TrainerNavigator;
