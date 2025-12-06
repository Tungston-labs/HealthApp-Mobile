import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import OtpScreen from '../screens/otpVerification';
import ResetPasswordScreen from '../screens/ResetPassword';
import SelectRoleScreen from '../screens/SelectRoleScreen';
import SignupDetailsScreenUser from '../screens/SignupDetailsScreen-user';
import MainWizardScreen from '../screens/onboarding/MainWizardScreen/MainWizardScreen';

import NotificationScreen from "../screens/NotificationScreen"
import AppNavigator from './AppNavigator';
import TrainerListScreen from "../screens/TrainerList";
import TrainerDetailScreen from "../screens/TrainerSingleView"
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">

        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelectRoleScreen" component={SelectRoleScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupDetailsScreenUser" component={SignupDetailsScreenUser} options={{ headerShown: false }} />
        <Stack.Screen
          name="MainWizardScreen"
          component={MainWizardScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{ headerShown: false }}
        />
        
        {/* Select Role */}
        <Stack.Screen
          name="SelectRoleScreen"
          component={SelectRoleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainApp"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
           <Stack.Screen 
          name="TrainerList" 
          component={TrainerListScreen}
 
        
        />
        <Stack.Screen
          name="TrainerDetail"
          component={TrainerDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
