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
import EditProfileScreen from "../screens/EditProfileScreen"
import NotificationScreen from "../screens/NotificationScreen"
import AppNavigator from './AppNavigator';
import TrainerListScreen from "../screens/TrainerList";
import TrainerDetailScreen from "../screens/TrainerSingleView";
import PaymentScreen from "../screens/PaymentScreen";
import Welcome from '../screens/WelcomeScreens';
import BMIResultScreen from '../screens/BMIResultScreen';
import WorkoutPlan from '../screens/WorkoutPlan';
import CreateAccount from '../screens/CreateAccountScreen';
import ThankYouScreen from '../screens/ThankYouScreen';
import ScheduleEmpty from '../screens/ScheduleEmpty';
import TermsAndConditions from '../screens/TermsAndConditionsScreen';
import TrainerNavigator from './TrainerNavigator';
import TrainerScheduleDetailContainer from '../screens/TrainerScheduledetails';
import TrainerEditProfile from '../screens/TrainerEditprofile';
const Stack = createNativeStackNavigator();
import { navigationRef } from "./navigationService";

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="SelectRoleScreen" component={SelectRoleScreen} />
        <Stack.Screen name="SignupDetailsScreenUser" component={SignupDetailsScreenUser} />

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
          name="EditProfile"
          component={EditProfileScreen}

        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}

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
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}

        />
        <Stack.Screen
          name="TrainerNavigator"
          component={TrainerNavigator}

        />
        <Stack.Screen
          name="TrainerScheduleDetail"
          component={TrainerScheduleDetailContainer}

        />
        <Stack.Screen
          name="TrainerEditProfile"
          component={TrainerEditProfile}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
