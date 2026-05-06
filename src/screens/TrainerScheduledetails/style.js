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
    backgroundColor: "#EFEEE9",
    padding: 12,
    borderRadius: 12,
    gap: 10,
    marginBottom: 25, 
  },

  locationText: {
    flex: 1,
    fontSize: 14,
    color: "#000000",
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
    backgroundColor: "#EF0707",
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
    backgroundColor: "#EFEEE9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  savedNoteText: {
    fontSize: 14,
    color: "#333",
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
    backgroundColor: "#EFEEE9",
    borderRadius: 12,
    padding: 12,
    minHeight: 120,
     maxHeight: 200,
    textAlignVertical: "top",
  },

  submitBtn: {
    backgroundColor: "#EF0707",
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
  startSessionBtn: {
  backgroundColor: "#EF0707",
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  marginVertical: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 4,
},

startSessionText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
},

});
