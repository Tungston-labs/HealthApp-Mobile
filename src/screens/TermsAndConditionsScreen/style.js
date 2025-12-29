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

  subTitle: {
    fontFamily: "Segoe UI",
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    marginTop: 20,
  },

  underline: {
    width: 50,
    height: 2,
    backgroundColor: "#000000",
    marginVertical: 6,
  },

  paragraph: {
    fontFamily: "Segoe UI",
    fontSize: 15,
    fontWeight: "400",
    color: "#000000",
    lineHeight: 22,
    marginBottom: 10,
  },
});

export default styles;
