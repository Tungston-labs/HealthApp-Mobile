
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#111", 
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconWrapper: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 30,
    marginHorizontal: 8,
  },

  activeIconWrapper: {
    backgroundColor: "#7774F4", 
  },
});

export default styles;
