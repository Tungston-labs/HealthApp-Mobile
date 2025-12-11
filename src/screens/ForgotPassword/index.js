import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    continueWrapper,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ArrowIcon from "react-native-vector-icons/Feather";
import styles from "./style";

export default function ForgotPasswordScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.centerWrapper}>

                <View style={styles.logoContainer}>
                    {/* <Image
                        source={require("../assets/logo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    /> */}
                </View>

                <Text style={styles.description}>
                    Enter your registered email address below. We’ll send you a code to reset your password.
                </Text>

                <Text style={styles.label}>Email</Text>

                <View style={styles.inputWrapper}>
                    <Icon name="mail-outline" size={20} color="#8D8D8D" style={styles.inputIcon} />
                    <TextInput
                        placeholder="Enter Email"
                        placeholderTextColor="#999"
                        style={styles.input}
                    />
                </View>

                <View style={styles.continueWrapper}>
                    <View style={styles.innerShadow} />

                    <TouchableOpacity
                        style={styles.continueBtn}
                        onPress={() => navigation.navigate("OtpScreen")}
                    >
                        <Text style={styles.continueText}>Continue</Text>
                        <ArrowIcon name="chevron-right" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Back to Login */}
                <TouchableOpacity
                    style={styles.backToLoginWrapper}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backNormal}>Back to </Text>
                    <Text style={styles.backLogin}>Log in</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
}
