import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF", // Outer background
    paddingBottom: 18,
    paddingTop: 10,
  },

  container: {
    flexDirection: "row",
    backgroundColor: "#111", // Black navbar
    padding: 14,
    marginHorizontal: 20,
    borderRadius: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconWrapper: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 30,
    marginHorizontal: 8,
  },

  activeIconWrapper: {
    backgroundColor: "#EF0707",
  },
});

export default styles;