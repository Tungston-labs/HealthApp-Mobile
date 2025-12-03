import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const scale = width / 375; // Responsive scale based on iPhone 11 width

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25 * scale,
    justifyContent: "center", // Center vertically
  },

  centerWrapper: {
    alignItems: "center", // Center horizontally
    width: "100%",
  },

  /* Logo */
  logoContainer: {
    marginBottom: 20 * scale,
    alignItems: "center",
  },
  logo: {
    width: 160 * scale,
    height: 160 * scale,
  },

  /* Description Text */
  description: {
    textAlign: "center",
    fontSize: 14 * scale,
    color: "#898989",
    lineHeight: 20 * scale,
    marginBottom: 25 * scale,
  },

  /* Label */
  label: {
    fontSize: 16 * scale,
    fontWeight: "700",
    color: "#000000",
    alignSelf: "flex-start",
    marginBottom: 8 * scale,
  },

  /* Email Input Box */
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10 * scale,
    borderBottomWidth: 2,
    borderColor: "#898989",
    width: "100%",
    marginBottom: 25 * scale,
  },

  inputIcon: {
    marginRight: 10 * scale,
  },

  input: {
    flex: 1,
    fontSize: 15 * scale,
    color: "#000000",
  },
  
  continueWrapper: {
  alignSelf: "flex-end",
  position: "relative",
  marginBottom: 20 * scale,
},

  /* Continue Button */
  continueBtn: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#7774F4",
  paddingVertical: 10 * scale,
  paddingHorizontal: 18 * scale,   // makes button small
  borderRadius: 20 * scale,

  alignSelf: "flex-end",            // ⬅️ THIS pushes button to RIGHT SIDE
  marginBottom: 20 * scale,

  elevation: 6,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 4 },
},
innerShadow: {
  position: "absolute",
  top: 2,
  left: 2,
  right: 2,
  bottom: 2,
  borderRadius: 20 * scale,
  backgroundColor: "#7774F4",

  // fake inner shadow
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 10,
  shadowOffset: { width: -2, height: -2 },

  zIndex: -1,
},

  continueText: {
    color: "#fff",
    fontSize: 16 * scale,
    fontWeight: "700",
    marginRight: 6 * scale,
  },

  /* Back to Login */
  backToLoginWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },

  backNormal: {
    fontSize: 14 * scale,
    color: "#444",
  },

  backLogin: {
    fontSize: 14 * scale,
    fontWeight: "700",
    color: "#6C63FF",
  },
});
