// screens/Trainers/styles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    marginTop: 32,
  },

  card: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 20,
  },

trainerImg: {
  width: 75,
  height: 75,
  borderRadius: 12,
},
planName: {
  fontSize: 12,
  color: "#666",
  marginTop: 2,
},


  viewProfileBtn: {
  position: "absolute",
  bottom: 14,
  left: 27,
  alignSelf: "center",
  backgroundColor: "#fff",
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 10,
  elevation: 2,
  borderWidth: 1,
  borderColor: "#8D8D8D", // you can change this color if needed
},

  viewProfileText: {
    fontSize: 10,
    fontWeight: "600",
  },

  info: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "space-between",
  },

  trainerName: {
    fontSize: 18,
    fontWeight: "500",
  },
  separator: {
  height: 1,
  backgroundColor: "#414141",
  marginVertical: 4,
},

  subtitle: {
    fontFamily: "SegoeUI",
    fontSize: 20,
    marginTop:24,
    fontWeight: "700",
    marginLeft:12,
    lineHeight: 17,
    letterSpacing: 0,
    color: "#000",
  },

  exp: {
    fontSize: 14,
    color: "#555",
    marginTop: 3,
  },
  ratingplan: {
    flexDirection: "row",
    justifyContent: "space-between"

  },
    inputUnderline: {
  borderBottomWidth: 1,
  borderBottomColor: '#1C1B1F', 
  marginTop:10,
  marginBottom:10,
},
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
  },
  starrating: {
    flexDirection: "row",
    gap: 2,

  },
  plan: {
    fontSize: 14,
    color: "#666",
  },

  starIcon: {
    marginLeft: 10,
  },

  rating: {
    fontSize: 16,
    marginLeft: 4,
    fontWeight: "600",
  },

  bookBtn: {
    backgroundColor: "#EF0707",
    paddingVertical: 12,
    borderRadius: 20,
    borderColor:"20px solic black",
    alignItems: "center",
    marginTop: 10,
    
    width: 140,
  },
fullUnderline: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 1,
  backgroundColor: "#1C1B1F",
},

  bookText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "SegoeUI",
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0,
  },
  plansName: {
  fontSize: 14,
  fontWeight: "500",
  color: "#666",
  marginTop: 2,
},
});
