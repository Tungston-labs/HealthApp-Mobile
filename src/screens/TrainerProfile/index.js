import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import { useFocusEffect } from "@react-navigation/native";

import ProfileHeader from "../../components/ProfileHeader";
import BackgroundCurve from "../../components/ProfileHeader/BackgroundCurve";
import CommonActionModal from "../../components/ModalComponents";

import { logoutThunk } from "../../redux/slices/authSlice";
import {
  fetchTrainerProfileThunk,
  updateTrainerProfileThunk,
} from "../../redux/slices/trainerProfileSlice";

import styles from "./style";

const ProfileScreenTrainer = ({ navigation }) => {
  const dispatch = useDispatch();

  /* 🔹 AUTH USER */
  const { user } = useSelector(state => state.auth);

  /* 🔹 TRAINER PROFILE STATE */
  const { profile, loading, updated } = useSelector(
    state => state.trainerProfile
  );

  const [profileImage, setProfileImage] = useState(
    require("../../../assets/trainer2.jpg")
  );
  const [logoutVisible, setLogoutVisible] = useState(false);

  /* 🔹 FETCH PROFILE (ON FOCUS) */
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchTrainerProfileThunk());
    }, [])
  );

  /* 🔹 UPDATE LOCAL IMAGE WHEN PROFILE CHANGES */
  useEffect(() => {
    if (profile?.profile_pic_url) {
      setProfileImage({ uri: profile.profile_pic_url });
    }
  }, [profile]);

  /* 🔹 REFETCH AFTER SUCCESSFUL UPDATE */
  useEffect(() => {
    if (updated) {
      dispatch(fetchTrainerProfileThunk());
    }
  }, [updated]);

  /* 🔹 PICK IMAGE + UPLOAD */
  const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.7,
      },
      response => {
        if (response?.assets?.length) {
          const asset = response.assets[0];

          // 🔥 Optimistic UI update
          setProfileImage({ uri: asset.uri });

          // 🔥 FormData for PATCH
          const formData = new FormData();
          formData.append("profile_pic", {
            uri: asset.uri,
            name: asset.fileName || "profile.jpg",
            type: asset.type || "image/jpeg",
          });

          dispatch(updateTrainerProfileThunk(formData));
        }
      }
    );
  };

  /* 🔹 LOGOUT */
  const handleLogout = async () => {
    setLogoutVisible(false);
    await dispatch(logoutThunk());

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar barStyle="dark-content" />

      <BackgroundCurve circleMultiplier={3.2} imageCenterY={150} />

      <ScrollView style={styles.container}>
        <ProfileHeader
          image={profileImage}
          name={profile?.name || "Trainer"}
          showBack={false}
          showEdit
          onEdit={handlePickImage}
        />

        <View style={styles.optionsWrapper}>
          {/* EDIT PROFILE */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              navigation.navigate("TrainerEditProfile", {
                trainerId: profile?.id,
              })
            }
          >
            <Icon name="person-outline" size={20} color="#111" />
            <Text style={styles.optionText}>Edit profile</Text>
          </TouchableOpacity>

          {/* TERMS */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("TermsAndConditions")}
          >
            <Icon name="document-text-outline" size={20} color="#111" />
            <Text style={styles.optionText}>Terms and Conditions</Text>
          </TouchableOpacity>

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.logoutRow}
            onPress={() => setLogoutVisible(true)}
          >
            <Icon name="log-out" size={20} color="#E2574C" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CommonActionModal
        visible={logoutVisible}
        onClose={() => setLogoutVisible(false)}
        onConfirm={handleLogout}
        description="Are you sure you want to log out?"
        cancelText="Cancel"
        confirmText="Log Out"
        illustration={require("../../../assets/logout.png")}
      />
    </View>
  );
};

export default ProfileScreenTrainer;
