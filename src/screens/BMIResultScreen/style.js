// import { StyleSheet } from "react-native";

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   topBackground: {
//     position: "absolute",
//     top: 0,
//     height: 450,
//     width: "100%",
//     backgroundColor: "#7774F4",
//   },

//   header: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#fff",
//     marginLeft: 20,
//     marginTop: 80,
//     fontFamily: "Segoe UI",
//   },

//   card: {
//     width: "100%",
//     backgroundColor: "#fff",
//     borderRadius: 40,
//     marginTop: 40,
//     paddingBottom: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.25,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 6 },
//     elevation: 10,
//   },

//   cardInnerContent: {
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//   },

//   circleContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },

//   bmiValue: {
//     position: "absolute",
//     fontSize: 40,
//     fontWeight: "700",
//     color: "#000",
//   },

//   bmiMessage: {
//     marginTop: 15,
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "500",
//   },

//   chip: {
//     alignSelf: "center",
//     paddingVertical: 4,
//     paddingHorizontal: 18,
//     borderRadius: 12,
//     marginTop: 6,
//   },

//   chipText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#fff",
//   },

//   scaleWrapper: {
//   flexDirection: "row",
//   alignSelf: "center",
//   marginTop: 20,
// },

// scaleBar: {
//   width: 5,        // thin oval width
//   height: 35,       // vertical bar height
//   borderRadius: 20, // makes it a capsule shape
//   marginHorizontal: 2,
// },

//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 25,
//   },

//   infoItem: {
//     alignItems: "center",
//   },

//   infoValue: {
//     fontSize: 18,
//     fontWeight: "700",
//   },

//   infoLabel: {
//     fontSize: 12,
//     marginTop: 4,
//     color: "#000000",
//   },

//   /* ★ UPDATED LEGEND SECTION FOR PERFECT ALIGNMENT ★ */
//   legendWrapper: {
//     marginTop: 25,
//     paddingHorizontal: 25,
//     paddingBottom: 30,
//   },

//   legendItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//     justifyContent: "space-between",
//   },

//   legendColor: {
//     width: 18,
//     height: 18,
//     marginRight: 10,
//   },

//   legendLabel: {
//     flex: 1,
//     fontSize: 14,
//     color: "#444",
//     fontWeight: "600",
//   },

//   legendValue: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#444",
//   },

//   floatingButton: {
//     position: "absolute",
//     bottom: 45,
//     right: 25,
//     backgroundColor: "#7774F4",
//     width: 38,
//     height: 38,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 6,
//   },
// });
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  topBackground: {
    position: "absolute",
    top: 0,
    height: 450,
    width: "100%",
    backgroundColor: "#7774F4",
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 20,
    marginTop: 80,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 40,
    paddingBottom: 40,
    elevation: 10,
  },

  cardInner: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  svgRotate: {
    transform: [{ rotate: "-90deg" }],
  },

  bmiValue: {
    position: "absolute",
    fontSize: 40,
    fontWeight: "700",
    color: "#000",
  },

  bmiMessage: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },

  /* ===== TAG WITH TRIANGLE ===== */
  chipWrapper: {
    alignItems: "center",
    marginTop: 10,
  },

  chip: {
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 12,
  },

  chipText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  chipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    marginTop: -2,
  },

  /* ===== COLOR SCALE ===== */
  scaleWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 10,
  },

  scaleBar: {
    width: 6,
    height: 28,
    borderRadius: 20,
    marginHorizontal: 2,
  },

  /* ===== INFO ROW ===== */
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
  },

  infoItem: {
    alignItems: "center",
  },

  infoValue: {
    fontSize: 18,
    fontWeight: "700",
  },

  infoLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#444",
  },

  /* ===== LEGEND ===== */
  legendWrapper: {
    marginTop: 30,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 3,
    marginRight: 10,
  },

  legendLabel: {
    flex: 1,
    fontSize: 14,
    color: "#444",
    fontWeight: "600",
  },

  legendValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#444",
  },

  floatingButton: {
    position: "absolute",
    bottom: 45,
    right: 25,
    backgroundColor: "#7774F4",
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});
