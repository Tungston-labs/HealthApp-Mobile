import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginHorizontal:15,
    backgroundColor: "#fff",
  },

  genderBox: {
    backgroundColor: "#F3E8FF",
    borderRadius: 16,
    marginBottom: 25,
    height: 180,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  genderBoxActive: {
    borderWidth: 2,
    borderColor: "#6df85a",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    height: 180,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  genderImg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  textWrapper: {
    position: "absolute",
    top: 15,
    zIndex: 2,
  },

  genderText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginRight: 180,
    marginTop: 60,
  },
});
