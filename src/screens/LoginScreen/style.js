import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFFF",
        paddingHorizontal: 60,
        justifyContent: "center",
    },

    logoContainer: {
        alignItems: "center",
        marginBottom: 40 * scale,
    },

    logo: {
        height: 38 * scale,
        resizeMode: "contain",
    },

    inputContainer: {
        marginBottom: 25 * scale,
        marginHorizontal: 30,
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
        color: "#000000",
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
        marginRight: 22 * scale,

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
        color: "#000000",
        fontSize: 14 * scale,
        fontWeight: "900",
        fontFamily: "Roboto-Medium",
    },
});
