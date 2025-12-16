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
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    marginTop: 14,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
    paddingVertical: 8,
    fontSize: 16,
    color: "#000",
  },

  locationBtn: {
    backgroundColor: "#ECEBF6",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  locationText: {
    color: "#6B4EFF",
    fontSize: 16,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  col: {
    width: "48%",
  },

  saveBtn: {
    backgroundColor: "#6B4EFF",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 40,
  },

  saveText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "70 0",
  },
});
