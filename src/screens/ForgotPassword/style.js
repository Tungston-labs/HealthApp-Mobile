import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 0, // ✅ removed left & right padding
  },

  centerWrapper: {
    width: "100%",
    paddingHorizontal: 24, // ✅ this keeps content inside but input stretches full width
  },

  description: {
    textAlign: "center",
    fontSize: 14 * scale,
    color: "#898989",
    lineHeight: 20 * scale,
    marginBottom: 25 * scale,
  },

  label: {
    fontSize: 16 * scale,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 8 * scale,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10 * scale,
    paddingHorizontal: 10, // ✅ minimal padding to align icon perfectly
    borderBottomWidth: 2,
    borderColor: "#898989",
    marginBottom: 25 * scale,
  },

  input: {
    flex: 1,
    fontSize: 15 * scale,
    color: "#000000",
    marginLeft: 10,
  },

  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7774F4",
    paddingVertical: 10 * scale,
    paddingHorizontal: 18 * scale,
    borderRadius: 20 * scale,
    alignSelf: "flex-end",
    marginBottom: 20 * scale,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },

  continueText: {
    color: "#fff",
    fontSize: 16 * scale,
    fontWeight: "700",
    marginRight: 6 * scale,
  },
});
