import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TrainerBottomNav from "../components/TrainerBottomNav";
import TrainerHome from "../screens/TrainerHome";
import SessionBooking from "../screens/SessionBooking";
import TrainerSessionHistory from "../screens/TrainerSessionHistory"
import ProfileScreenTrainer from "../screens/TrainerProfile";

const Tab = createBottomTabNavigator();

const TrainerNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TrainerBottomNav {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="TrainerHome" component={TrainerHome} />
      <Tab.Screen name="SessionBooking" component={SessionBooking} />
      <Tab.Screen name="Session" component={TrainerSessionHistory} />
      <Tab.Screen name="ProfileScreenTrainer" component={ProfileScreenTrainer} />
    </Tab.Navigator>
  );
};

export default TrainerNavigator;
