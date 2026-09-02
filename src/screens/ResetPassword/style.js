import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 390; 

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24 * scale,
  },

  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30 * scale,
    marginBottom: 20 * scale,
    width: "100%",
  },

  logo: {
    height: 42 * scale,   
    width: 170 * scale,  
    resizeMode: "contain",
  },

  title: {
    textAlign: "center",
    fontSize: 14 * scale,
    color: "#555",
    marginBottom: 30 * scale,
    lineHeight: 20 * scale,
    paddingHorizontal: 10 * scale,
  },

  inputContainer: {
    width: "100%",
    alignSelf: "stretch",
    marginBottom: 20 * scale,
  },

  label: {
    fontSize: 15 * scale,
    color: "#222",
    fontWeight: "600",
    marginBottom: 8 * scale,
    marginLeft: 2,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8 * scale,
    gap: 10 * scale,
    width: "100%",
    alignSelf: "stretch",
  },

  input: {
    flex: 1,
    fontSize: 15 * scale,
    paddingVertical: 6 * scale,
    color: "#333",
  },

  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    backgroundColor: "#EF0707",
    paddingVertical: 12 * scale,
    paddingHorizontal: 18 * scale,
    borderRadius: 25 * scale,

    width: 200 * scale,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },

    marginTop: 15 * scale,
  },

  resetText: {
    color: "#fff",
    fontSize: 14 * scale,
    fontWeight: "700",
    marginRight: 6 * scale,
  },

  backWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25 * scale,
    marginBottom: 20 * scale,
  },

  back: {
    fontSize: 13 * scale,
    color: "#555",
  },

  loginLink: {
    fontSize: 13 * scale,
    color: "#020202",
    fontWeight: "700",
  },
});
