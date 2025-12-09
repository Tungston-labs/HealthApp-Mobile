import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // TOP PURPLE HALF BACKGROUND
  topBackground: {
    position: "absolute",
    top: 0,
    height: 450,
    width: "100%",
    backgroundColor: "#7774F4",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 20,
    marginTop: 80,
    fontFamily: "Segoe UI",

  },

  // PURE WHITE CARD
  card: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 40,
    marginTop: 40,
    paddingBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },

  cardInnerContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  bmiValue: {
    position: "absolute",
    fontSize: 40,
    fontWeight: "700",
    color: "#000",
  },

  bmiMessage: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },

  chip: {
    alignSelf: "center",
    paddingVertical: 4,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginTop: 6,
  },

  chipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },

  scaleWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
  },

  scaleBlock: {
    width: 45,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
  },

  infoItem: {
    alignItems: "center",
  },

  infoValue: {
    fontSize: 18,
    fontWeight: "700",
  },

  infoLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#000000",
  },

  legendWrapper: {
    marginTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 30,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    
  },

  legendColor: {
    width: 18,
    height: 18,
    marginRight: 10,
  },

  legendText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },

  floatingButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#7774F4",
    width: 38,
    height: 38,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
