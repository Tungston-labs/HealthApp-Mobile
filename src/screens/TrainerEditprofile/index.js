import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { showError, showSuccess } from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import ProfileHeader from "../../components/ProfileHeader";
import BackgroundCurve from "../../components/ProfileHeader/BackgroundCurve";
import { updateTrainerProfileThunk } from "../../redux/slices/trainerProfileSlice";
import { getCurrentLocation, checkLocationPermission, requestLocationPermission } from "../../utils/location";
import { reverseGeocodeFull } from "../../utils/reverseGeocode";
import LocationDisclosureModal from "../../components/LocationDisclosureModal";
import styles from "./style";

const TrainerEditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(state => state.trainerProfile);

  const [form, setForm] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [showDisclosureModal, setShowDisclosureModal] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phno || "",
        dob: profile.dob || "",
        aadhaar: profile.adar_number || "",
        pincode: profile.pincode || "",
        city: profile.city || "",
        landmark: profile.landmark || "",
        address: profile.location || "",
      });
      if (profile.latitude !== undefined && profile.latitude !== null) {
        setLatitude(Number(profile.latitude));
      }
      if (profile.longitude !== undefined && profile.longitude !== null) {
        setLongitude(Number(profile.longitude));
      }
    }
  }, [profile]);

  const handleChange = (key, value) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const pickProfileImage = () => {
    launchImageLibrary({ mediaType: "photo", quality: 0.7 }, res => {
      if (res?.assets?.length) {
        setProfileImage(res.assets[0]);
      }
    });
  };

  const fetchLocationData = async () => {
    if (fetchingLocation) return;

    setFetchingLocation(true);

    try {
      const coords = await getCurrentLocation();
      const latitudeVal = Number(coords.latitude.toFixed(6));
      const longitudeVal = Number(coords.longitude.toFixed(6));

      setLatitude(latitudeVal);
      setLongitude(longitudeVal);

      const data = await reverseGeocodeFull(latitudeVal, longitudeVal);
      const components = data.components;

      setForm(prev => ({
        ...prev,
        address: data.formatted,
        city: components.city || components.town || components.village || "",
        pincode: components.postcode || "",
        landmark:
          components.suburb ||
          components.neighbourhood ||
          components.road ||
          "",
      }));

      showSuccess("Success", "Location fetched successfully");
    } catch (err) {
      console.log("GEOCODE ERROR:", err);
      showError("Location error", err.message || "Unable to fetch location");
    } finally {
      setFetchingLocation(false);
    }
  };

  const useMyLocation = async () => {
    const hasPermission = await checkLocationPermission();
    if (hasPermission) {
      fetchLocationData();
    } else {
      setShowDisclosureModal(true);
    }
  };

  const handleAcceptDisclosure = async () => {
    setShowDisclosureModal(false);
    const granted = await requestLocationPermission();
    if (granted) {
      fetchLocationData();
    }
  };

  const handleCancelDisclosure = () => {
    setShowDisclosureModal(false);
  };





  const handleSave = async () => {
    if (!form.name || form.name.trim().length < 3) {
      showError("Validation Error", "Please enter a valid name (at least 3 characters)");
      return;
    }
    if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone)) {
      showError("Validation Error", "Please enter a valid 10 digit phone number");
      return;
    }
    if (!form.dob || !/^\d{4}-\d{2}-\d{2}$/.test(form.dob)) {
      showError("Validation Error", "Please enter a valid Date of Birth (YYYY-MM-DD)");
      return;
    }
    if (!form.aadhaar || !/^\d{12}$/.test(form.aadhaar)) {
      showError("Validation Error", "Aadhaar must be exactly 12 digits");
      return;
    }
    if (!form.pincode || form.pincode.trim().length < 6) {
      showError("Validation Error", "Please enter a valid pincode");
      return;
    }
    if (!form.city || form.city.trim().length < 2) {
      showError("Validation Error", "Please enter a valid city");
      return;
    }
    if (!form.address || form.address.trim().length < 5) {
      showError("Validation Error", "Please enter a valid address");
      return;
    }

    setSaving(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phno", form.phone);
    formData.append("dob", form.dob);
    formData.append("adar_number", form.aadhaar);
    formData.append("city", form.city);
    formData.append("pincode", form.pincode);
    formData.append("landmark", form.landmark);
    formData.append("location", form.address);

    if (latitude !== null && longitude !== null && !isNaN(latitude) && !isNaN(longitude)) {
      formData.append("latitude", latitude.toFixed(6));
      formData.append("longitude", longitude.toFixed(6));
    }


    if (profileImage) {
      formData.append("profile_pic", {
        uri: profileImage.uri,
        name: "profile.jpg",
        type: profileImage.type || "image/jpeg",
      });
    }

    const res = await dispatch(updateTrainerProfileThunk(formData));
    setSaving(false);

    if (!res.error) {
      showSuccess("Success", "Profile updated successfully");
      navigation.goBack();
    } else {
      showError("Update failed");
    }
  };

  if (!form || loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar barStyle="dark-content" />

      <BackgroundCurve circleMultiplier={3.2} imageCenterY={150} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={styles.scrollContent}
        >

          <ProfileHeader
            image={
              profileImage
                ? { uri: profileImage.uri }
                : profile?.profile_pic_url
                  ? { uri: profile.profile_pic_url }
                  : require("../../../assets/trainer2.jpg")
            }
            name="Edit Profile"
            showBack
            showEdit
            onEdit={pickProfileImage}
            onBack={() => navigation.goBack()}
          />


          <View style={styles.formWrapper}>

            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={form.name}
              onChangeText={v => handleChange("name", v)}
            />

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={form.email} editable={false} />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  style={styles.input}
                  value={form.phone}
                  onChangeText={v => handleChange("phone", v)}
                />
              </View>
            </View>

            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              value={form.dob}
              placeholder="YYYY-MM-DD"
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={(text) => {
                // Remove non-numeric characters
                let cleaned = text.replace(/\D/g, "");

                let formatted = cleaned;

                if (cleaned.length > 4 && cleaned.length <= 6) {
                  formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
                }
                else if (cleaned.length > 6) {
                  formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6, 8)}`;
                }

                handleChange("dob", formatted);
              }}
            />

            <Text style={styles.label}>Aadhaar</Text>
            <TextInput
              style={styles.input}
              value={form.aadhaar}
              onChangeText={v => handleChange("aadhaar", v)}
            />

            <TouchableOpacity
              style={[
                styles.locationBtn,
                fetchingLocation && { opacity: 0.6 }
              ]}
              onPress={useMyLocation}
              disabled={fetchingLocation}
            >
              <Text style={styles.locationText}>
                {fetchingLocation ? "Fetching location..." : "Use my location"}
              </Text>
            </TouchableOpacity>


            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Pincode</Text>
                <TextInput
                  style={styles.input}
                  value={form.pincode}
                  onChangeText={v => handleChange("pincode", v)}
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.input}
                  value={form.city}
                  onChangeText={v => handleChange("city", v)}
                />
              </View>
            </View>

            <Text style={styles.label}>Landmark</Text>
            <TextInput
              style={styles.input}
              value={form.landmark}
              onChangeText={v => handleChange("landmark", v)}
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={form.address}
              onChangeText={v => handleChange("address", v)}
            />

            <View style={styles.saveWrapper}>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSave}
                disabled={saving}
              >
                <Text style={styles.saveText}>
                  {saving ? "Saving..." : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <LocationDisclosureModal
        visible={showDisclosureModal}
        onAccept={handleAcceptDisclosure}
        onCancel={handleCancelDisclosure}
      />
    </View>
  );
};


export default TrainerEditProfile;
