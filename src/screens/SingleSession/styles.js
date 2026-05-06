import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },

  topImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginTop: 10,
    objectFit:"cover",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  ratingText: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 6,
    color: "#000",
    fontFamily: "SegoeUI",
  },

  sectionBlock: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 14,
    color: "#777",
    fontFamily: "SegoeUI",
  },

  sectionValue: {
    fontSize: 18,
    fontFamily: "SegoeUI",
    fontWeight: "600",
    marginTop: 4,
    color: "#000",
  },


  notesContainer: {
    marginTop: 10,
  },

  notesTitle: {
    fontSize: 16,
    fontFamily: "SegoeUI",
    fontWeight: "600",
    marginBottom: 8,
  },

  notesBox: {
    backgroundColor: "#EFEEE9",
    padding: 16,
    height:130,
    borderRadius: 12,
  },

  notesText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    fontFamily: "SegoeUI",
  },
  infoRowWrapper: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 10,
  paddingRight: 15,
},

ratingBox: {
  flexDirection: "row",
  alignItems: "center",
},

ratingText: {
  fontSize: 16,
  fontFamily: "SegoeUI",
  fontWeight: "600",
  marginLeft: 4,
  color: "#000",
},

});
