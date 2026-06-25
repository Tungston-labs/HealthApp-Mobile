import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MainLayout from "../../../components/MainLayout";
import GenderScreen from "../GenderScreen";
import AgeScreen from "../Agescreen";
import BloodGroupScreen from "../BloodGroupScreen";
import GoalScreen from "../GoalScreen";
import ConditionScreen from "../ConditionScreen";
import WeightScreen from "../WeightScreen";
import HeightScreen from "../HeightScreen";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

export default function MainWizardScreen({ route }) {
  const navigation = useNavigation();
  const [step, setStep] = useState(route?.params?.initialStep || 1);
  const registration = useSelector(state => state.registration);

  useEffect(() => {
    if (route?.params?.initialStep) {
      setStep(route.params.initialStep);
    }
  }, [route?.params?.initialStep]);

  const getScreenContent = () => {
    switch (step) {
      case 1:
        return (
          <GenderScreen
            selectedGender={registration.gender}
            onSelectGender={() => setStep(2)}
          />

        );
      case 2:
        return <AgeScreen />;
      case 3:
        return <BloodGroupScreen />;
      case 4:
        return <GoalScreen />;
      case 5:
        return <ConditionScreen />;
      case 6:
        return <WeightScreen />;
      case 7:
        return <HeightScreen />;
      default:
        return <GenderScreen />;
    }
  };

  const getTitle = () => {
    switch (step) {
      case 1:
        return "Select your Gender";
      case 2:
        return "How old are you ?";
      case 3:
        return "Select your blood group";
      case 4:
        return "Enter wellness goal";
      case 5:
        return "Health conditions / injuries";
      case 6:
        return "What Is Your Weight?";
      case 7:
        return "What Is Your Height?";
      default:
        return "";
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigation.goBack();
    } else {
      setStep(step - 1);
    }
  };
const handleNext = () => {
  const reg = registration;


  switch (step) {
    case 1:
      if (!reg.gender) {
        Toast.show({
          type: "error",
          text1: "Select gender",
        });
        return;
      }
      break;

    case 2:
      if (!reg.dob || !reg.age) {
        Toast.show({
          type: "error",
          text1: "Select your date of birth",
        });
        return;
      }
      break;

    case 3:
      if (!reg.blood_group) {
        Toast.show({
          type: "error",
          text1: "Select blood group",
        });
        return;
      }
      break;

    case 4:
      if (!reg.wellness_goal || reg.wellness_goal.length === 0) {
        Toast.show({
          type: "error",
          text1: "Select a wellness goal",
        });
        return;
      }
      break;

    case 5:
      if (!reg.health_issues || reg.health_issues.length === 0) {
        Toast.show({
          type: "error",
          text1: "Select at least one health condition",
        });
        return;
      }
      break;

    case 6:
      if (!reg.weight) {
        Toast.show({
          type: "error",
          text1: "Select your weight",
        });
        return;
      }
      break;

    default:
      break;
  }

  if (step === 7) {
    if (!reg.height) {
      Toast.show({
        type: "error",
        text1: "Select your height",
      });
      return;
    }

    navigation.navigate("BMIResultScreen");
  } else {
    setStep(prev => prev + 1);
  }
};



  return (
    <MainLayout
      title={getTitle()}
      step={step}
      onBack={handleBack}
      onNext={handleNext}
    >
      {getScreenContent()}
    </MainLayout>
  );
}
