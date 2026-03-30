// import { StyleSheet, Dimensions } from "react-native";
// const { width } = Dimensions.get("window");

// const cardWidth = width * 0.39;
// const cardHeight = width * 0.48;

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 20,
//   },

//   topHeader: {
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     marginBottom: -150,
//   },

//   backBtn: {
//     position: "absolute",
//     left: 0,
//     padding: 5,
//     paddingTop: 70,
//   },

//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "800",
//     color: "#000",
//     paddingTop: 60,
//     fontFamily: "Segoe UI",
//   },

//   centerWrapper: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   subtitle: {
//     textAlign: "center",
//     marginBottom: 20,
//     fontSize: 17,
//     fontWeight: "700",
//     color: "#000",
//     lineHeight: 24,
//     fontFamily: "Segoe UI",
//   },

//   subText: {
//     textAlign: "center",
//     fontSize: 15,
//     marginTop: 8,
//     color: "#000000",
//     fontFamily: "Segoe UI",
//   },

//   cardRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 35,
//     width: "100%",
//     paddingHorizontal: 15,
//   },

//   card: {
//     width: cardWidth,
//     height: cardHeight,
//     borderRadius: 14,
//     overflow: "hidden",
//     backgroundColor: "#eee",

//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 8,

//     transform: [{ scale: 1 }],
//     borderWidth: 0,
//   },

//   activeCard: {
//     borderWidth: 3,
//     borderColor: "#7774F4",
//     transform: [{ scale: 1.08 }],
//   },

//   cardImage: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },

//   cardImageStyle: {
//     borderRadius: 1,
//   },

//   cardLabel: {
//     position: "absolute",
//     top: 82,
//     left: 52,
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "800",
//     fontFamily: "Segoe UI",
//   },

//   continueBtn: {
//     backgroundColor: "#7774F4",
//     paddingVertical: 14,
//     paddingHorizontal: 22,
//     borderRadius: 30,
//     marginTop: 25,
//     marginBottom: 40,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,

//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },

//   continueText: {
//     color: "#fff",
//     fontSize: 17,
//     fontWeight: "800",
//     fontFamily: "Segoe UI",
//   },

//   arrowIcon: {
//     marginRight: -9,
//   },

//   continueFixed: {
//     position: "absolute",
//     bottom: 25,
//     right: 25,
//   },

// });

import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const cardWidth = width * 0.39;
const cardHeight = width * 0.48;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D84C5B", // red background (header area)
  },

  /* 🔴 HEADER */
  headerContainer: {
    height: 140,
    backgroundColor: "#D84C5B",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backBtn: {
    position: "absolute",
    left: 20,
    top: 55,
  },

  headerTitle: {
  color: "#201f1f",
  fontSize: 22,
  fontFamily: "Poppins-SemiBold",
  marginBottom: 8, 
},

  /* ⚪ CONTENT WHITE AREA */
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 20,
  },

  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  subtitle: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#000",
    lineHeight: 22,
  },

  subText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 35,
    width: "100%",
    paddingHorizontal: 10,
  },

  card: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#eee",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },

  activeCard: {
    borderWidth: 3,
    borderColor: "#6C63FF",
  },

  cardImage: {
    flex: 1,
    justifyContent: "flex-end",
  },

  cardImageStyle: {
    borderRadius: 16,
  },

  cardLabel: {
    position: "absolute",
    bottom: 15,
    left: 15,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  titleWrapper: {
  alignItems: "center",
  marginBottom: 10,
},
});