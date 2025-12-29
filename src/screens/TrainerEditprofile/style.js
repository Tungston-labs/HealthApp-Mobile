import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  formWrapper: {
    paddingHorizontal: 22,
    paddingTop: 20,
  },

  label: {
    fontSize: 12,
    color: "#8A8A8A",
    marginBottom: 6,
    marginTop: 16,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
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
    marginTop: 30,
    marginBottom: 40,
  },

  saveBtn: {
    backgroundColor: "#6B4EFF",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 30,
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
