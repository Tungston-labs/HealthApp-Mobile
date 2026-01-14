import { StyleSheet } from "react-native";

export default StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "transparent", 
  },

  headerWrapper: {
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 10,
    position: "relative",
    zIndex: 2, 
  },

  topGradientSmall: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
    zIndex: -1,
  },

  imageContainer: {
    marginTop: 10,
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },

  imageBorder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: "#6B63F6", 
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  profileImg: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },

  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },

  backBtn: {
    position: "absolute",
    left: 18,
    top: 42,
    zIndex: 10,
    padding: 6,
  },

  editIconWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    zIndex: 3,
  },

  optionsWrapper: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 48, 
    paddingBottom: 40,
    minHeight: 600, 
    zIndex: 2,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },

  optionText: {
    marginLeft: 14,
    fontSize: 16,
    color: "#111",
  },

  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 22,
  },

  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#E2574C",
    fontWeight: "600",
  },
  
});

