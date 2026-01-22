import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const H_PADDING = 20;

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 160,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
    color: "#000",
  },

  subtitle: {
    fontSize: 17,
    marginBottom: 25,
    color: "#000",
  },

  profileRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  profilePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },

  nameInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#898989',
    paddingBottom: 4,
  },

  nameInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#898989",
    paddingVertical: 10,
    marginTop: 15,
  },

  inputField: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
    color: "#000",
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#898989",
    paddingVertical: 10,
    marginTop: 12,
    fontSize: 15,
    color: "#000",
  },

  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },

  locationLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    marginLeft: 7,
    color: "#6E6E6E",
    fontSize: 15,
  },

  clearBtn: {
    backgroundColor: "#7774F4",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  clearText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  locationInputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  smallInput: {
    width: (width - H_PADDING * 2 - 12) / 2,
  },

  backLogin: {
    textAlign: "center",
    fontSize: 15,
    color: "#7774F4",
    fontWeight: "600",
    marginTop: 25,
  },

  continueFixed: {
    position: "absolute",
    bottom: 20,
    right: H_PADDING,
    left: H_PADDING,
    alignItems: "flex-end",
  },

  continueBtn: {
    backgroundColor: "#7774F4",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },

  continueText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },

  arrowIcon: {
    marginLeft: 4,
  },
});
