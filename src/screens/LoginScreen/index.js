import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style";

export default function LoginScreen({ navigation }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SafeAreaView style={styles.container}>

            {/* Logo */}
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>LOGIN</Text>
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>

                <View style={styles.inputWrapper}>
                    <Ionicons
                        name="mail-outline"
                        size={20}
                        color="#8D8D8D"
                        style={styles.leftIcon}
                    />
                    <TextInput
                        placeholder="Enter Email"
                        placeholderTextColor="#999"
                        style={styles.input}
                    />
                </View>
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>

                <View style={styles.inputWrapper}>
                    <Ionicons
                        name="key-outline"
                        size={20}
                        color="#8D8D8D"
                        style={styles.leftIcon}
                    />
                    <TextInput
                        placeholder="Enter password"
                        placeholderTextColor="#999"
                        secureTextEntry={!showPassword}
                        style={styles.input}
                    />

                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIconWrapper}
                    >
                        <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color="#8D8D8D"
                        />
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
            </View>

            {/* Login Button */}
            <View style={styles.loginBtnWrapper}>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => navigation.navigate("SelectRoleScreen")}
                >
                    <Text style={styles.loginText}>Log in</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity>
                    <Text style={styles.signUp}> Sign Up</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}
