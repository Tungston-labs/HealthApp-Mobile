import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 390;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24 * scale, // ✅ equal on both sides
    justifyContent: "center",
  },

  title: {
    textAlign: "center",
    fontSize: 14 * scale,
    color: "#555",
    marginBottom: 35 * scale,
    lineHeight: 20 * scale,
  },

  inputContainer: {
    width: "100%",
    marginBottom: 20 * scale,
  },

  label: {
    fontSize: 15 * scale,
    color: "#222",
    fontWeight: "600",
    marginBottom: 8 * scale,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8 * scale,
    gap: 10 * scale,
  },

  input: {
    flex: 1,
    fontSize: 14 * scale,
    paddingVertical: 6 * scale,
    color: "#333",
  },

  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#7774F4",
    paddingVertical: 12 * scale,
    paddingHorizontal: 18 * scale,
    borderRadius: 25 * scale,
    width: 180 * scale,
    marginTop: 10 * scale,
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
  },

  back: {
    fontSize: 13 * scale,
    color: "#555",
  },

  loginLink: {
    fontSize: 13 * scale,
    color: "#6054E4",
    fontWeight: "700",
  },
});
