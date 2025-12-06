import React, { useState } from "react";
import MainLayout from "../../../components/MainLayout";

import GenderScreen from "../GenderScreen";
import AgeScreen from "../Agescreen";
import BloodGroupScreen from "../BloodGroupScreen";
import GoalScreen from "../GoalScreen";
import ConditionScreen from "../ConditionScreen";

export default function MainWizardScreen() {
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
              setStep(2); // navigate to AgeScreen instantly
            }}
          />
        );
      case 2: return <AgeScreen />;
      case 3: return <BloodGroupScreen />;
      case 4: return <GoalScreen />;
      case 5: return <ConditionScreen />;
      default: return <GenderScreen />;
    }
  };

  const getTitle = () => {
    switch (step) {
      case 1: return "Select your Gender";
      case 2: return "How old are you ?";
      case 3: return "Select your blood group";
      case 4: return "Enter wellness goal";
      case 5: return "Health conditions / injuries";
      default: return "";
    }
  };

  return (
    <MainLayout
      title={getTitle()}
      step={step}
      onBack={() => setStep(Math.max(step - 1, 1))}
      onNext={() => setStep(Math.min(step + 1, 5))}
    >
      {getScreenContent()}
    </MainLayout>
  );
}
