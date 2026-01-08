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
import WorkoutPlan from "../screens/WorkoutPlan";
import SingleSessionHistory from "../screens/SingleSessionHistory"
const Tab = createBottomTabNavigator();
const SessionStack = createNativeStackNavigator();

const SessionStackScreen = () => (
  <SessionStack.Navigator screenOptions={{ headerShown: false }}>
    <SessionStack.Screen name="History" component={SessionHistory} />
    <SessionStack.Screen name="SingleSessionHistory" component={SingleSessionHistory} />
  </SessionStack.Navigator>
);
const AppNavigator = ({ route }) => {
  const defaultTab = route?.params?.defaultTab || "workout";

  const tabOrder =
    defaultTab === "Session"
      ? [
          { name: "workout", component: UpcomingSession },
          { name: "profilesection", component: SessionStackScreen },
          { name: "Session", component: ProfileSection },
          { name: "profile", component: ProfileScreen },
        ]
      : [
          { name: "workout", component: WorkoutPlan },
          { name: "profilesection", component: ProfileSection },
          { name: "Session", component: SessionStackScreen },
          { name: "profile", component: ProfileScreen },
        ];

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {tabOrder.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default AppNavigator;

