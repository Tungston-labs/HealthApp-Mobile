import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const scale = width / 375;   
const boxSize = width * 0.13;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",  
  },

  brand: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
  },

  description: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    marginTop: 15,
    lineHeight: 20,
    paddingHorizontal: 30,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },

  otpBox: {
    width: boxSize,
    height: boxSize + 20, 
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 16,
    marginHorizontal: 8,
    textAlign: "center",
    fontSize: 20,
    color: "#000000",
    backgroundColor: "#FFFFFF",
  },

  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7774F4",
    paddingVertical: 10 * scale,
    paddingHorizontal: 18 * scale,
    borderRadius: 20 * scale,

    alignSelf: "flex-end",     
    marginRight: 30,          
    marginTop: 40,

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  submitArrow: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 8,
  },

  backToLogin: {
    color: "#444",
    marginTop: 25,
    fontSize: 14,
  },

  loginText: {
    color: "#7774F4",
    fontWeight: "600",
  },
});
