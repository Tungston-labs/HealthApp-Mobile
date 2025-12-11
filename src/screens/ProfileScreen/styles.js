import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 16,
  },

  /* ---------- Section Title ---------- */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    color: "#000",
  },

  /* ---------- Menu tems for View Profile ---------- */
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
  },

  menuText: {
    fontSize: 16,
    color: "#000",
  },

  logoutItem: {
    marginTop: 25,
    paddingVertical: 15,
  },

  logoutText: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
  },

  /* ---------- Save Button for Edit Profile ---------- */
  saveBtn: {
    backgroundColor: "#6C63FF",
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
    marginBottom: 40,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
