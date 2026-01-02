import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#363636",
    borderRadius: 14,
    padding: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#6C63FF",
    marginRight: 8,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  dayBadge: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 20,
  },

  dayText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },

  progressContainer: {
    flexDirection: "row",
    marginVertical: 12,
  },

  progressActive: {
    height: 3,
    backgroundColor: "#6C63FF",
    flex: 0.35,
    borderRadius: 2,
  },

  progressInactive: {
    height: 3,
    backgroundColor: "#666666",
    flex: 0.65,
    marginLeft: 4,
    borderRadius: 2,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  startedText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  timeText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 6,
  },
});
