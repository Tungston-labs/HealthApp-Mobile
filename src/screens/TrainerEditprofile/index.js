import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import Geolocation from "react-native-geolocation-service";
import ProfileHeader from "../../components/ProfileHeader";
import BackgroundCurve from "../../components/ProfileHeader/BackgroundCurve";
import { updateTrainerProfileThunk } from "../../redux/slices/trainerProfileSlice";
import styles from "./style";

const GOOGLE_API_KEY = "YOUR_GOOGLE_MAPS_KEY";

const TrainerEditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(state => state.trainerProfile);

  const [form, setForm] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [fetchingLocation, setFetchingLocation] = useState(false);



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


  const OPENCAGE_KEY = "YOUR_OPENCAGE_KEY";

  const useMyLocation = () => {
    if (fetchingLocation) return;

    setFetchingLocation(true);

    Geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords;

          setLatitude(latitude);
          setLongitude(longitude);

          const res = await axios.get(
            "https://api.opencagedata.com/geocode/v1/json",
            {
              params: {
                q: `${latitude},${longitude}`,
                key: OPENCAGE_KEY,
                language: "en",
              },
            }
          );

          if (!res.data.results || res.data.results.length === 0) {
            throw new Error("Address not found");
          }

          const data = res.data.results[0];
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

          Alert.alert("Success", "Location fetched successfully");
        } catch (err) {
          console.log("GEOCODE ERROR:", err);
          // Alert.alert("Error", "Unable to fetch address");
        } finally {
          setFetchingLocation(false);
        }
      },
      error => {
        setFetchingLocation(false);
        Alert.alert("Location error", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      }
    );
  };




  const handleSave = async () => {
    setSaving(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phno", form.phone);
    formData.append("dob", form.dob);
    formData.append("adar_number", form.aadhaar);
    formData.append("location", form.address);
    formData.append("city", form.city);
    formData.append("pincode", form.pincode);
    formData.append("landmark", form.landmark);
    formData.append("location", form.address);

    if (latitude !== null && longitude !== null) {
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
      navigation.goBack();
    } else {
      Alert.alert("Update failed");
    }
  };

  if (!form || loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar barStyle="dark-content" />

      <BackgroundCurve circleMultiplier={3.2} imageCenterY={150} />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
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

              setForm({ ...form, dob: formatted });
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
    </View>
  );
};

export default TrainerEditProfile;
