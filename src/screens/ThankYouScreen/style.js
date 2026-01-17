import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const scale = width / 325;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  innerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    width: "100%",
  },

  clockImage: {
    width: width * 0.45,
    height: width * 0.45,
    resizeMode: "contain",
    marginBottom: 20,
  },
  loginBtnWrapper: {
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
    borderRadius: 20 * scale,
  },

  loginBtn: {
    backgroundColor: "#7774F4",
    paddingVertical: 8 * scale,
    paddingHorizontal: 22 * scale,
    borderRadius: 20 * scale,
    margin: 6,
  },
  title: {
    fontSize: 22,
    fontFamily: "Segoe UI",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    fontFamily: "Segoe UI",
    textAlign: "center",
    color: "#444",
    lineHeight: 20,
  },

  boldText: {
    fontFamily: "Segoe UI",
    fontWeight: "bold",
    color: "#000",
  },
});
