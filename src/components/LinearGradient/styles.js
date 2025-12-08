import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    height: 95,
    borderRadius: 8,
    overflow: "visible",
    justifyContent: "center",
  },
overlayImage: {
  position: "absolute",
  bottom: -4,
  width: 160,
  marginBottom:4,
  height: 120,
  resizeMode: "contain",
},


  textContainer: {
    marginLeft: 150,
    paddingRight: 30,
  },
  title: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "SegoeUI",
    fontWeight: "600",
    lineHeight: 18,
  },
});
