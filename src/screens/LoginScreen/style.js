// import { StyleSheet, Dimensions } from "react-native";

// const { width } = Dimensions.get("window");
// const scale = width / 375;

// export default StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#FFFFFF",
//         paddingHorizontal: 25 * scale,
//         justifyContent: "center",
//     },

//     logoContainer: {
//         alignItems: "center",
//         marginBottom: 40 * scale,
//     },

//     logoText: {
//         fontSize: 28 * scale,
//         fontWeight: "700",
//         color: "#000",
//     },

//     inputContainer: {
//         marginBottom: 25 * scale,
//     },

//     label: {
//         fontSize: 16 * scale,
//         color: "#000",
//         marginBottom: 8 * scale,
//         fontWeight: "900",
//         fontFamily: "Roboto-Bold",
//     },

//     inputWrapper: {
//         borderBottomWidth: 1,
//         borderColor: "#8D8D8D",
//         flexDirection: "row",
//         alignItems: "center",
//         paddingBottom: 5 * scale,
//     },

//     leftIcon: {
//         marginRight: 10 * scale,
//     },

//     input: {
//         flex: 1,
//         fontSize: 16 * scale,
//         color: "#000",
//         fontFamily: "Roboto-Regular",
//     },

//     eyeIconWrapper: {
//         padding: 4 * scale,
//     },

//     forgotPassword: {
//         alignSelf: "flex-end",
//         color: "#7774F4",
//         marginTop: 6 * scale,
//         fontSize: 12 * scale,
//         fontFamily: "Roboto-Regular",
//     },

//     loginBtnWrapper: {
//         alignSelf: "flex-end",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 0 },
//         shadowOpacity: 0.25,
//         shadowRadius: 6,
//         elevation: 8,
//         borderRadius: 20 * scale,
//     },

//     loginBtn: {
//         backgroundColor: "#7774F4",
//         paddingVertical: 8 * scale,
//         paddingHorizontal: 22 * scale,
//         borderRadius: 20 * scale,
//         margin: 2,
//     },

//     loginText: {
//         color: "#fff",
//         fontSize: 14 * scale,
//         fontWeight: "600",
//         fontFamily: "Roboto-Medium",
//     },

//     footer: {
//         flexDirection: "row",
//         justifyContent: "center",
//         marginTop: 25 * scale,
//     },

//     footerText: {
//         color: "#444",
//         fontSize: 14 * scale,
//         fontFamily: "Roboto-Regular",
//     },

//     signUp: {
//         color: "#6C63FF",
//         fontSize: 14 * scale,
//         fontWeight: "600",
//         fontFamily: "Roboto-Medium",
//     },
// });

import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24, // Apple HIG standard
        justifyContent: "center",
    },

    logoContainer: {
        alignItems: "center",
        marginBottom: 36,
    },

    logoText: {
        fontSize: 28,
        fontWeight: "700",
        color: "#000",
    },

    inputContainer: {
        marginBottom: 24,
    },

    label: {
        fontSize: 15,
        color: "#000",
        marginBottom: 6,
        fontWeight: "700",
        fontFamily: "Roboto-Bold",
    },

    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#8D8D8D",
        paddingBottom: 6,
    },

    leftIcon: {
        marginRight: 10,
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: "#000",
        paddingVertical: 6,
        fontFamily: "Roboto-Regular",
    },

    eyeIconWrapper: {
        padding: 6,
    },

    forgotPassword: {
        alignSelf: "flex-end",
        marginTop: 8,
        fontSize: 13,
        color: "#7774F4",
        fontFamily: "Roboto-Regular",
    },

    loginBtnWrapper: {
        alignSelf: "flex-end",
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 6,
        borderRadius: 22,
    },

    loginBtn: {
        backgroundColor: "#7774F4",
        paddingVertical: 10,
        paddingHorizontal: 26,
        borderRadius: 22,
    },

    loginText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
        fontFamily: "Roboto-Medium",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 26,
    },

    footerText: {
        fontSize: 14,
        color: "#444",
        fontFamily: "Roboto-Regular",
    },

    signUp: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6C63FF",
        fontFamily: "Roboto-Medium",
    },
});
