import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const imageSize = (screenWidth - 6) / 2; 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    marginTop: 20,
  },

  imageBox: {
    width: imageSize,
    height: imageSize * 0.85,
    marginBottom: 20,
  },
});
export default styles