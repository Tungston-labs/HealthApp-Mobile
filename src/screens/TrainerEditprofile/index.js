import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import ProfileHeader from "../../components/ProfileHeader";
import styles from "./style";
import BackgroundCurve from "../../components/ProfileHeader/BackgroundCurve";

const TrainerEditProfile = ({ navigation }) => {
  const userImg = require("../../../assets/trainer2.jpg");

  const [form, setForm] = useState({
    name: "Dummy Dummy",
    email: "Dummy@gmail.com",
    phone: "62389450215",
    dob: "11-11-2025",
    aadhaar: "0000000000000000",
    pincode: "682500",
    city: "682500",
    landmark: "Lake Annaliesemouth",
    address: "29250 Elsie Trafficway, West Forestmouth 58892-3171",
  });

  const handleChange = (key, value) =>
    setForm({ ...form, [key]: value });

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#FFFFFF",
        }}
      />

      <BackgroundCurve circleMultiplier={3.2} imageCenterY={150} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ProfileHeader
          image={userImg}
          name="Edit Profile"
          showBack
          onBack={() => navigation.goBack()}
        />

        <View style={styles.formWrapper}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(v) => handleChange("name", v)}
          />
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>E-mail ID</Text>
              <TextInput
                style={styles.input}
                value={form.email}
                onChangeText={(v) => handleChange("email", v)}
              />
            </View>

            <View style={styles.col}>
              <Text style={styles.label}>Ph Number</Text>
              <TextInput
                style={styles.input}
                value={form.phone}
                onChangeText={(v) => handleChange("phone", v)}
              />
            </View>
          </View>

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={form.dob}
            onChangeText={(v) => handleChange("dob", v)}
          />


          <Text style={styles.label}>Aadhaar Number</Text>
          <TextInput
            style={styles.input}
            value={form.aadhaar}
            onChangeText={(v) => handleChange("aadhaar", v)}
          />


          <TouchableOpacity style={styles.locationBtn}>
            <Text style={styles.locationText}>Use my location</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Pin code</Text>
              <TextInput
                style={styles.input}
                value={form.pincode}
                onChangeText={(v) => handleChange("pincode", v)}
              />
            </View>

            <View style={styles.col}>
              <Text style={styles.label}>City/Town</Text>
              <TextInput
                style={styles.input}
                value={form.city}
                onChangeText={(v) => handleChange("city", v)}
              />
            </View>
          </View>

          <Text style={styles.label}>Landmark</Text>
          <TextInput
            style={styles.input}
            value={form.landmark}
            onChangeText={(v) => handleChange("landmark", v)}
          />

         
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={form.address}
            onChangeText={(v) => handleChange("address", v)}
          />

          <View style={styles.saveWrapper}>
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TrainerEditProfile;
