// import { StyleSheet, Dimensions } from "react-native";
// const { width } = Dimensions.get("window");

// const cardWidth = width * 0.38;
// const cardHeight = width * 0.48;

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//   },

//   topHeader: {
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     marginBottom: 10,
//   },

//   backBtn: {
//     position: "absolute",
//     left: 0,
//     padding: 5,
//     paddingTop: 70,
//   },

//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#000",
//     paddingTop: 60,
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
//     fontWeight: "500",
//     color: "#000",
//     lineHeight: 24,
//   },

//   subText: {
//     textAlign: "center",
//     fontSize: 15,
//     marginTop: 8,
//     color: "#555",
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
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },

//   continueBtn: {
//     position: "absolute",
//     bottom: 40,
//     right: 20,
//     backgroundColor: "#7774F4",
//     borderRadius: 20,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     width: width * 0.45,
//     alignItems: "center",
//   },

//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const cardWidth = width * 0.39;
const cardHeight = width * 0.48;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },

  topHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: -150,
  },

  backBtn: {
    position: "absolute",
    left: 0,
    padding: 5,
    paddingTop: 70,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000",
    paddingTop: 60,
     fontFamily: "Segoe UI",
  },

  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
    lineHeight: 24,
    fontFamily: "Segoe UI",
  },

  subText: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 8,
    color: "#000000",
    fontFamily: "Segoe UI",
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 35,
    width: "100%",
    paddingHorizontal: 15,
  },

  card: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#eee",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,

    transform: [{ scale: 1 }],
    borderWidth: 0,
  },

  activeCard: {
    borderWidth: 3,
    borderColor: "#7774F4",
    transform: [{ scale: 1.08 }],
  },

  cardImage: {
    flex: 1,
    justifyContent: "flex-end",
  },

  cardImageStyle: {
    borderRadius: 1,
  },

  cardLabel: {
    position: "absolute",
    top: 82,
    left: 52,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    fontFamily: "Segoe UI",
  },

  continueBtn: {
  backgroundColor: "#7774F4",
  paddingVertical: 14,
  paddingHorizontal: 22,
  borderRadius: 30,
  marginTop: 25,
  marginBottom: 40,
  flexDirection: "row",
  alignItems: "center",
  gap: 5,

  shadowColor: "#000",
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},

continueText: {
  color: "#fff",
  fontSize: 17,
  fontWeight: "800",
  fontFamily: "Segoe UI",
},

arrowIcon: {
  marginRight: -9,
},

continueFixed: {
  position: "absolute",
  bottom: 25,
  right: 25,
},

});
