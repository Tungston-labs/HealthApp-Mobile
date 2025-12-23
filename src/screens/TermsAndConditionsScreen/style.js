import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 74,
    paddingBottom: 40,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },

  title: {
    fontFamily: "Segoe UI",
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
  },

  paragraph: {
    fontFamily: "Segoe UI",
    fontSize: 15,
    fontWeight: "400",
    color: "#000000",
    lineHeight: 22,
    marginBottom: 14,
  },
});

export default styles;
