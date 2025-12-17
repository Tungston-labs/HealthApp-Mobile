import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#EEF0FF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 16,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  time: {
    fontSize: 14,
    color: "#444",
    marginTop: 2,
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
    fontSize: 13,
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
    marginVertical: 14,
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
    alignSelf: "center",
    marginTop: 8,
  },
 

});
