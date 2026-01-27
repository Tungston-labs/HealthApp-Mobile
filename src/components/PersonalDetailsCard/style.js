import { StyleSheet } from "react-native";

export default StyleSheet.create({
 card: {
  backgroundColor: "#EEF0FF",
  borderRadius: 20,
  padding: 10,
  paddingBottom: 36, 
  marginBottom: 16,
  position: "relative", 
},

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 16,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },

  time: {
    fontSize: 16,
    color: "#000",
    marginTop: 5,
  },

  progressBadge: {
    backgroundColor: "#D7DBFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6C63FF",
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  metaText: {
    fontSize: 14,
    color: "#000",
    
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  dateBlock: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
  },

  value: {
    fontSize: 14,
    color: "#000",
  },

  divider: {
    height: 1,
    backgroundColor: "#DDD",
    marginVertical: 6,
  },

  section: {
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 14,
  },

  half: {
    flex: 1,
  },

 arrow: {
  position: "absolute",
  bottom: -18,           
  left: "50%",
  transform: [{ translateX: -18 }],
  width: 30,
  height: 30,
  borderRadius: 18,
  backgroundColor: "#6C63FF",
  alignItems: "center",
  justifyContent: "center",
  elevation: 6,           
},
 
  

});
