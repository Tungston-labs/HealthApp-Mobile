// navigation/AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import WorkoutScreen from "../screens/WorkoutPlan";
import TasksScreen from "../screens/TaskScreen";
import ProfileScreen from "../screens/ProfileScreen";

import BottomNav from "../components/BottomNavbar";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <BottomNav {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Workout" component={WorkoutScreen} />

            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Tasks" component={TasksScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default AppNavigator;
