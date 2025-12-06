import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },

  headerWrapper: {
    marginTop: 70,
    marginBottom: 15,
  },

  progressContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 15,
    gap: 15,
  },

  progressBar: {
    height: 4,
    width: 60,
    borderRadius: 5,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 30,
    backgroundColor: "#7774F4",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },

  centerContainer: {
    flex: 1,
  },

  footer: {
    paddingVertical: 45,
    alignItems: "flex-end",
  },

  nextButton: {
    width: 38,
    height: 38,
    borderRadius: 30,
    backgroundColor: "#7774F4",
    justifyContent: "center",
    alignItems: "center",
  },
});
