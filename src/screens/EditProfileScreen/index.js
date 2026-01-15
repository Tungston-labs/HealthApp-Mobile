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
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";

import ProfileHeader from "../../components/ProfileHeader";
import BackgroundCurve from "../../components/ProfileHeader/BackgroundCurve";
import styles from "./styles";

import {
  updateProfileThunk,
  resetProfileEditState,
} from "../../redux/slices/clientProfileEditSlice";

const EditProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const { profileData } = route.params || {};

  const { loading, error } = useSelector(state => state.profileEdit);

  /* ---------------- FORM STATE ---------------- */
  const [form, setForm] = useState({
    name: "",
    dob: "",
    blood: "",
    weight: "",
    height: "",
    address: "",
    condition: "",
    goal: "",
  });

  const [profilePic, setProfilePic] = useState(null);

  /* ---------------- PREFILL ---------------- */
  useEffect(() => {
    if (profileData) {
      setForm({
        name: profileData.name || "",
        dob: profileData.dob || "",
        blood: profileData.blood_group || "",
        weight: profileData.weight?.toString() || "",
        height: profileData.height?.toString() || "",
        address: profileData.address || "",
        condition: Array.isArray(profileData.health_issues)
          ? profileData.health_issues.join(", ")
          : "",
        goal: Array.isArray(profileData.wellness_goal)
          ? profileData.wellness_goal.join(", ")
          : "",
      });
    }
  }, [profileData]);

  /* ---------------- IMAGE PICKER ---------------- */
  const pickImage = () => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.8 },
      response => {
        if (response.didCancel || response.errorCode) return;
        setProfilePic(response.assets[0]);
      }
    );
  };
  const handleUseLocation = async () => {
    try {
      const coords = await getCurrentLocation(); // { latitude, longitude }
      const fullAddress = await reverseGeocode(coords.latitude, coords.longitude);

      setForm(prev => ({ ...prev, address: fullAddress }));
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);

      Alert.alert("Success", "Location fetched successfully!");
    } catch (err) {
      console.log("Location fetch error:", err);
      Alert.alert("Error", "Unable to fetch location. Please try again.");
    }
  };


  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("dob", form.dob);
    formData.append("blood_group", form.blood);
    formData.append("weight", form.weight);
    formData.append("height", form.height);
    formData.append("address", form.address);
    if (latitude && longitude) {
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
    }
    formData.append(
      "health_issues",
      JSON.stringify(
        form.condition
          ? form.condition.split(",").map(i => i.trim())
          : []
      )
    );




    formData.append(
      "wellness_goal",
      JSON.stringify(
        form.goal
          ? form.goal.split(",").map(i => i.trim())
          : []
      )
    );

    if (profilePic) {
      formData.append("profile_pic", {
        uri: profilePic.uri,
        type: profilePic.type,
        name: profilePic.fileName || "profile.jpg",
      });
    }

    const res = await dispatch(updateProfileThunk(formData));

    if (res.meta.requestStatus === "fulfilled") {
      Alert.alert("Success", "Profile updated successfully");
      dispatch(resetProfileEditState());
      navigation.goBack();
    }
  };

  /* ---------------- ERROR ---------------- */
  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
      dispatch(resetProfileEditState());
    }
  }, [error]);

  /* ---------------- IMAGE SOURCE ---------------- */
  const imageSource = profilePic
    ? { uri: profilePic.uri }
    : profileData?.profile_pic_url
      ? { uri: profileData.profile_pic_url }
      : require("../../../assets/trainer2.jpg");

  /* ---------------- UI ---------------- */
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar barStyle="dark-content" />

      <BackgroundCurve circleMultiplier={3.2} imageCenterY={150} />

      <ScrollView style={styles.container}>
        {/* ✅ WORKING PROFILE HEADER */}
        <ProfileHeader
          image={imageSource}
          name={form.name}
          showBack
          onBack={() => navigation.goBack()}
          showEdit
          onEdit={pickImage}   // 🔥 THIS IS THE FIX
        />

        {/* FORM */}
        <View style={styles.formWrapper}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={v => setForm({ ...form, name: v })}
          />

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={form.dob}
            onChangeText={v => setForm({ ...form, dob: v })}
          />

          <Text style={styles.label}>Blood Group</Text>
          <TextInput
            style={styles.input}
            value={form.blood}
            onChangeText={v => setForm({ ...form, blood: v })}
          />

          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.weight}
            onChangeText={v => setForm({ ...form, weight: v })}
          />

          <Text style={styles.label}>Height</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.height}
            onChangeText={v => setForm({ ...form, height: v })}
          />
          <TouchableOpacity style={styles.locationBtn} onPress={handleUseLocation}>
            <Text style={styles.locationText}>Use my location</Text>
          </TouchableOpacity>


          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={form.address}
            onChangeText={v => setForm({ ...form, address: v })}
          />

          <Text style={styles.label}>Health Condition</Text>
          <TextInput
            style={styles.input}
            value={form.condition}
            onChangeText={v => setForm({ ...form, condition: v })}
          />

          <Text style={styles.label}>Wellness Goal</Text>
          <TextInput
            style={styles.input}
            value={form.goal}
            onChangeText={v => setForm({ ...form, goal: v })}
          />

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.saveText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
