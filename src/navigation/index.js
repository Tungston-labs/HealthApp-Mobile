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
import Welcome from '../screens/WelcomeScreens';
import BMIResultScreen from '../screens/BMIResultScreen';
import CreateAccount from '../screens/CreateAccountScreen';
import ThankYouScreen from '../screens/ThankYouScreen';
import ScheduleEmpty from '../screens/ScheduleEmpty';


const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">

        <Stack.Screen name="Login" component={LoginScreen}  />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}  />
        <Stack.Screen name="OtpScreen" component={OtpScreen}  />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}  />
        <Stack.Screen name="SelectRoleScreen" component={SelectRoleScreen}  />
        <Stack.Screen name="SignupDetailsScreenUser" component={SignupDetailsScreenUser}  />
        <Stack.Screen
          name="MainWizardScreen"
          component={MainWizardScreen}
          
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
          
        />

        <Stack.Screen
          name="MainApp"
          component={AppNavigator}
          
        />
           <Stack.Screen 
          name="TrainerList" 
          component={TrainerListScreen}
 
        
        />
        <Stack.Screen
          name="TrainerDetail"
          component={TrainerDetailScreen}
          
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          
        />
        <Stack.Screen
          name="BMIResultScreen"
          component={BMIResultScreen}
          
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          
        />
        <Stack.Screen
          name="ThankYouScreen"
          component={ThankYouScreen}
          
        />
        <Stack.Screen
          name="ScheduleEmpty"
          component={ScheduleEmpty}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
