import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileHeader from "../../components/ProfileHeader";
import styles from "./style";

import { launchImageLibrary } from "react-native-image-picker";

// Curve
import BackgroundCurve from "../../components/ProfileHeader/BackgroundCurve";

// Modal
import CommonActionModal from "../../components/ModalComponents";

const ProfileScreenTrainer = ({ navigation }) => {
  const userImg = require("../../../assets/trainer2.jpg");
  const [profileImage, setProfileImage] = useState(userImg);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.7,
        maxWidth: 500,
        maxHeight: 500,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) return console.log(response.errorMessage);

        if (response.assets?.length > 0) {
          setProfileImage({ uri: response.assets[0].uri });
        }
      }
    );
  };

  const handleLogout = () => {
    setLogoutVisible(false);

    navigation.replace("Login");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <BackgroundCurve circleMultiplier={3.2} imageCenterY={150} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: 0 }}>
        <ProfileHeader
          image={profileImage}
          name="Peter Tarka"
          showBack={false}
          showEdit={true}
          onEdit={handlePickImage}
        />

        <View style={styles.optionsWrapper}>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("EditProfile")}
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
        iconName={null}
        description="Are you sure you want to log out?"
        cancelText="Cancel"
        confirmText="Log Out"
        showDropdown={false}
        showNote={false}
        illustration={require("../../../assets/logout.png")}
      />
    </View>
  );
};

export default ProfileScreenTrainer;
