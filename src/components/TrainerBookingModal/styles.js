// components/TrainerBookingModalStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#fff",
    height: "70%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 20,
  },

  headerSection: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },

  infoSection: {
    marginLeft: 15,
    flex: 1,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    marginTop: 10,
    gap: 25,
  },

  rowSingle: {
    flexDirection: "row",
    marginTop: 10,
  },

  label: {
    fontSize: 12,
    color: "#555",
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },

  sectionTitle: {
    marginTop: 25,
    fontSize: 16,
    fontWeight: "600",
  },

  optionRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },

  optionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  optionBtnActive: {
    backgroundColor: "#EF0707",
    borderColor: "#EF0707",
  },

  optionText: {
    fontSize: 14,
    color: "#555",
  },

  optionTextActive: {
    color: "#fff",
    fontWeight: "700",
  },

  addressInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    fontSize: 14,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff",
  },

  payBtn: {
    backgroundColor: "#EF0707",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  payText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 80,
  },

  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  addNewText: {
    color: "#EF0707",
    fontSize: 16,
    fontWeight: "500",
  },

});
