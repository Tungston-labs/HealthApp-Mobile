// components/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  greeting: {
    fontFamily: "Segoe UI",
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 26,
    letterSpacing: 0,
    color: "#000",
  },

  subheading: {
    fontFamily: "Segoe UI",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22,
    color: "#000",
    marginTop: 20,  
  },

  notificationIcon: {
    alignSelf: "flex-start", 
    marginTop: 4,             
  },
});

export default styles;
