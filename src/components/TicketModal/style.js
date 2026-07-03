import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#000",
  },

  textArea: {
    height: 120,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
    marginBottom: 20,
    color: "#000",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancelButton: {
    width: "48%",
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },

  submitButton: {
    width: "48%",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#E53935",
    alignItems: "center",
  },

  cancelText: {
    color: "#000",
    fontWeight: "600",
  },

  submitText: {
    color: "#fff",
    fontWeight: "600",
  },
});