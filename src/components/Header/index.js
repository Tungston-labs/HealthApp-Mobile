// components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { useNavigation } from "@react-navigation/native";

const Header = ({ username = "User", subtitle = "Welcome back!" }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.greeting}>Hi, {username}</Text>
                <Text style={styles.subheading}>{subtitle}</Text>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")} style={styles.notificationIcon}
            >
                <Icon name="notifications-outline" size={28} color="#333" />
            </TouchableOpacity>

        </View>
    );
};

export default Header;
