import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },

  logo: {
    width: 160,
    height: 60,
    marginTop: 20,
    marginBottom: 30,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
    color: "#000000",
  },

  subtitle: {
    fontSize: 17,
    fontWeight: "400",
    marginBottom: 25,
    color: "#000",
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#898989",
    paddingVertical: 10,
    marginTop: 12,
    fontSize: 15,
    color: "#000",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#898989",
    paddingVertical: 10,
    marginTop: 15,
  },

  inputField: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
    color: "#000",
  },

  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },

  locationLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    marginLeft: 7,
    color: "#6E6E6E",
    fontSize: 15,
  },

  clearBtn: {
    backgroundColor: "#7774F4",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  clearText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  locationInputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  smallInput: {
    width: width * 0.38,
  },

  backLogin: {
    textAlign: "center",
    fontSize: 15,
    color: "#7774F4",
    fontWeight: "600",
  },

  continueBtn: {
  backgroundColor: "#7774F4",
  paddingVertical: 14,
  paddingHorizontal: 22,
  borderRadius: 30,
  marginTop: 25,
  marginBottom: 40,
  flexDirection: "row",
  alignItems: "center",
  gap: 5,

  shadowColor: "#000",
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},

continueText: {
  color: "#fff",
  fontSize: 17,
  fontWeight: "800",
  fontFamily: "Segoe UI",
},

arrowIcon: {
  marginRight: -9,
},

continueFixed: {
  position: "absolute",
  bottom: 25,
  right: 25,
},


});
