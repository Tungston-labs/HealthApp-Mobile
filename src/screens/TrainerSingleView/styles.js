// screens/TrainerDetail/TrainerDetailStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    marginTop:32,
  },

  closeBtn: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 20,
  },

  headerSection: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
  },


  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },

  infoSection: {
    marginLeft: 15,
    flex: 1,
  },

  name: {
    fontSize: 22,
    fontFamily: "SegoeUI",
    fontWeight: "700",
    color: "#000",
  },

  row: {
   flexDirection: "row",
  alignItems: "flex-start",
  marginTop: 10,
  gap: 20, 
  },
  rowSingle: {
  flexDirection: "row",
  marginTop: 10,
},


  label: {
    fontSize: 12,
    fontFamily: "SegoeUI",
    color: "#555",
  },

  value: {
    fontSize: 14,
    fontFamily: "SegoeUI",
    fontWeight: "600",
    color: "#000",
    marginTop: 2,
  },

  dropdownBtn: {
    marginTop: 25,
    backgroundColor: "#D9D9D9",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SegoeUI",
  },

sectionTitle: {
  marginTop: 30,
  fontSize: 18,
  fontWeight: "500",
  fontFamily: "SegoeUI",
  textAlign: "center",       
  width: "100%",              
},
certContainer: {
  backgroundColor: "#E0E0E0",
  borderRadius: 14,
  padding: 10,
  marginTop: 20,
},

certHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 6,
  paddingVertical: 4,
},

certTitle: {
  fontSize: 15,
  fontFamily: "SegoeUI-Semibold",
  color: "#000",
},

certList: {
  paddingTop: 10,
},

certCard: {
  backgroundColor: "#D9D9D9",
  borderRadius: 10,
  marginRight: 10,
  padding: 6,
  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
},

certImage: {
  width: 160,
  height: 110,
  borderRadius: 6,
  resizeMode: "cover",
},
certModal: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.9)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
},

certFullImage: {
  width: "90%",
  height: "80%",
},

certClose: {
  position: "absolute",
  top: 40,
  right: 20,
  zIndex: 10,
},


  divider: {
    marginTop: 8,
    height: 1,
    backgroundColor: "#ccc",
  },

  ratingContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  overallRating: {
    fontSize: 28,
    fontFamily: "SegoeUI",
    fontWeight: "700",
    marginVertical: 6,
  },

  ratingDetails: {
    width: "55%",
  },

footer: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: 16,
  backgroundColor: "#ffffff",
  alignItems: "flex-end",
  elevation: 10,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: -2 },
},

  bookBtn: {
    backgroundColor: "#7774F4",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 1,
    marginBottom:32,
    width: 140,
    borderColor: "#5B59D6",
  },

  bookText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "SegoeUI",
    fontWeight: "700",
  },
});
