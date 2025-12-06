import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 30,
  },

  ageNumber: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#000000",
  },

  ageLabel: {
    fontSize: 20,
     fontWeight: "bold",
    marginBottom: 40,
    color: "#3C3C3C",
  },

  wheelWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    width: "100%",
    marginTop: 20,
  },

  wheel: {
    height: 200,
  },

  wheelText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
  },

  wheelTextActive: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
});
