// import { StyleSheet } from "react-native";

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 30,
//   },

//   headerWrapper: {
//     marginTop: 70,
//     marginBottom: 15,
//   },

//   progressContainer: {
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     marginBottom: 15,
//     gap: 5,
//   },

//   progressBar: {
//     height: 4,
//     width: 45,
//     borderRadius: 5,
//   },

//   backButton: {
//     width: 38,
//     height: 38,
//     borderRadius: 30,
//     backgroundColor: "#7774F4",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 5,
//   },

//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "450",
//     marginBottom: 20,
//     fontFamily: "Segoe UI",
//   },

//   centerContainer: {
//     flex: 1,
//   },

//   footer: {
//     paddingVertical: 45,
//     alignItems: "flex-end",
//   },

//   nextButton: {
//     width: 38,
//     height: 38,
//     borderRadius: 30,
//     backgroundColor: "#7774F4",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const BAR_GAP = 6;
const TOTAL_BARS = 7;
const BAR_WIDTH = (width - 60 - BAR_GAP * (TOTAL_BARS - 1)) / TOTAL_BARS;

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /* Main padded container */
  container: {
    flex: 1,
    paddingHorizontal: 30, // ✅ FIXED EDGE SPACING
  },

  /* Header */
  headerWrapper: {
    marginTop: 24,
    marginBottom: 18,
  },

  progressContainer: {
    flexDirection: "row",
    marginBottom: 18,
  },

  progressBar: {
    height: 4,
    width: BAR_WIDTH,
    borderRadius: 6,
    backgroundColor: "#EFEFEF",
    marginRight: BAR_GAP,
  },

  progressActive: {
    backgroundColor: "#7774F4",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#7774F4",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
    color: "#000",
  },

  centerContainer: {
    flex: 1,
  },

  footer: {
    paddingVertical: 30,
    alignItems: "flex-end",
  },

  nextButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#7774F4",
    justifyContent: "center",
    alignItems: "center",
  },
});
