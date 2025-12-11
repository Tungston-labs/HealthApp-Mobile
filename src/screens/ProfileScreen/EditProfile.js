import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import FormInput from "../../components/FormInput";
import ProfileHeaderCard from "../../components/ProfileHeader";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const EditProfile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("Dummy@gmail.com");
  const [email, setEmail] = useState("Dummy@gmail.com");
  const [phone, setPhone] = useState("62389450215");

  return (
    <ScrollView style={styles.container}>
      <ProfileHeaderCard
        name={name}
        profileImage={require("../../../assets/trainer2.jpg")}
        showEdit={true}
        onEditPress={() => console.log("Change image")}
      />

      <FormInput label="Name" value={name} onChangeText={setName} />
      <FormInput label="Email" value={email} onChangeText={setEmail} />
      <FormInput label="Phone Number" value={phone} onChangeText={setPhone} />

      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;
