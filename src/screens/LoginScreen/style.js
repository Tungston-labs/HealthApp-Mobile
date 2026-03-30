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

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 20 * scale,
        justifyContent: "center",
    },

    header: {
        marginBottom: 30 * scale,
    },

    title: {
        fontSize: 26 * scale,
        fontWeight: "700",
        color: "#1E1E1E",
    },

    subtitle: {
        fontSize: 14 * scale,
        color: "#888",
        marginTop: 6 * scale,
    },

    inputContainer: {
        marginBottom: 18 * scale,
    },

    label: {
        fontSize: 14 * scale,
        marginBottom: 6 * scale,
        fontWeight: "600",
        color: "#333",
    },

    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12 * scale,
        paddingHorizontal: 12 * scale,
        height: 50 * scale,
        borderWidth: 1,
        borderColor: "#E5E5E5",
    },

    input: {
        flex: 1,
        marginLeft: 10 * scale,
        fontSize: 14 * scale,
        color: "#000",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10 * scale,
    },

    rememberRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#7774F4",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 6,
    },

    checkboxTick: {
        width: 10,
        height: 10,
        backgroundColor: "#7774F4",
        borderRadius: 2,
    },

    rememberText: {
        fontSize: 13,
        color: "#444",
    },

    forgotPassword: {
        fontSize: 13,
        color: "#7774F4",
    },

    loginBtn: {
        backgroundColor: "#7774F4",
        marginTop: 25 * scale,
        height: 55 * scale,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },

    loginText: {
        color: "#fff",
        fontSize: 16 * scale,
        fontWeight: "600",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25 * scale,
    },

    footerText: {
        color: "#444",
        fontSize: 14 * scale,
    },

    signUp: {
        color: "#5B6EFF",
        fontSize: 14 * scale,
        fontWeight: "600",
    },
});