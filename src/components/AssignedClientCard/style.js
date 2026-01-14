import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF0FF",
    borderRadius: 12,
    padding: 12,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 15,
    marginRight: 22,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    marginBottom: 6,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  metaText: {
    fontSize: 12,
    color: "#777",
  },
  
});
