import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
  },

  mapHint: {
    fontSize: 14,
    color: "#000",
    marginVertical: 8,
  },

  locationBox: {
    flexDirection: "row",
    backgroundColor: "#F3F3FF",
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },

  locationText: {
    flex: 1,
    fontSize: 14,
    color: "#0085F7",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 20,
  },

  subText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
  },

  addNoteBtn: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#6C63FF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
    gap: 6,
    marginVertical: 14,
  },

  addNoteText: {
    color: "#fff",
    fontWeight: "600",
  },

  noteBox: {
    backgroundColor: "#F2F2FF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  savedNoteText: {
    fontSize: 14,
    color: "#333",
  },

  swipeWrapper: {
    marginTop:20,
    marginBottom: 20,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  closeIcon: {
    alignSelf: "center",
    marginBottom: 10,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  modalInput: {
    backgroundColor: "#F2F2FF",
    borderRadius: 12,
    padding: 12,
    minHeight: 120,
    textAlignVertical: "top",
  },

  submitBtn: {
    backgroundColor: "#6C63FF",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },

  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
