import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#EDEDFF",
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 12,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  timeText: {
    fontSize: 12,
    marginLeft: 4,
    color: "#A2A2A2",
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 10,
    color: "#A2A2A2",
  },

  date: {
    fontSize: 12,
    fontWeight: "500",
  },

  badge: {
    backgroundColor: "#E0DFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  badgeText: {
    fontSize: 11,
    color: "#7774F4",
    fontWeight: "600",
  },
});
