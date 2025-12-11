import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 290,
    backgroundColor: "transparent",
  },

  gradient: {
    width: "100%",
    height: 250,
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: "flex-start",
  },

  curve: {
    position: "absolute",
    bottom: 0,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 15,
  },

  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#6C63FF",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
});
