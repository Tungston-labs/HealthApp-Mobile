import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 58) / 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10,
  },

  gridContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },

  card: {
    width: cardWidth,
    height: cardWidth * 1,
    borderRadius: 18,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(14, 14, 14, 0.35)",
  },

  textContainer: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },

  planName: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "SegoeUI",
    color: "#fff",
  },

  planType: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "SegoeUI",
    color: "#eee",
    marginTop: 2,
  },

  planPrice: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "SegoeUI",
    color: "#FFD700",
    marginTop: 6,
  },
  
});
