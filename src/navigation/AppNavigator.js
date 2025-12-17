// navigation/AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import ProfileScreen from "../screens/ProfileScreen";

import BottomNav from "../components/BottomNavbar";
import UpcomingSession from "../screens/UpcomingSession";
import ProfileSection from "../screens/ProfileSection";
import SessionHistory from "../screens/SessionHistory"
import SingleSession from "../screens/SingleSession";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const SessionStack = createNativeStackNavigator();

const SessionStackScreen = () => (
  <SessionStack.Navigator screenOptions={{ headerShown: false }}>
    <SessionStack.Screen name="History" component={SessionHistory} />
    <SessionStack.Screen name="SingleSession" component={SingleSession} />
  </SessionStack.Navigator>
);
const AppNavigator = () => {
  return (

    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Upcoming" component={UpcomingSession} />

      <Tab.Screen name="profilesection" component={ProfileSection} />

      <Tab.Screen name="Session" component={SessionStackScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
