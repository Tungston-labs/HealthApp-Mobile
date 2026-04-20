import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

import styles from './style';
import NewHeader from '../../components/NewHeader';
import CreateAccountStepOne from './CreateAccountStepOne';
import CreateAccountStepTwo from './CreateAccountStepTwo';
import CreateAccountStepThree from './CreateAccountStepThree';
import { getCurrentLocation } from '../../utils/location';
import { reverseGeocodeDetails } from '../../utils/reverseGeocode';
import { registerTrainerThunk } from '../../redux/slices/trainerRegistrationSlice';
import { uploadImageApi } from '../../services/trainerServices';
import {
  validateSignup,
  validateTrainerStep1,
  validateTrainerStep2,
  validateTrainerStep3,
} from '../../utils/Validators';

const INITIAL_FORM = {
  name: '',
  email: '',
  phno: '',
  dob: '',
  aadhaar: '',
  location: '',
  sectionTiming: '',
  experience: '',
  sessions: '',
  fee: '',
  password: '',
  confirmPassword: '',
  profileImage: null,
  aadhaarImage: null,
  genderValue: '',
  address: '',
  city: '',
  pincode: '',
  landmark: '',
  coords: null,
  expertiseValue: '',
  images: [],
  acceptTerms: false,
};

const expertiseMap = {
  Cycling: 1,
  Gym: 2,
  Zumba: 3,
  Swimming: 4,
  Boxing: 5,
};

export default function CreateAccountScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.trainerReg);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [isUploading, setIsUploading] = useState(false);

  const isSubmitting = loading || isUploading;

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const showValidationError = message => {
    Toast.show({
      type: 'error',
      text1: 'Validation Error',
      text2: message,
    });
  };

  const handlePickSingleImage = field => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.errorCode || !response.assets?.length) {
          showValidationError('Unable to pick image right now');
          return;
        }

        updateField(field, response.assets[0]);
      },
    );
  };

  const handlePickCertificates = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.errorCode || !response.assets?.length) {
          showValidationError('Unable to pick certificate images');
          return;
        }

        setForm(prev => ({
          ...prev,
          images: [...prev.images, ...response.assets],
        }));
      },
    );
  };

  const handleUseLocation = async () => {
    try {
      const locationData = await getCurrentLocation();
      const roundedCoords = {
        latitude: parseFloat(locationData.latitude.toFixed(6)),
        longitude: parseFloat(locationData.longitude.toFixed(6)),
      };

      const locationDetails = await reverseGeocodeDetails(
        roundedCoords.latitude,
        roundedCoords.longitude,
      );

      const fallbackAddress =
        locationDetails.formatted ||
        [
          locationDetails.landmark,
          locationDetails.city,
          locationDetails.pincode,
        ]
          .filter(Boolean)
          .join(', ');

      setForm(prev => ({
        ...prev,
        coords: roundedCoords,
        location: locationDetails.formatted,
        address: locationDetails.addressLine || fallbackAddress,
        city: locationDetails.city || prev.city,
        pincode: locationDetails.pincode || prev.pincode,
        landmark: locationDetails.landmark || prev.landmark,
      }));

      Toast.show({
        type: 'success',
        text1: 'Location fetched',
        text2: 'Address details have been added to the form',
      });
    } catch (locationError) {
      console.log('Location error:', locationError);
      showValidationError('Unable to fetch your location right now');
    }
  };

  const handleNext = () => {
    const validationResult =
      step === 1 ? validateTrainerStep1(form) : validateTrainerStep2(form);

    if (!validationResult.ok) {
      showValidationError(validationResult.msg);
      return;
    }

    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      navigation.goBack();
      return;
    }

    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    const stepValidation = validateTrainerStep3(form);
    if (!stepValidation.ok) {
      showValidationError(stepValidation.msg);
      return;
    }

    const fullValidation = validateSignup(form);
    if (!fullValidation.ok) {
      showValidationError(fullValidation.msg);
      return;
    }

    try {
      setIsUploading(true);

      const adarImageUrl = await uploadImageApi(form.aadhaarImage);
      const certUrls = [];

      for (const img of form.images) {
        const imageUrl = await uploadImageApi(img);
        if (imageUrl) {
          certUrls.push(imageUrl);
        }
      }

      const formData = new FormData();
      const finalLocationString =
        [form.landmark, form.address, form.city, form.pincode]
          .filter(Boolean)
          .join(', ') || (form.location || '').trim();

      formData.append('name', form.name);
      formData.append('email', form.email.toLowerCase().trim());
      formData.append('phno', form.phno);
      formData.append('dob', form.dob);
      formData.append('gender', form.genderValue.toLowerCase());
      formData.append('password', form.password);

      formData.append('location', finalLocationString);
      formData.append('address', form.address || '');
      formData.append('city', form.city || '');
      formData.append('pincode', form.pincode || '');
      formData.append('landmark', form.landmark || '');

      formData.append('adar_number', form.aadhaar);
      formData.append('section_timing', Number(form.sectionTiming));

      if (form.coords?.latitude && form.coords?.longitude) {
        formData.append('latitude', Number(form.coords.latitude).toFixed(6));
        formData.append('longitude', Number(form.coords.longitude).toFixed(6));
      }

      const planId = expertiseMap[form.expertiseValue];
      if (planId) {
        formData.append('training_field', Number(planId));
      }

      formData.append('experience', Number(form.experience) || 0);
      formData.append('no_of_section', Number(form.sessions) || 0);
      formData.append('expecting_salary', Number(form.fee) || 0);

      if (form.profileImage?.uri) {
        const fixedUri =
          Platform.OS === 'android' || form.profileImage.uri.startsWith('file://')
            ? form.profileImage.uri
            : `file://${form.profileImage.uri}`;

        formData.append('profile_pic', {
          uri: fixedUri,
          name: form.profileImage.fileName || `profile_${Date.now()}.jpg`,
          type: form.profileImage.type || 'image/jpeg',
        });
      }

      if (adarImageUrl) {
        formData.append('adar_image', adarImageUrl);
      }

      certUrls.forEach(url => {
        formData.append('certificates[]', url);
      });

      await dispatch(registerTrainerThunk(formData)).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Trainer registered successfully',
      });

      navigation.reset({ index: 0, routes: [{ name: 'ThankYouScreen' }] });
    } catch (submitError) {
      console.log('REGISTRATION ERROR:', submitError);

      let errorMessage = 'Something went wrong';

      if (typeof submitError === 'string') {
        errorMessage = submitError;
      } else if (submitError?.message && typeof submitError.message === 'string') {
        errorMessage = submitError.message;
      } else if (typeof submitError === 'object' && submitError !== null) {
        const values = Object.values(submitError);
        if (values.length > 0) {
          errorMessage = Array.isArray(values[0])
            ? values[0][0]
            : JSON.stringify(values[0]);
        }
      }

      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: errorMessage,
        visibilityTime: 5000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <CreateAccountStepOne
          form={form}
          onBack={handleBack}
          onChangeField={updateField}
          onPickProfileImage={() => handlePickSingleImage('profileImage')}
          onPickAadhaarImage={() => handlePickSingleImage('aadhaarImage')}
        />
      );
    }

    if (step === 2) {
      return (
        <CreateAccountStepTwo
          form={form}
          onChangeField={updateField}
          onUseLocation={handleUseLocation}
        />
      );
    }

    return (
      <CreateAccountStepThree
        form={form}
        onChangeField={updateField}
        onPickCertificates={handlePickCertificates}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenContainer}>
        <NewHeader />

        <View style={styles.formCard}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {renderStep()}
          </ScrollView>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={[styles.footerActions, step === 1 && styles.footerActionsSingle]}>
            {step > 1 ? (
              <TouchableOpacity style={styles.secondaryAction} onPress={handleBack}>
                <View style={styles.buttonContent}>
                  <Ionicons name="chevron-back" size={18} color="#181818" />
                  <Text style={styles.secondaryActionText}>Back</Text>
                </View>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={[
                styles.primaryAction,
                step === 3 && styles.submitAction,
                isSubmitting && styles.disabledAction,
              ]}
              onPress={step === 3 ? handleSubmit : handleNext}
              disabled={isSubmitting}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.primaryActionText}>
                  {step === 3 ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Next'}
                </Text>
                {step !== 3 ? (
                  <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
