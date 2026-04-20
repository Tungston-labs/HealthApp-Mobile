import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D84C5B", // red background (header area)
  },

  /* 🔴 HEADER */
  headerContainer: {
    height: 140,
    backgroundColor: "#D84C5B",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backBtn: {
    position: "absolute",
    left: 20,
    top: 55,
  },
})