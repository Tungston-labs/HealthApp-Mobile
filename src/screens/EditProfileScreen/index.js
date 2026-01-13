
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileHeader from "../../components/ProfileHeader";
import styles from "./styles";
import BackgroundCurve from "../../components/ProfileHeader/BackgroundCurve";

const EditProfile = ({ navigation }) => {
  const userImg = require("../../../assets/trainer2.jpg");

  const [form, setForm] = useState({
    name: "Dummy@gmail.com",
    email: "Dummy@gmail.com",
    phone: "62389450215",
    dob: "11-11-2025",
    blood: "AB+",
    weight: "56",
    height: "56",
    pincode: "682500",
    city: "682500",
    landmark: "Lake Annaliesemouth",
    address: "29250 Elsie Trafficway, West Forestmouth 58892-3171",
    condition: "asdasdnsand",
    goal: "Reduce stress",
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

      <ScrollView style={styles.container}>
        <ProfileHeader
          image={userImg}
          name=""
          showBack
          onBack={() => navigation.goBack()}
        />

        <View style={styles.optionsWrapper}>
          <View style={styles.formWrapper}>

            {/* Name */}
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={form.name}
              onChangeText={(v) => handleChange("name", v)}
            />

            {/* Email + Phone */}
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

        
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Date of Birth</Text>
                <TextInput
                  style={styles.input}
                  value={form.dob}
                  onChangeText={(v) => handleChange("dob", v)}
                />
              </View>

              <View style={styles.col}>
                <Text style={styles.label}>Blood Group</Text>
                <TextInput
                  style={styles.input}
                  value={form.blood}
                  onChangeText={(v) => handleChange("blood", v)}
                />
              </View>
            </View>


            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Weight in KG</Text>
                <TextInput
                  style={styles.input}
                  value={form.weight}
                  onChangeText={(v) => handleChange("weight", v)}
                />
              </View>

              <View style={styles.col}>
                <Text style={styles.label}>Height in CM</Text>
                <TextInput
                  style={styles.input}
                  value={form.height}
                  onChangeText={(v) => handleChange("height", v)}
                />
              </View>
            </View>

          
            <TouchableOpacity style={styles.locationBtn}>
              <Text style={styles.locationText}>Use my location</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={form.address}
              onChangeText={(v) => handleChange("address", v)}
            />

            <Text style={styles.label}>Have any (Health condition / injury)</Text>
            <View style={styles.chipInput}>
              <Text style={styles.chipText}>{form.condition}</Text>
              <Icon name="close" size={18} color="#999" />
            </View>

            <Text style={styles.label}>Wellness Goal</Text>
            <View style={styles.chipInput}>
              <Text style={styles.chipText}>{form.goal}</Text>
              <Icon name="close" size={18} color="#999" />
            </View>

            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
