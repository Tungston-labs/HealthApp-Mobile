import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#EFEEE9",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
  },

  mainRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  /* LEFT IMAGE */
  avatar: {
    width: 86,
    height: 89,
    borderRadius: 14,
    marginRight: 14,
  },

  /* RIGHT CONTENT */
  rightContent: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  timeText: {
    fontSize: 12,
    marginLeft: 6,
    color: "#9A9A9A",
  },

  badge: {
    backgroundColor: "#DA9307",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ffffff",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  label: {
    fontSize: 11,
    color: "#9A9A9A",
    marginBottom: 2,
  },

  date: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
  },
});
