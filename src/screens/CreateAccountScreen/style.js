import { StyleSheet } from "react-native";
export const pickerSelectStyles = {
  inputIOS: {
    borderBottomWidth: 1,
    borderBottomColor: "#898989",
    paddingVertical: 16,
    fontSize: 15,
    fontFamily: "Segoe UI",
    color: "#000",
  },
  inputAndroid: {
    borderBottomWidth: 1,
    borderBottomColor: "#898989",
    paddingVertical: 16,
    fontSize: 15,
    fontFamily: "Segoe UI",
    color: "#000",
  },
  placeholder: {
    color: "#888",
  },
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 60,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Segoe UI",
    fontWeight: "600",
    marginRight: 28,
  },
profilePlaceholder: {
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: '#eee',
  alignItems: 'center',
  justifyContent: 'center',
},

placeholderText: {
  fontSize: 10,
  color: '#888',
  marginTop: 4,
},

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 10,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 60,
  },

  inputUnderline: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#898989",
    paddingVertical: 16,
    fontSize: 15,
    fontFamily: "Segoe UI",
  },

  iconInputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#898989",
    paddingVertical: 10,
    marginBottom: 8,
    gap: 10,
  },

  iconInputRowSmall: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#898989",
    paddingVertical: 10,
    gap: 10,
  },

  inputFlex: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Segoe UI",
  },

  dropdownRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#898989",
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  dropdownText: {
    fontSize: 15,
    color: "#949494",
    fontFamily: "Segoe UI",
  },

dropdownList: {
  position: "absolute",
  top: 52,              // just below dropdownRow
  left: 0,
  right: 0,
  backgroundColor: "#EEEEFF",
  borderWidth: 1,
  borderColor: "#D5D5D5",
  borderRadius: 6,
  zIndex: 999,
},

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },

  dropdownItemText: {
    fontSize: 15,
    fontFamily: "Segoe UI",
  },

  useLocationBtn: {
    borderWidth: 1,
    borderColor: "#8E8E8E",
    paddingVertical: 14,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },

  useLocationText: {
    fontSize: 15,
    fontFamily: "Segoe UI",
  },

  twoColRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 20,
  marginBottom: 10,
},

  uploadContainer: {
    marginTop: 20,
    backgroundColor: "#E5E5ED",
    padding: 12,
    borderRadius: 10,
  },

  uploadTitle: {
    fontSize: 15,
    fontFamily: "Segoe UI",
    marginBottom: 10,
  },

  uploadBox: {
    height: 120,
    backgroundColor: "#EEEEFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DA9307",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },

  uploadBtnText: {
    color: "#fff",
    marginLeft: 6,
    fontFamily: "Segoe UI",
  },

  uploadHelper: {
    fontSize: 13,
    color: "#949494",
    fontFamily: "Segoe UI",
  },

  uploadImagesRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  uploadImageCard: {
    width: 95,
    height: 95,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  deleteBadge: {
    position: "absolute",
    right: 0,
    zIndex: 99,
    backgroundColor: "red",
    padding: 4,
    borderBottomLeftRadius: 8,
  },

  uploadPreviewImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  footerBtnWrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },

  continueBtn: {
    backgroundColor: "#EF0707",
    paddingVertical: 18,
    borderRadius: 30,
  },

  continueText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Segoe UI",
    fontWeight: "600",
  },
});
