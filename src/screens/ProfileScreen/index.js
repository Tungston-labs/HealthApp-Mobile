import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";

import ProfileHeader from "../../components/ProfileHeader";
import BackgroundCurve from "../../components/ProfileHeader/BackgroundCurve";
import CommonActionModal from "../../components/ModalComponents";

import { logoutThunk } from "../../redux/slices/authSlice";
import styles from "./styles";

import { launchImageLibrary } from "react-native-image-picker";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const userImg = require("../../../assets/trainer2.jpg");
  const [profileImage, setProfileImage] = useState(userImg);
  const [logoutVisible, setLogoutVisible] = useState(false);

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

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" />

      <BackgroundCurve circleMultiplier={3.2} imageCenterY={150} />

      <ScrollView style={styles.container}>
        <ProfileHeader
          image={profileImage}
          name="Peter Tarka"
          showBack={false}
          showEdit
          onEdit={handlePickImage}
        />

        <View style={styles.optionsWrapper}>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Icon name="person-outline" size={20} />
            <Text style={styles.optionText}>Edit profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("UserTermsAndConditions")}
          >
            <Icon name="document-text-outline" size={20} />
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
        confirmText="Log Out"
        cancelText="Cancel"
        illustration={require("../../../assets/logout.png")}
      />
    </View>
  );
};

export default ProfileScreen;
