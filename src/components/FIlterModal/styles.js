import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  container: {
    backgroundColor: "#EFEEE9",
    borderRadius: 25,
    padding: 20,
  },

  closeBtn: {
    position: "absolute",
    top: 14,
    right: 16,
    padding: 4,
    borderRadius: 25 / 2,
  },

  closeText: {
    fontFamily: "Segoe UI",
    fontSize: 20,
    color: "#000000",
  },

  sectionTitle: {
    fontFamily: "Segoe UI",
    fontSize: 16,
    fontWeight: "700",
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
    backgroundColor: "#EFEEE9",
    alignItems: "center",
  },

  activeSlot: {
    backgroundColor: "#DA9307",
      borderColor: "#DA9307", 

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
    backgroundColor: "#EFEEE9",
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
    backgroundColor: "#DA9307",
      borderColor: "#DA9307", 

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
    backgroundColor: "#EFEEE9",
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
  applyWrapper: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 20,
  },
applyBtn: {
  backgroundColor: "#EF0707",
  paddingVertical: 14,
  borderRadius: 25,
  width: 200,
  alignItems: "center",

  borderWidth: 1.5,
  borderColor: "#EF0707", 
},


  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  inputUnderline: {
  borderBottomWidth: 1,
  borderBottomColor: '#1C1B1F', 
  marginTop:10,
  marginBottom:10,
},

});
