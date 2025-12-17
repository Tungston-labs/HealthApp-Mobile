import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7774F4",
    marginTop: 48,
    marginRight: 12,
  },

  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#EDEDFF",
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
  },

  time: {
    color: "#7774F4",
    fontWeight: "600",
    fontSize: 14,
    width: 50,
  },

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 16,
    marginHorizontal: 10,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },

  metaRow: {
    flexDirection: "row",
    marginTop: 4,
    gap: 12,
  },

  metaText: {
    fontSize: 12,
    color: "#666",
  },

  progressBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#D7DBFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 6,
  },

  progressText: {
    fontSize: 11,
    color: "#6C63FF",
    fontWeight: "600",
  },
});
