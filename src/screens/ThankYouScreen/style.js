import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  innerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    width: "100%",
  },

  clockImage: {
    width: width * 0.45,
    height: width * 0.45,
    resizeMode: "contain",
    marginBottom: 30,
  },

  title: {
    fontSize: 22,
    fontFamily: "Segoe UI",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    fontFamily: "Segoe UI",
    textAlign: "center",
    color: "#444",
    lineHeight: 22,
  },

  boldText: {
    fontFamily: "Segoe UI",
    fontWeight: "bold",
    color: "#000",
  },
});
