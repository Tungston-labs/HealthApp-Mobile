import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style";

export default function CreateAccountScreen({ navigation }) {
  const [images, setImages] = useState([1, 2, 3]);

  // NEW STATES FOR DROPDOWNS
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState("");

  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const [expertiseValue, setExpertiseValue] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back + Title */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create an account</Text>
        </View>

        {/* Profile Row */}
        <View style={styles.profileRow}>
          <Image
            source={require("../../Images/profile.png")}
            style={styles.profileImage}
          />
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="#888"
            style={styles.inputUnderline}
          />
        </View>

        {/* EMAIL + PHONE ON SAME ROW */}
        <View style={styles.twoColRow}>
          <View style={styles.iconInputRowSmall}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <TextInput
              placeholder="Enter Email"
              placeholderTextColor="#888"
              style={styles.inputFlex}
            />
          </View>

          <View style={styles.iconInputRowSmall}>
            <Ionicons name="call-outline" size={20} color="#666" />
            <TextInput
              placeholder="Ph number"
              placeholderTextColor="#888"
              style={styles.inputFlex}
            />
          </View>
        </View>

        {/* GENDER DROPDOWN */}
        <View>
          <TouchableOpacity
            style={styles.dropdownRow}
            onPress={() => setGenderOpen(!genderOpen)}
          >
            <Text style={styles.dropdownText}>
              {genderValue || "Gender"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#444" />
          </TouchableOpacity>

          {genderOpen && (
            <View style={styles.dropdownList}>
              {["Male", "Female", "Other"].map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => {
                    setGenderValue(g);
                    setGenderOpen(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownItemText}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* EXPERTISE DROPDOWN */}
        <View>
          <TouchableOpacity
            style={styles.dropdownRow}
            onPress={() => setExpertiseOpen(!expertiseOpen)}
          >
            <Text style={styles.dropdownText}>
              {expertiseValue || "Expertise"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#444" />
          </TouchableOpacity>

          {expertiseOpen && (
            <View style={styles.dropdownList}>
              {["Cycling", "Gym", "Zumba", "Swimming", "Boxing"].map((ex) => (
                <TouchableOpacity
                  key={ex}
                  onPress={() => {
                    setExpertiseValue(ex);
                    setExpertiseOpen(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownItemText}>{ex}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* REST OF YOUR CODE — UNTOUCHED */}
        <View style={styles.iconInputRow}>
          <Ionicons name="calendar-outline" size={20} color="#666" />
          <TextInput
            placeholder="Date of Birth"
            placeholderTextColor="#888"
            style={styles.inputFlex}
          />
        </View>

        <View style={styles.iconInputRow}>
          <Ionicons name="id-card-outline" size={20} color="#666" />
          <TextInput
            placeholder="Aadhaar Number"
            placeholderTextColor="#888"
            style={styles.inputFlex}
          />
        </View>

        <TouchableOpacity style={styles.useLocationBtn}>
          <Text style={styles.useLocationText}>Use my location</Text>
        </TouchableOpacity>

        <View style={styles.twoColRow}>
          <TextInput
            placeholder="Enter pincode"
            placeholderTextColor="#888"
            style={styles.inputUnderline}
          />
          <TextInput
            placeholder="City/Town"
            placeholderTextColor="#888"
            style={styles.inputUnderline}
          />
        </View>

        <TextInput placeholder="Landmark" style={styles.inputUnderline} />
        <TextInput placeholder="Address" style={styles.inputUnderline} />

        <View style={styles.twoColRow}>
          <TextInput placeholder="Section timing" style={styles.inputUnderline} />
          <TextInput placeholder="Experience ( yr )" style={styles.inputUnderline} />
        </View>

        <View style={styles.twoColRow}>
          <TextInput placeholder="No of session" style={styles.inputUnderline} />
          <TextInput placeholder="Fee / Session" style={styles.inputUnderline} />
        </View>

        <TextInput
          placeholder="Enter password"
          secureTextEntry
          style={styles.inputUnderline}
        />

        {/* Upload Section */}
        <View style={styles.uploadContainer}>
          <Text style={styles.uploadTitle}>Upload Certificates & Aadhar</Text>

          <View style={styles.uploadBox}>
            <TouchableOpacity style={styles.uploadButton}>
              <Ionicons name="cloud-upload-outline" size={18} color="#fff" />
              <Text style={styles.uploadBtnText}>Upload</Text>
            </TouchableOpacity>
            <Text style={styles.uploadHelper}>Click to choose it here</Text>
          </View>

          <View style={styles.uploadImagesRow}>
            {images.map((item, i) => (
              <View key={i} style={styles.uploadImageCard}>
                <TouchableOpacity style={styles.deleteBadge}>
                  <Ionicons name="close" size={16} color="#fff" />
                </TouchableOpacity>
                <Image
                  source={require("../../Images/male.png")}
                  style={styles.uploadPreviewImg}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* ✔️ THIS IS THE ONLY CHANGE */}
      <View style={styles.footerBtnWrapper}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate("ThankYouScreen")}
        >
          <Text style={styles.continueText}>Save & Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
