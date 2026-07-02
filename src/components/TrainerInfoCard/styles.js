import { StyleSheet } from "react-native";


export default StyleSheet.create({
  infoSection: {
    marginLeft: 15,
    flex: 1,
  },

  name: {
    fontSize: 20,
    fontFamily: "SegoeUI",
    fontWeight: "700",
    color: "#000",
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
    gap: 50,
  },

  
  rowSingle: {
    flexDirection: "row",
   alignItems: "flex-start",
    marginTop: 10,
    gap: 30,

  },

  label: {
    fontSize: 12,
    fontFamily: "SegoeUI",
    color: "#555",
  },

  value: {
    fontSize: 14,
    fontFamily: "SegoeUI",
    fontWeight: "600",
    color: "#000",
    marginTop: 2,
  },
});
