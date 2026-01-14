import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import BottomNav from "../components/BottomNavbar";

import UpcomingSession from "../screens/UpcomingSession";
import WorkoutPlan from "../screens/WorkoutPlan";
import ClientListScreen from "../screens/ClientListScreen";
import SessionHistory from "../screens/SessionHistory";
import SingleSessionHistory from "../screens/SingleSessionHistory";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const HistoryStack = createNativeStackNavigator();

/* -------- Session History Stack (3rd tab) -------- */
const HistoryStackScreen = () => (
  <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
    <HistoryStack.Screen name="SessionHistory" component={SessionHistory} />
    <HistoryStack.Screen
      name="SingleSessionHistory"
      component={SingleSessionHistory}
    />
  </HistoryStack.Navigator>
);

const AppNavigator = () => {
  const { user } = useSelector((state) => state.auth || {});
  const hasSession = !!user?.session;

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {/* 1️⃣ Workout */}
      <Tab.Screen
        name="workout"
        component={WorkoutPlan}
      />

      {/* 2️⃣ Session */}
      <Tab.Screen
        name="Session"
        component={ClientListScreen}
      />

      {/* 3️⃣ History */}
      <Tab.Screen
        name="sessionhistory"
        component={HistoryStackScreen}
      />

      {/* 4️⃣ Profile */}
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
