import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bannerImage: {
    width: "100%",
    height: 180,
    borderRadius: 14,
    marginTop: 12,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },

  trainerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },

  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    fontSize: 14,
    fontWeight: "500",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  infoItem: {
    alignItems: "center",
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },

  inline: {
    flexDirection: "row",
    alignItems: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 18,
  },

  notesTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  notesBox: {
    backgroundColor: "#F2F3FF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },

  notesText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});
