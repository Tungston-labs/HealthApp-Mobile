import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginHorizontal: 20,
    alignItems: "center",
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    textAlign: "center",
  },
  desc: {
    fontSize: 13,
    color: "#020202",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
  width: "100%",
  textAlign: "left",
  fontSize: 14,
  color: "#000",
  fontWeight: "600",
  marginTop: 5,
  marginBottom: 6,
},

  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#b2b2b3",
    backgroundColor: "#EFEEE9",
    height: 48,
    width: 300,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  dropdownText: {
    color: "#777",
    fontSize: 14,
  },

  dropdownList: {
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginTop: 5,
    overflow: "hidden",
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },

  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },

  noteBox: {
    height: 120,
    borderWidth: 1,
    borderColor: "#b2b2b3",
    backgroundColor: "#EFEEE9",
    width: 300,
    padding: 12,
    fontSize: 14,
    borderRadius: 8,
    textAlignVertical: "top",
    color: "#000",
    marginBottom: 20,
  },
  cancelBtn: {
    backgroundColor: "#030303",
    paddingVertical: 12,
    borderRadius: 25,
    width: "45%",
    alignItems: "center",
  },
  confirmBtn: {
    backgroundColor: "#EF0707",
    paddingVertical: 12,
    borderRadius: 25,
    width: "45%",
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "600",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
});
