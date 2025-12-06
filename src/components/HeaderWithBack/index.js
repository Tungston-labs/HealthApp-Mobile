// components/HeaderWithBack.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const HeaderWithBack = ({ title = "Header" }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headercontainer}>
   
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="chevron-back-outline" size={26} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
      
      <View style={{ width: 26 }} />
    </View>
  );
};

export default HeaderWithBack;
