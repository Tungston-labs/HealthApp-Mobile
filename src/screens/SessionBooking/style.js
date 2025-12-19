import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 19,
    paddingTop:80,
  },

  toggleWrapper: {
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    borderRadius: 22,
    padding: 6,
    marginBottom: 20,
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
  },

  activeToggle: {
    backgroundColor: "#7B77FF",
  },

  toggleText: {
    fontSize: 13,
    color: "#9A9A9A",
    fontWeight: "500",
  },

  activeToggleText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEEFF",
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 44,
    marginRight: 10,
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 13,
  },

  dateBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B77FF",
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 10,
  },

  dateText: {
    color: "#fff",
    fontSize: 13,
    marginLeft: 6,
    fontWeight: "500",
  },

  historyDate: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  
});
