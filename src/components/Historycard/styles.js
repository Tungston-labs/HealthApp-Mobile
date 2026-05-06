import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {

    padding: 10,
    height: 150,
    backgroundColor: "#EFEEE9",
    borderRadius: 14,
    flexDirection: "row",
    gap: 10,
  },

  profileImage: {
    width: "30%",
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
  namevalue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginTop: 6,
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
