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
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
  },

  subTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    
    marginTop: 24,
  },


  paragraph: {
    fontSize: 15,
    fontWeight: "400",
    color: "#000000",
    lineHeight: 22,
    marginBottom: 10,
  },
});

export default styles;
