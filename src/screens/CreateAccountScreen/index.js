import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles, { pickerSelectStyles } from './style';
import { getCurrentLocation } from '../../utils/location';
import { reverseGeocode } from '../../utils/reverseGeocode';
import { useDispatch, useSelector } from 'react-redux';
import { registerTrainerThunk } from '../../redux/slices/trainerRegistrationSlice';
import { launchImageLibrary } from 'react-native-image-picker';
import DOBPicker from './DOBPicker';
import { getPlansApi, uploadImageApi } from '../../services/trainerServices';
import Toast from 'react-native-toast-message';
import { sectionTimingRegex, validateSignup } from '../../utils/Validators';
import RNPickerSelect from 'react-native-picker-select';

export default function CreateAccountScreen({ navigation }) {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const [sectionOpen, setSectionOpen] = useState(false);

  const { loading, error, success } = useSelector(state => state.trainerReg);
  const [isUploading, setIsUploading] = useState(false); const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phno, setPhno] = useState('');
  const [dob, setDob] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [location, setLocation] = useState('');
  const [sectionTiming, setSectionTiming] = useState('');
  const [experience, setExperience] = useState('');
  const [sessions, setSessions] = useState('');
  const [fee, setFee] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [aadhaarImage, setAadhaarImage] = useState(null);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState('');
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [coords, setCoords] = useState(null);
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const [expertiseValue, setExpertiseValue] = useState('');
  const [plans, setPlans] = useState([]);
  const handlePickProfileImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
      },
      response => {
        if (response.didCancel) return;

        if (response.errorCode) {
          alert('Failed to pick image');
          return;
        }

        if (response.assets?.length) {
          setProfileImage(response.assets[0]);
        }
      },
    );
  };
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPlansApi();
        setPlans(response.data);
      } catch (err) {
        console.log("Plans Error:", err);
      }
    };

    fetchPlans();
  }, []);
  const handlePickAadhaarImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
      },
      response => {
        if (response.didCancel || response.errorCode) return;
        if (response.assets?.length) {
          setAadhaarImage(response.assets[0]);
        }
      },
    );
  };
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('http://178.248.112.16:9001/');
        console.log(" Connection Test Success:", response.status);
      } catch (error) {
        console.log(" Connection Test Failed. This is a Network Config issue:", error.message);
      }
    };
    testConnection();
  }, []);
  const handleUseLocation = async () => {
    try {
      const locationData = await getCurrentLocation();

      // Round to 6 decimal places immediately
      const roundedCoords = {
        latitude: parseFloat(locationData.latitude.toFixed(6)),
        longitude: parseFloat(locationData.longitude.toFixed(6)),
      };

      setCoords(roundedCoords); // Save the cleaned coordinates

      const fullAddress = await reverseGeocode(
        roundedCoords.latitude,
        roundedCoords.longitude
      );

      // ... rest of your address logic
      setAddress(fullAddress);
      alert("Location fetched successfully");
    } catch (err) {
      console.log("Location error:", err);
    }
  };

  const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
        quality: 0.8,
        forceJPG: true,
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.errorCode) {
          alert('Image pick error');
          return;
        }

        if (response.assets?.length) {
          setImages(prev => [...prev, ...response.assets]);
        }
      },
    );
  };
  const handleRemoveImage = index => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = async () => {
    const validationData = {
      name, email, phno, dob, genderValue, expertiseValue,
      aadhaar, password, location, landmark, address, city, pincode,
      profileImage, aadhaarImage, images, sectionTiming
    };

    const check = validateSignup(validationData);
    if (!check.ok) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: check.msg,
      });
      return;
    }

    try {
      setIsUploading(true);

      const adarImageUrl = await uploadImageApi(aadhaarImage);
      let certUrls = [];
      for (const img of images) {
        const url = await uploadImageApi(img);
        if (url) certUrls.push(url);
      }

      const formData = new FormData();
      const finalLocationString = location?.trim() || [landmark, address, city, pincode].filter(Boolean).join(", ");

      formData.append("name", name);
      formData.append("email", email.toLowerCase().trim());
      formData.append("phno", phno);
      formData.append("dob", dob);
      formData.append("gender", genderValue.toLowerCase());
      formData.append("password", password);

      formData.append("location", finalLocationString);
      formData.append("address", address || "");
      formData.append("city", city || "");
      formData.append("pincode", pincode || "");
      formData.append("landmark", landmark || "");

      formData.append("adar_number", aadhaar);
      formData.append("section_timing", Number(sectionTiming));

      if (coords?.latitude && coords?.longitude) {
        formData.append("latitude", Number(coords.latitude).toFixed(6));
        formData.append("longitude", Number(coords.longitude).toFixed(6));
      }

      if (expertiseValue?.id) {
        formData.append("training_field", expertiseValue.id);
      }
      formData.append("experience", Number(experience) || 0);
      formData.append("no_of_section", Number(sessions) || 0);
      formData.append("expecting_salary", Number(fee) || 0);

      if (profileImage?.uri) {
        const fixedUri = Platform.OS === "android"
          ? (profileImage.uri.startsWith("file://") ? profileImage.uri : `file://${profileImage.uri}`)
          : profileImage.uri;

        formData.append("profile_pic", {
          uri: fixedUri,
          name: profileImage.fileName || `profile_${Date.now()}.jpg`,
          type: profileImage.type || "image/jpeg",
        });
      }

      if (adarImageUrl) formData.append("adar_image", adarImageUrl);
      certUrls.forEach(url => {
        formData.append("certificates[]", url);
      });

      await dispatch(registerTrainerThunk(formData)).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Trainer Registered Successfully!',
      });

      navigation.reset({ index: 0, routes: [{ name: "ThankYouScreen" }] });

    } catch (err) {
      console.log("REGISTRATION ERROR:", err);
      let errorMessage = "Something went wrong";

      if (typeof err === 'string') {
        errorMessage = err;
      } else if (err?.message && typeof err.message === 'string') {
        errorMessage = err.message;
      } else if (typeof err === 'object') {
        const values = Object.values(err);
        if (values.length > 0) {
          errorMessage = Array.isArray(values[0]) ? values[0][0] : JSON.stringify(values[0]);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create an account</Text>
        </View>

        {/* Profile Row */}
        <View style={styles.profileRow}>
          <TouchableOpacity onPress={handlePickProfileImage}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage.uri }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Ionicons name="camera-outline" size={28} color="#888" />
                <Text style={styles.placeholderText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Enter Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#888"
            style={styles.inputUnderline}
          />
        </View>

        <View style={styles.twoColRow}>
          <View style={styles.iconInputRowSmall}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <TextInput
              placeholder="Enter Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              style={styles.inputFlex}
            />
          </View>

          <View style={styles.iconInputRowSmall}>
            <Ionicons name="call-outline" size={20} color="#666" />
            <TextInput
              placeholder="Ph number"
              placeholderTextColor="#888"
              style={styles.inputFlex}
              value={phno}
              onChangeText={setPhno}
            />
          </View>
        </View>

        <View style={styles.addressInputRow}>
          <TouchableOpacity
            style={styles.dropdownRow}
            onPress={() => setGenderOpen(!genderOpen)}
          >
            <Text style={styles.dropdownText}>{genderValue || 'Gender'}</Text>
            <Ionicons name="chevron-down" size={20} color="#444" />
          </TouchableOpacity>

          {genderOpen && (
            <View style={styles.dropdownList}>
              {['Male', 'Female', 'Other'].map(g => (
                <TouchableOpacity
                  key={g}
                  onPress={() => {
                    setGenderValue(g);
                    setGenderOpen(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownItemText}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.addressInputRow}>
          <TouchableOpacity
            style={styles.dropdownRow}
            onPress={() => setExpertiseOpen(!expertiseOpen)}
          >
            <Text style={styles.dropdownText}>
              {expertiseValue?.plan_name || "Expertise"}            </Text>
            <Ionicons name="chevron-down" size={20} color="#444" />
          </TouchableOpacity>

          {expertiseOpen && (
            <View style={styles.dropdownList}>
              {plans.map(plan => (
                <TouchableOpacity
                  key={plan.id}
                  onPress={() => {
                    setExpertiseValue(plan);
                    setExpertiseOpen(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownItemText}>
                    {plan.plan_name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.iconInputRow}>
          <DOBPicker value={dob} onChange={setDob} />
        </View>

        <View style={styles.iconInputRow}>
          <Ionicons name="document-outline" size={20} color="#666" />

          <TextInput
            placeholder="Aadhaar Number"
            placeholderTextColor="#888"
            style={styles.inputFlex}
            value={aadhaar}
            onChangeText={setAadhaar}
          />

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handlePickAadhaarImage}
          >
            <Ionicons name="cloud-upload-outline" size={18} color="#fff" />
            <Text style={styles.uploadBtnText}>Upload</Text>
          </TouchableOpacity>
        </View>

        {aadhaarImage && (
          <View style={{ marginTop: 10 }}>
            <View style={styles.uploadImageCard}>
              <TouchableOpacity
                style={styles.deleteBadge}
                onPress={() => setAadhaarImage(null)}
              >
                <Ionicons name="close" size={16} color="#ffffff" />
              </TouchableOpacity>

              <Image
                source={{ uri: aadhaarImage.uri }}
                style={styles.uploadPreviewImg}
              />
            </View>
          </View>
        )}


        <TouchableOpacity
          style={styles.useLocationBtn}
          onPress={handleUseLocation}
        >
          <Text style={styles.useLocationText}>Use my location</Text>
        </TouchableOpacity>

        <View style={styles.twoColRow}>
          <TextInput
            placeholder="Enter pincode"
            placeholderTextColor="#888"
            style={styles.inputUnderline}
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="City/Town"
            placeholderTextColor="#888"
            style={styles.inputUnderline}
            value={city}
            onChangeText={setCity}
          />
        </View>

        <View style={styles.addressInputRow}>
          <TextInput
            placeholder="Landmark"
            placeholderTextColor="#888"
            style={styles.inputUnderline}
            value={landmark}
            onChangeText={setLandmark}
          />
          <TextInput
            placeholder="Address"
            placeholderTextColor="#888"
            style={styles.inputUnderline}
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </View>
        <View style={styles.twoColRow}>

          {/* SECTION TIMING */}
          <View style={{ flex: 1, position: "relative" }}>
            <TouchableOpacity
              style={styles.dropdownRow}
              onPress={() => setSectionOpen(!sectionOpen)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  sectionTiming && { color: "#000" }
                ]}
              >
                {sectionTiming ? `${sectionTiming} min` : "Section timing"}
              </Text>
            </TouchableOpacity>

            {sectionOpen && (
              <View style={styles.dropdownList}>
                {["15", "20", "30", "45", "60"].map(t => (
                  <TouchableOpacity
                    key={t}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSectionTiming(t);
                      setSectionOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{t} min</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* EXPERIENCE (WILL NOT MOVE) */}
          <TextInput
            placeholder="Experience (yr)"
            value={experience}
            onChangeText={setExperience}
            keyboardType="numeric"
            style={[styles.inputUnderline, { flex: 1 }]}
          />

        </View>



        <View style={styles.twoColRow}>
          <TextInput
            placeholder="No of session"
            value={sessions}
            onChangeText={setSessions}
            style={styles.inputUnderline}
          />
          <TextInput
            placeholder="Fee / Session"
            value={fee}
            onChangeText={setFee}
            style={styles.inputUnderline}
          />
        </View>
        <View style={styles.addressInputRow}>

          <TextInput
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.inputUnderline}
          />
        </View>
        <View style={styles.uploadContainer}>
          <Text style={styles.uploadTitle}>Upload Certificates </Text>

          <View style={styles.uploadBox}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handlePickImage}
            >
              <Ionicons name="cloud-upload-outline" size={18} color="#fff" />
              <Text style={styles.uploadBtnText}>Upload</Text>
            </TouchableOpacity>
            <Text style={styles.uploadHelper}>Click to choose images</Text>
          </View>

          <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.uploadImagesRow}
  >
    {images.map((item, i) => (
      <View key={i} style={styles.uploadImageCard}>
        <TouchableOpacity
          style={styles.deleteBadge}
          onPress={() => handleRemoveImage(i)}
        >
          <Ionicons name="close" size={16} color="#fff" />
        </TouchableOpacity>

        <Image
          source={{ uri: item.uri }}
          style={styles.uploadPreviewImg}
        />
      </View>
    ))}
  </ScrollView>
        </View>
      </ScrollView>
      {error && (
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      )}

      <View style={styles.footerBtnWrapper}>
        <TouchableOpacity
          style={styles.continueBtn}
          disabled={loading}
          onPress={handleSubmit}
        >
          <Text style={styles.continueText}>
            {loading ? 'Submitting...' : 'Save & Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
