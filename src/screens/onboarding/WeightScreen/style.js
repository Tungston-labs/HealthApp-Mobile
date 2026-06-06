import { StyleSheet, Dimensions, Platform } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  toggleWrapper: {
    flexDirection: "row",
    backgroundColor: "#E6E6E6",
    borderRadius: 16,
    padding: 4,
    marginBottom: 25,
    elevation: 3,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Segoe UI",
  },
  activeToggle: {
    backgroundColor: "#EF0707",
    elevation: 5,
  },
  activeToggleText: {
    color: "#fff",
  },
  topNumbersWrapper: {
    height: 50,
    width: "100%",
  },
  topNumberText: {
    fontSize: 18,
    color: "#666",
    fontFamily: "Segoe UI",
    marginBottom: 6,
  },
  rulerWrapper: {
    width: "100%",
    height: 90,
    backgroundColor: "#EF0707",
    borderRadius: 12,
    marginTop: -2,
    overflow: "hidden",
    justifyContent: "center",
  },
  tick: {
    width: 2,
    backgroundColor: "#111",
    borderRadius: 2,
  },
  bigTick: {
    height: 28,
  },
  smallTick: {
    height: 12,
  },
  centerLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
  },
  pointerWrapper: {
    marginTop: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  greenPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 16,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#2AB673",
  },
  bigValueWrapper: {
    flexDirection: "row",
    marginTop: 4,
    alignItems: "flex-end",
  },
  bigValue: {
    fontSize: 56,
    fontWeight: "800",
    color: "#000",
    fontFamily: "Segoe UI",
  },
  bigUnit: {
    fontSize: 18,
    color: "#666",
    marginLeft: 6,
    marginBottom: 10,
    fontFamily: "Segoe UI",
  },
  topNumbersRow: {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 60,
  marginBottom: 10,
  alignItems: "center",
},

sideNumber: {
  fontSize: 20,
  color: "#666",
  fontFamily: "Segoe UI",
},

centerNumber: {
  fontSize: 28,
  fontWeight: "700",
  color: "#000",
  fontFamily: "Segoe UI",
},

});
