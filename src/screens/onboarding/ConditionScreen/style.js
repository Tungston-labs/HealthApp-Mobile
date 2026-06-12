import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    marginTop:20,
  },

  listContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 40,
  },

  card: {
    width: "93%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#d6d4d4",
    backgroundColor: "#ffffff",
    marginBottom: 15,
  },

  cardActive: {
    borderColor: "#000000", 
  },

  label: {
    fontSize: 18,
    fontWeight: "400",
    color: "#000",
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderWidth: 2,
    borderColor: "#666666",
    justifyContent: "center",
    alignItems: "center",
  },

  radioInner: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: "#000000", 
  },

});
