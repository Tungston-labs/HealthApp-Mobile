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
    color: "#000",
    marginTop: 10,
  },

  subheading: {
    fontFamily: "Segoe UI",
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginTop: 12,
  },

  bmiContainer: {
    marginTop: 10,
    display: "flex",
    gap: 10,
    flexDirection: "row",
  },

  bmiLabel: {
    fontFamily: "Segoe UI",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 13,
    color: "#000",
  },

  bmiValue: {
    fontFamily: "Segoe UI",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 13,
    color: "#000",
  },

  notificationIcon: {
    alignSelf: "flex-start",
    marginTop: 4,
  },
  callIcon: {
    backgroundColor: "#EF0707",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

});

export default styles;
