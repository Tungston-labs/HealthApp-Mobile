import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  innerWrapper: {
    alignItems: "center",
    paddingHorizontal: 24,
    width: "100%",
  },

  statusImage: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "contain",
    marginBottom: 28,
  },

  title: {
    fontSize: 22,
    fontFamily: "Segoe UI",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    fontFamily: "Segoe UI",
    textAlign: "center",
    color: "#444",
    lineHeight: 22,
  },
});
