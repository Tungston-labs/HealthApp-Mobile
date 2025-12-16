import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

export default function SignupDetailsScreenUser() {
  const [showLocationFields, setShowLocationFields] = useState(true);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingBottom: 120,
        }}
      >
        <Text style={styles.welcomeText}>Welcome to health app</Text>
        <Text style={styles.subtitle}>Enter basic details</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="#999"
        />

        <View style={styles.inputRow}>
          <Ionicons name="mail-outline" size={18} color="#777" />
          <TextInput
            style={styles.inputField}
            placeholder="Enter Email"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputRow}>
          <Ionicons name="call-outline" size={18} color="#777" />
          <TextInput
            style={styles.inputField}
            placeholder="phone"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.locationRow}>
          <View style={styles.locationLeft}>
            <Ionicons name="location-outline" size={20} color="#777" />
            <TouchableOpacity onPress={() => setShowLocationFields(true)}>
              <Text style={styles.locationText}>
                {showLocationFields ? "Use my location" : "Get my location"}
              </Text>
            </TouchableOpacity>
          </View>

          {showLocationFields && (
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => setShowLocationFields(false)}
            >
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {showLocationFields && (
          <>
            <View style={styles.locationInputsRow}>
              <TextInput
                style={[styles.input, styles.smallInput]}
                placeholder="Enter pincode"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />

              <TextInput
                style={[styles.input, styles.smallInput]}
                placeholder="City/Town"
                placeholderTextColor="#999"
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Landmark"
              placeholderTextColor="#999"
            />

            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="#999"
            />
          </>
        )}

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.backLogin}>Back to Log in</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.continueFixed}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate("MainWizardScreen")}   
        >
          <Text style={styles.continueText}>Continue</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#fff"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

