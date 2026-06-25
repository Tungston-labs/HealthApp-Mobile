import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    marginHorizontal: 15,
    paddingVertical: 40,
  },

  logo: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
    color: "#000000",
  },
  profileRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  profilePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#cfcccc',
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
    borderBottomColor: '#ccc',
    paddingBottom: 4,
  },

  nameInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    color: '#000',
  },

  subtitle: {
    fontSize: 17,
    fontWeight: "400",
    marginBottom: 25,
    color: "#000",
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#898989",
    paddingVertical: 10,
    marginTop: 12,
    marginHorizontal: 10,

    fontSize: 15,
    color: "#000",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#898989",
    paddingVertical: 10,
    marginHorizontal: 10,

    marginTop: 15,
  },

  inputField: {
    marginHorizontal: 10,
    flex: 1,
    fontSize: 15,
    color: "#000",
  },

  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,

    marginTop: 25,
  },

  locationLeft: {
    flexDirection: "row",
    alignItems: "center",
     backgroundColor: '#cfcccc',
     padding:8,
     borderRadius:12,

  },

  locationText: {
    marginLeft: 7,
    color: "#252323",
    fontSize: 15,
  },

  clearBtn: {
    backgroundColor: "#000000",
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
    marginHorizontal: 10,

  },

  smallInput: {
    width: width * 0.38,

  },

  backLogin: {
    textAlign: "center",
    fontSize: 15,
    color: "#000000",
    fontWeight: "600",
  },
  continueBtn: {
    backgroundColor: "#EF0707",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 30,
    marginTop: 25,
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  continueText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    fontFamily: "Segoe UI",
  },

  arrowIcon: {
    marginRight: -9,
  },

  continueFixed: {
    position: "absolute",
    bottom: -10,
    right: 25,
  },


});
