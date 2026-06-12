import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  container: {
    backgroundColor: "#F3F2EE",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 0,
  },

  headerContainer: {
    backgroundColor: "#F40404",
    height: 75,
    justifyContent: "center",
    paddingHorizontal: 25,
    marginHorizontal: -16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  closeBtn: {
    position: "absolute",
    top: 25,
    right: 20,
    zIndex: 100,
  },

  closeText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
    marginBottom: 14,
    marginTop: 20,
  },

  slotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },

  slotBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  activeSlot: {
    backgroundColor: "#000",
  },

  activeSlotText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  inactiveSlotText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "500",
  },

  timeSlotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },

  timeBtn: {
    width: "23%",
    height: 48,
    backgroundColor: "#E9E9E9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  activeTimeBtn: {
    backgroundColor: "#000",
  },

  activeTimeText: {
    color: "#ffffff",
    fontWeight: "400",
    fontSize: 15,
  },

  inactiveTimeText: {
    color: "#555",
    fontWeight: "500",
    fontSize: 15,
  },

  inputUnderline: {
    borderBottomWidth: 1,
    borderBottomColor: "#CFCFCF",
    marginVertical: 15,
  },

  applyWrapper: {
    marginTop: 28,
    alignItems: "center",
  },

  applyBtn: {
    width: "72%",
    height: 48,
    backgroundColor: "#F40404",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});