
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingBottom: 50, 
  },

  formWrapper: {
    paddingHorizontal: 22,
    paddingTop: 30, 
  },

  label: {
    fontSize: 12,
    color: "#8A8A8A",
    marginBottom: 6,
    marginTop: 16,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#EFEEE9",
    paddingVertical: 6,
    fontSize: 15,
    color: "#000",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  col: {
    width: "48%",
  },

  locationBtn: {
    marginTop: 26,
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
  },

  locationText: {
    fontSize: 15,
    color: "#505050",
    fontWeight: "500",
  },

  saveWrapper: {
    alignItems: "flex-end", 
    marginTop: 32,
    marginBottom: 20,
  },

  saveBtn: {
    backgroundColor: "#EF0707",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 30,
    minWidth: 100,
    alignItems: "center",
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
