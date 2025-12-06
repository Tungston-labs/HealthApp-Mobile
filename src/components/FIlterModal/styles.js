import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  container: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 10,
  },

  closeBtn: {
    position: "absolute",
    top: 15,
    right: 15,
  },

  closeText: {
    fontFamily: "Segoe UI",
    fontSize: 20,
    color: "#000000",
  },

  sectionTitle: {
    fontFamily: "Segoe UI",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },

  slotRow: {
    flexDirection: "row",
    gap: 10,
  },

  slotBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#E7E7E9",
    alignItems: "center",
  },

  activeSlot: {
    backgroundColor: "#7774F4",
  },

  activeSlotText: {
    color: "#fff",
    fontWeight: "600",
  },

  inactiveSlotText: {
    color: "#000000",
    fontWeight: "500",
    fontFamily: "Segoe UI",

  },

  timeSlotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  timeBtn: {
    backgroundColor: "#E8E8EC",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
rowHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 15,
},

  activeTimeBtn: {
    backgroundColor: "#7774F4",
  },

  timeTextActive: {
    color: "#fff",
  },

  timeTextInactive: {
    color: "#000000",
  },

  dateBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E6E5E8",
    borderRadius: 25,
    padding: 20,
    marginTop: 10,
  },

  dateColumn: {
    alignItems: "center",
  },

  dateItem: {
    color: "#000000",
    fontSize: 14,
    marginVertical: 6,
  },

  dateItemBold: {
    fontFamily: "Segoe UI",
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginVertical: 6,
  },

  applyBtn: {
    backgroundColor: "#7774F4",
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 20,
  },

  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
