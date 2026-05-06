import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const scale = width / 375; 

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25 * scale,
    justifyContent: "center", 
  },

  centerWrapper: {
    alignItems: "center", 
    width: "100%",
  },

  logoContainer: {
        alignItems: "center",
        marginBottom: 40 * scale,
    },

    logo: {
        height: 38 * scale,
        resizeMode: "contain", 
    },

  description: {
    textAlign: "center",
    fontSize: 14 * scale,
    color: "#898989",
    lineHeight: 20 * scale,
    marginBottom: 25 * scale,
  },

  label: {
    fontSize: 16 * scale,
    fontWeight: "700",
    color: "#000000",
    alignSelf: "flex-start",
    marginBottom: 8 * scale,
  },

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

  continueBtn: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#EF0707",
  paddingVertical: 10 * scale,
  paddingHorizontal: 18 * scale,   
  borderRadius: 20 * scale,

  alignSelf: "flex-end",           
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
  backgroundColor: "#EF0707",

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
    color: "#EF0707",
  },

    backToLogin: {
    color: "#444",
    marginTop: 25,
    fontSize: 14,
  },

  loginText: {
    color: "#DA9307",
    fontWeight: "600",
  },
  
});
