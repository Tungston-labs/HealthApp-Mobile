import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MainLayout from "../../../components/MainLayout";
import GenderScreen from "../GenderScreen";
import AgeScreen from "../Agescreen";
import BloodGroupScreen from "../BloodGroupScreen";
import GoalScreen from "../GoalScreen";
import ConditionScreen from "../ConditionScreen";
import WeightScreen from "../WeightScreen";
import HeightScreen from "../HeightScreen";

export default function MainWizardScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState(null);

  const getScreenContent = () => {
    switch (step) {
      case 1:
        return (
          <GenderScreen
            selectedGender={gender}
            onSelectGender={(value) => {
              setGender(value);
              setStep(2);
            }}
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
    if (step === 7) {
      navigation.navigate("BMIResultScreen"); 
    } else {
      setStep(step + 1);
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

