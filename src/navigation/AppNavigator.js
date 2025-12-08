// navigation/AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import WorkoutScreen from "../screens/WorkoutPlan";
import TasksScreen from "../screens/TaskScreen";
import ProfileScreen from "../screens/ProfileScreen";

import BottomNav from "../components/BottomNavbar";
import UpcomingSession from "../screens/UpcomingSession";
import ProfileSection from "../screens/ProfileSection";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <BottomNav {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Upcoming" component={UpcomingSession} />

            <Tab.Screen name="profilesection" component={ProfileSection} />

            <Tab.Screen name="Tasks" component={TasksScreen} />
            <Tab.Screen name="workout" component={WorkoutScreen} />
        </Tab.Navigator>
    );
};

export default AppNavigator;
