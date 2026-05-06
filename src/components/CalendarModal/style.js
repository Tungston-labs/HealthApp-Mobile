import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  month: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  weekText: {
    width: "14.2%",
    textAlign: "center",
    fontSize: 12,
    color: "#888",
  },

  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  dayCell: {
    width: "14.2%",
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },

  dayText: {
    fontSize: 14,
    color: "#000",
  },

  selectedDay: {
    backgroundColor: "#EF0707",
    borderRadius: 8,
  },

  selectedDayText: {
    color: "#fff",
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancel: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    borderRadius: 24,
    flex: 1,
    marginRight: 10,
  },

  cancelText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },

  setDate: {
    backgroundColor: "#EF0707",
    paddingVertical: 12,
    borderRadius: 24,
    flex: 1,
  },

  setDateText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
});
