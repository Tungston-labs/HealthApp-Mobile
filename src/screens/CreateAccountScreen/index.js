import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { getCurrentLocation } from '../../utils/location';
import { reverseGeocode } from '../../utils/reverseGeocode';
import { useDispatch, useSelector } from 'react-redux';
import { registerTrainerThunk } from '../../redux/slices/trainerRegistrationSlice';

import { launchImageLibrary } from 'react-native-image-picker';
import DOBPicker from './DOBPicker';
import { uploadImageApi } from '../../services/trainerServices';
export default function CreateAccountScreen({ navigation }) {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(state => state.trainerReg);
const [isUploading, setIsUploading] = useState(false);  const [name, setName] = useState('');
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

  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const [expertiseValue, setExpertiseValue] = useState('');
  const expertiseMap = {
    Cycling: 1,
    Gym: 2,
    Zumba: 3,
    Swimming: 4,
    Boxing: 5,
  };
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

  const handleUseLocation = async () => {
    try {
      const coords = await getCurrentLocation();
      const address = await reverseGeocode(coords.latitude, coords.longitude);

      setLocation(address);

      alert(' Location fetched successfully');
      console.log(' Location:', address);
    } catch (err) {
      console.log(' Location error:', err);
      alert('Unable to fetch location. Please try again.');
    }
  };
  const handlePickImage = () => {
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
  try {
    if (!profileImage || !aadhaarImage || images.length === 0) {
      alert("Please select all images first.");
      return;
    }

    setIsUploading(true); 

    console.log("Starting image uploads...");
    
    const profilePicUrl = await uploadImageApi(profileImage);
    const adarImageUrl = await uploadImageApi(aadhaarImage);
    
    const certificateUrls = await Promise.all(
      images.map(img => uploadImageApi(img))
    );

    // STEP 2: Prepare Final Data
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email.toLowerCase().trim());
    formData.append("phno", phno);
    formData.append("dob", dob);
    formData.append("gender", genderValue.toLowerCase());
    
    formData.append("training_field", expertiseMap[expertiseValue]); 
    
    const formattedTiming = sectionTiming.split(' ')[0];
    formData.append("section_timing", formattedTiming); 

    formData.append("location", location);
    formData.append("expecting_salary", fee);
    formData.append("no_of_section", sessions);
    formData.append("adar_number", aadhaar);
    formData.append("experience", experience);
    formData.append("password", password);

    formData.append("profile_pic", profilePicUrl); 
    formData.append("adar_image", adarImageUrl);
    
    certificateUrls.forEach(url => {
      formData.append("certificates", url);
    });

    console.log("Image uploads complete. Sending registration...");

    await dispatch(registerTrainerThunk(formData)).unwrap();
    
    alert("Trainer registered successfully 🎉");
  } catch (error) {
    console.log("REGISTRATION FAILED:", error);
    alert("Error: " + (error.message || "Something went wrong"));
  } finally {
    setIsUploading(false); 
  }
};




  useEffect(() => {
    if (success) {
      navigation.navigate('ThankYouScreen');
    }
  }, [success, navigation]);

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

        <View>
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

        <View>
          <TouchableOpacity
            style={styles.dropdownRow}
            onPress={() => setExpertiseOpen(!expertiseOpen)}
          >
            <Text style={styles.dropdownText}>
              {expertiseValue || 'Expertise'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#444" />
          </TouchableOpacity>

          {expertiseOpen && (
            <View style={styles.dropdownList}>
              {['Cycling', 'Gym', 'Zumba', 'Swimming', 'Boxing'].map(ex => (
                <TouchableOpacity
                  key={ex}
                  onPress={() => {
                    setExpertiseValue(ex);
                    setExpertiseOpen(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownItemText}>{ex}</Text>
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
        <Ionicons name="close" size={16} color="#fff" />
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
          />
          <TextInput
            placeholder="City/Town"
            placeholderTextColor="#888"
            style={styles.inputUnderline}
          />
        </View>

        <TextInput placeholder="Landmark" style={styles.inputUnderline} />
        <TextInput
          placeholder="Address"
          value={location}
          onChangeText={setLocation}
          style={styles.inputUnderline}
        />

        <View style={styles.twoColRow}>
          <TextInput
            placeholder="Section timing"
            value={sectionTiming}
            onChangeText={setSectionTiming}
            style={styles.inputUnderline}
          />
          <TextInput
            placeholder="Experience ( yr )"
            value={experience}
            onChangeText={setExperience}
            style={styles.inputUnderline}
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

        <TextInput
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.inputUnderline}
        />

        {/* Upload Section */}
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

          <View style={styles.uploadImagesRow}>
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
          </View>
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
