import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 66,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  greeting: {
    fontSize: 20,
    fontWeight: "900",
  },

  subTitle: {
    color: "#777",
    marginTop: 2,
  },

  bell: {
    backgroundColor: "#F2F2F2",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  /* 🔹 EMPTY STATE STYLES */
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  emptyImage: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  emptySubText: {
    fontSize: 13,
    color: "#777",
    textAlign: "center",
    lineHeight: 18,
  },


  headerCard: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: 16,
  borderRadius: 20,

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.08,
  shadowRadius: 12,

  elevation: 6,
  marginBottom: 15,
},
});