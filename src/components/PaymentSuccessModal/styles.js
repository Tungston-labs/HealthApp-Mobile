import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    overflow: "hidden",
  },

  /** Confetti styles */
  confetti: {
    position: "absolute",
    width: 10,
    height: 22,
    borderRadius: 5,
    opacity: 0.9,
  },

tickOuterCircle: {
  width: 130,
  height: 130,
  borderRadius: 65,
  backgroundColor: "#588C47", // outer color
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
},
tickInnerCircle: {
  width: 110,
  height: 110,
  borderRadius: 55,
  backgroundColor: "#6DC152", // inner color
  justifyContent: "center",
  alignItems: "center",
},



  successText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },

  subText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
