import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 15,
    color: "#000",
  },

  trainerBox: {
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
  },

  trainerImg: {
    width: 90,
    height: 110,
    borderRadius: 8,
  },

  trainerInfo: {
    marginLeft: 12,
    flex: 1,
  },

  trainerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  trainerRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 8,
  },

  label: {
    fontSize: 12,
    color: "#666",
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },

  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginTop: 10,
  },

  paymentCardActive: {
    backgroundColor: "#C0F0DC",
    borderWidth: 1,
    borderColor: "#C0F0DC",
  },
  separator: {
  height: 1,
  backgroundColor: "#ada9a9ff",
  marginVertical: 4,
  marginTop:10
},
workout:{
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-start",
    gap:4,
},
  gpayLogo: {
    width: 45,
    height: 45,
    marginRight: 10,
  },

  paymentText: {
    fontSize: 15,
    fontWeight: "600",
  },

  otherMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  otherMethodText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },

  footer: {
    height: 80,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 12,
    color: "#777",
  },

  totalValue: {
    fontSize: 22,
    fontWeight: "700",
  },

  payBtn: {
    backgroundColor: "#EF0707",
    paddingVertical: 12,
    paddingHorizontal: 45,
    borderRadius: 25,
  },

  payText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
