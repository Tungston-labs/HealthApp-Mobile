import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import { useFocusEffect } from "@react-navigation/native";

import ProfileHeader from "../../components/ProfileHeader";
import BackgroundCurve from "../../components/ProfileHeader/BackgroundCurve";
import CommonActionModal from "../../components/ModalComponents";
import Skeleton from "../../components/Skelton";

import { logoutThunk } from "../../redux/slices/authSlice";
import { fetchTrainerProfileThunk } from "../../redux/slices/trainerProfileSlice";

import styles from "./style";

const ProfileScreenTrainer = ({ navigation }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  const { profile, loading } = useSelector(
    state => state.trainerProfile
  );

  const [profileImage, setProfileImage] = useState(
    require("../../../assets/trainer2.jpg")
  );
  const [logoutVisible, setLogoutVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        dispatch(fetchTrainerProfileThunk(user.id));
      }
    }, [user?.id])
  );

  useEffect(() => {
    if (profile?.profile_pic_url) {
      setProfileImage({ uri: profile.profile_pic_url });
    }
  }, [profile]);

  const handlePickImage = () => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.7 },
      response => {
        if (response?.assets?.length) {
          setProfileImage({ uri: response.assets[0].uri });
        }
      }
    );
  };

  const handleLogout = async () => {
    setLogoutVisible(false);
    await dispatch(logoutThunk());

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <StatusBar barStyle="dark-content" />

        <BackgroundCurve circleMultiplier={3.2} imageCenterY={150} />

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          
          <Skeleton
            height={120}
            width={120}
            borderRadius={60}
            style={{ alignSelf: "center", marginTop: 40 }}
          />

          <Skeleton
            height={20}
            width={160}
            borderRadius={6}
            style={{ alignSelf: "center", marginTop: 16 }}
          />

          <View style={styles.optionsWrapper}>
            <Skeleton height={48} borderRadius={12} />
            <Skeleton height={48} borderRadius={12} />
            <Skeleton height={48} borderRadius={12} />
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar barStyle="dark-content" />

      <BackgroundCurve circleMultiplier={3.2} imageCenterY={150} />

      <ScrollView style={styles.container}>
        <ProfileHeader
          image={profile?.profile_pic_url}
          name={profile?.name || "Trainer"}
          showBack={false}
          showEdit
          onEdit={handlePickImage}
        />

        <View style={styles.optionsWrapper}>
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

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("TermsAndConditions")}
          >
            <Icon name="document-text-outline" size={20} color="#111" />
            <Text style={styles.optionText}>Terms and Conditions</Text>
          </TouchableOpacity>

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
