import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    width: 360,
    height: 110,
    backgroundColor: "#EEEEFF",
    borderRadius: 14,
    flexDirection: "row",
    gap: 10,
  },

  profileImage: {
    width: "30%",           // 30% of card width
    height: "100%",
    borderRadius: 12,
  },

  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  column: {
    width: "48%",
  },

  label: {
    fontSize: 12,
    color: "#555",
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginTop: 2,
  },

  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  valueWithIcon: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});
