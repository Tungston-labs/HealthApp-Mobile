import { StyleSheet } from "react-native";

export default StyleSheet.create({
overlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  alignItems: "center",
  
},

card: {
  width: "90%",
  maxWidth: 420,
  backgroundColor: "#fff",
  borderRadius: 20,
  padding: 20,
  marginLeft: 10,
},

noteBox: {
  minHeight: 100,
  maxHeight: 140,
  borderWidth: 1,
  borderColor: "#E5E5E5",
  borderRadius: 12,
  padding: 12,
  textAlignVertical: "top",
  marginTop: 8,
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
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginTop: 15,
    marginBottom: 6,
    fontWeight: "600",
  },

  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D8D7F5",
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
