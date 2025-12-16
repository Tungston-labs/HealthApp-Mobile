import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerWrapper: {
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
    position: "relative",
  },


  backBtn: {
    position: "absolute",
    left: 20,
    top: 40,
    zIndex: 10,
    padding: 5,
  },
  imageWrapper: {
    marginTop: 60,
    borderWidth: 4,
    borderColor: "#A48CFB",
    borderRadius: 80,
    padding: 3,
  },
  profileImg: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  profileName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  editIconWrapper: {
  position: "absolute",
  bottom: 10,
  right: 10,
  backgroundColor: "blue",
  borderRadius: 20,
  padding: 6,
  elevation: 4, // Android shadow
  shadowColor: "#000", // iOS shadow
  shadowOpacity: 0.2,
  shadowRadius: 3,
  shadowOffset: { width: 0, height: 1 },
},

});