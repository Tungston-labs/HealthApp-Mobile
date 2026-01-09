// navigation/AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import BottomNav from "../components/BottomNavbar";

import UpcomingSession from "../screens/UpcomingSession";
import WorkoutPlan from "../screens/WorkoutPlan";
import ProfileSection from "../screens/ProfileSection";
import SessionHistory from "../screens/SessionHistory";
import SingleSessionHistory from "../screens/SingleSessionHistory";
import ProfileScreen from "../screens/ProfileScreen";

// 🔥 NEW SCREEN
import ClientListScreen from "../screens/ClientListScreen";

const Tab = createBottomTabNavigator();
const SessionStack = createNativeStackNavigator();

/* -------- Session History Stack -------- */
const SessionStackScreen = () => (
  <SessionStack.Navigator screenOptions={{ headerShown: false }}>
    <SessionStack.Screen name="History" component={SessionHistory} />
    <SessionStack.Screen
      name="SingleSessionHistory"
      component={SingleSessionHistory}
    />
  </SessionStack.Navigator>
);

const AppNavigator = () => {
  const { user } = useSelector((state) => state.auth || {});
  const hasSession = !!user?.session;

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName="workout"
    >
      {/* Workout / Upcoming Session */}
      <Tab.Screen
        name="workout"
        component={hasSession ? UpcomingSession : WorkoutPlan}
      />

      <Tab.Screen
        name="Session"
        component={ClientListScreen}
      />

      {/* Session History */}
      <Tab.Screen
        name="profilesection"
        component={SessionStackScreen}
      />

      {/* Profile */}
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
