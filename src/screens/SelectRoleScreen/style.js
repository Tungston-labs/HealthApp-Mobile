import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const cardWidth = width * 0.39;
const cardHeight = width * 0.48;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  topHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: -150,
  },

  backBtn: {
    position: "absolute",
    left: 0,
    padding: 5,
    paddingTop: 70,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000",
    paddingTop: 60,
    fontFamily: "Segoe UI",
  },

  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
    lineHeight: 24,
    fontFamily: "Segoe UI",
  },

  subText: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 8,
    color: "#000000",
    fontFamily: "Segoe UI",
  },


  cardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 35,
    width: "100%",
  },

  card: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#eee",

    marginHorizontal: 8,        // 🔥 controls gap between cards

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },

  activeCard: {
    borderWidth: 3,
    borderColor: "#7774F4",
  },

  cardImage: {
    flex: 1,
    justifyContent: "flex-end",
  },

  cardImageStyle: {
    borderRadius: 1,
  },

  cardLabel: {
    position: "absolute",
    top: 82,
    left: 52,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    fontFamily: "Segoe UI",
  },
});
