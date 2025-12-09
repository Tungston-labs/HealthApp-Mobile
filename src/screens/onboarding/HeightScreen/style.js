import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 36,
  },

  /* Toggle */
  toggleWrapper: {
    flexDirection: "row",
    backgroundColor: "#E6E6E6",
    borderRadius: 16,
    padding: 4,
    marginBottom: 18,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    fontFamily: "Segoe UI",
  },
  activeToggle: {
    backgroundColor: "#7774F4",
    elevation: 6,
  },
  activeToggleText: {
    color: "#fff",
  },

  /* Big number display */
  bigDisplayWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  bigNumber: {
    fontSize: 56,
    fontWeight: "800",
    color: "#000",
    lineHeight: 60,
    fontFamily: "Segoe UI",
  },
  bigUnit: {
    fontSize: 18,
    color: "#555",
    marginLeft: 6,
    marginBottom: 10,
    fontFamily: "Segoe UI",
  },

  /* Ruler row */
  rulerRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 370,
    marginTop: 6,
  },

  /* Left labels */
  leftLabels: {
    width: 60,
    alignItems: "flex-end",
    paddingRight: 8,
  },
  leftLabelText: {
    fontSize: 20,
    color: "#9B9B9B",
    fontWeight: "700",
    fontFamily: "Segoe UI",
  },
  leftLabelActive: {
    color: "#000",
    fontSize: 26,
  },

  /* Blue ruler bar */
  rulerContainer: {
    width: 80,
    height: "100%",
    backgroundColor: "#7774F4",
    borderRadius: 12,
    marginHorizontal: 10,
    overflow: "hidden",
    alignItems: "center",
  },

  /* TICK LINES — EXACT LIKE SECOND IMAGE */
  tickLine: {
    backgroundColor: "#111",
  },

  /* Small ticks */
  smallTick: {
    width: 22,   // thin short line
    height: 2,
  },

  /* Big ticks (every 5 cm) */
  bigTick: {
    width: 40,   // longer line like image
    height: 4,
  },

  /* Highlighted tick */
  activeTick: {
    backgroundColor: "#F2E64A",
  },

  /* Yellow center line */
  centerHighlight: {
    position: "absolute",
    width: "70%",
    height: 3,
    backgroundColor: "#EDE13C",
    top: "50%",
    transform: [{ translateY: -1.5 }],
  },

  /* Green pointer */
  pointerWrapper: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  greenPointer: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 14,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#24AD73",
  },
});
