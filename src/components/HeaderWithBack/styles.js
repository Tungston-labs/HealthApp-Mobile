// components/HeaderWithBackStyle.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headercontainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 32,
  },

  backButton: {
  },

  title: {
    fontFamily: "Segoe UI",
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginLeft: 10,

    flex: 1,
  },
});
