import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 25 * scale,
        justifyContent: "center",
    },

    logoContainer: {
        alignItems: "center",
        marginBottom: 40 * scale,
    },

    logo: {
        height: 38 * scale,
        resizeMode: "contain", // ✅ important
    },

    inputContainer: {
        marginBottom: 25 * scale,
    },

    label: {
        fontSize: 16 * scale,
        color: "#000",
        marginBottom: 8 * scale,
        fontWeight: "900",
        fontFamily: "Roboto-Bold",
    },

    inputWrapper: {
        borderBottomWidth: 1,
        borderColor: "#8D8D8D",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 5 * scale,
    },

    leftIcon: {
        marginRight: 10 * scale,
    },

    input: {
        flex: 1,
        fontSize: 16 * scale,
        color: "#000",
        fontFamily: "Roboto-Regular",
    },

    eyeIconWrapper: {
        padding: 4 * scale,
    },

    forgotPassword: {
        alignSelf: "flex-end",
        color: "#DA9307",
        marginTop: 6 * scale,
        fontWeight: "900",
        fontSize: 12 * scale,
        fontFamily: "Roboto-Regular",
    },

    loginBtnWrapper: {
        alignSelf: "flex-end",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 8,
        borderRadius: 20 * scale,
    },

    loginBtn: {
        backgroundColor: "#EF0707",
        paddingVertical: 8 * scale,
        paddingHorizontal: 22 * scale,
        borderRadius: 20 * scale,
        margin: 2,
    },

    loginText: {
        color: "#fff",
        fontSize: 14 * scale,
        fontWeight: "600",
        fontFamily: "Roboto-Medium",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25 * scale,
    },

    footerText: {
        color: "#444",
        fontSize: 14 * scale,
        fontFamily: "Roboto-Regular",
    },

    signUp: {
        color: "#DA9307",
        fontSize: 14 * scale,
        fontWeight: "900",
        fontFamily: "Roboto-Medium",
    },
});
