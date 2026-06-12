import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  slide: {
    width,
    height,
  },

  image: {
    width: "100%",
    height: "65%",
    resizeMode: "cover",
  },

  bottomContent: {
    paddingHorizontal: 25,
    paddingTop: 25,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
  },

  indicatorWrapper: {
    width: "100%",
    height: 4,
    backgroundColor: "#eee",
    position: "absolute",
    top: height * 0.65,
  },

  indicatorBackground: {
    width: "100%",
    height: 2,
    backgroundColor: "#D9D9D9",
    position: "absolute",
    top: 1,
  },

  indicatorFill: {
    width: "33%",
    height: 2,
    backgroundColor: "#EF0707",
    position: "absolute",
    top: 1,
  },
});
