// components/HeaderWithBack.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const HeaderWithBack = ({ title = "Header", subtitle = null }) => {
  const navigation = useNavigation();

  return (
<View style={styles.headercontainer}>
  <TouchableOpacity 
    onPress={() => navigation.goBack()} 
    style={styles.backButton}
  >
    <Icon name="chevron-back-outline" size={26} color="#000" />
  </TouchableOpacity>

  <View style={styles.titleContainer}>
    <Text style={styles.title}>{title}</Text>
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
  </View>

  <View style={{ width: 26 }} />
</View>

  );
};

export default HeaderWithBack;
