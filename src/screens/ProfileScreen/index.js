import React, { useState, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";

import ProfileHeader from "../../components/ProfileHeader";
import BackgroundCurve from "../../components/ProfileHeader/BackgroundCurve";
import CommonActionModal from "../../components/ModalComponents";

import { logoutThunk } from "../../redux/slices/authSlice";
import { fetchMobProfileThunk } from "../../redux/slices/mobProfileSlice";

import styles from "./styles";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  /* 🔹 CLIENT PROFILE STATE */
  const { profile, loading } = useSelector(
    state => state.mobProfile
  );

  const [logoutVisible, setLogoutVisible] = useState(false);

  /* 🔹 REFRESH PROFILE ON SCREEN FOCUS */
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchMobProfileThunk());
    }, [dispatch])
  );

  /* 🔹 LOGOUT */
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

        {/* 🔹 LOADER (DO NOT RETURN EARLY) */}
        {loading && (
          <ActivityIndicator
            size="large"
            style={{ marginVertical: 30 }}
          />
        )}

        {/* 🔹 PROFILE HEADER */}
        <ProfileHeader
          image={profile?.profile_pic_url}
          name={profile?.name || "Client"}
          showBack={false}
          showEdit={false}
        />

        <View style={styles.optionsWrapper}>

          {/* 🔹 EDIT PROFILE */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              navigation.navigate("EditProfile", {
                profileData: profile,   // ✅ always fresh
              })
            }
          >
            <Icon name="person-outline" size={20} />
            <Text style={styles.optionText}>Edit profile</Text>
          </TouchableOpacity>

          {/* 🔹 TERMS */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("UserTermsAndConditions")}
          >
            <Icon name="document-text-outline" size={20} />
            <Text style={styles.optionText}>Terms and Conditions</Text>
          </TouchableOpacity>

          {/* 🔹 LOGOUT */}
          <TouchableOpacity
            style={styles.logoutRow}
            onPress={() => setLogoutVisible(true)}
          >
            <Icon name="log-out" size={20} color="#E2574C" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* 🔹 LOGOUT MODAL */}
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